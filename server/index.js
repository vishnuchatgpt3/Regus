const locations = require('./locations');
// Get coordinates for a single place
app.get('/api/location', (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ error: 'Missing place name.' });
  const loc = locations.find(l => l.name.toLowerCase() === name.toLowerCase());
  if (!loc) return res.status(404).json({ error: 'Location not found.' });
  res.json(loc);
});

// Get all locations for map markers
app.get('/api/locations', (req, res) => {
  res.json(locations);
});
const usersDb = require('./users');
const bcrypt = require('bcryptjs');
// Register endpoint
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing registration details.' });
  }
  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);
  usersDb.run(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(409).json({ error: 'Email already registered.' });
        }
        return res.status(500).json({ error: 'Database error.' });
      }
      res.status(201).json({ message: 'Registration successful!', user: { id: this.lastID, name, email } });
    }
  );
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing login details.' });
  }
  usersDb.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error.' });
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' });
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password.' });
    res.json({ message: 'Login successful!', user: { id: user.id, name: user.name, email: user.email } });
  });
});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Booking endpoint
app.post('/api/book', (req, res) => {
  const { name, email, date, place } = req.body;
  if (!name || !email || !date || !place) {
    return res.status(400).json({ error: 'Missing booking details.' });
  }
  db.run(
    'INSERT INTO bookings (name, email, date, place) VALUES (?, ?, ?, ?)',
    [name, email, date, place],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Database error.' });
      }
      res.status(201).json({
        message: 'Booking successful!',
        booking: { id: this.lastID, name, email, date, place },
      });
    }
  );
});

// Get all bookings (for admin/demo)
app.get('/api/bookings', (req, res) => {
  db.all('SELECT * FROM bookings', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error.' });
    }
    res.json(rows);
  });
});


// Feedback endpoint
app.post('/api/feedback', (req, res) => {
  const { message } = req.body;
  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: 'Feedback message required.' });
  }
  db.run(
    'INSERT INTO feedback (message) VALUES (?)',
    [message],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Database error.' });
      }
      res.status(201).json({ message: 'Feedback submitted!', feedback: { id: this.lastID, message } });
    }
  );
});

// Get all feedback (admin/demo)
app.get('/api/feedback', (req, res) => {
  db.all('SELECT * FROM feedback ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error.' });
    }
    res.json(rows);
  });
});

// Simple retrieval-based chat endpoint (no external AI)
// Accepts { message: string, lang?: string } and returns { answer, source, suggestions }
try {
  const kb = require('../src/data/jharkhand_kb.json');
  const locations = require('./locations');

  app.post('/api/chat', (req, res) => {
    const { message, lang } = req.body || {};
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required.' });
    }
    const q = message.toLowerCase().trim();

    // Quick exact location match
    const loc = locations.find((l) => l.name.toLowerCase() === q);
    if (loc) {
      return res.json({ answer: `I found ${loc.name}. Coordinates: ${loc.lat}, ${loc.lng || loc.lon}.`, source: 'location' });
    }

    // Score KB items by simple token matches
    const scoreItem = (item) => {
      let score = 0;
      const fields = [item.title || '', item.summary || '', (item.location || '')];
      for (const f of fields) {
        const text = String(f).toLowerCase();
        if (!text) continue;
        if (text.includes(q)) score += 5;
        // token matches
        const qTokens = q.split(/\s+/).filter(Boolean);
        for (const t of qTokens) {
          if (text.includes(t)) score += 1;
        }
      }
      if (Array.isArray(item.faqs)) {
        for (const faq of item.faqs) {
          const fq = (faq.q || '').toLowerCase();
          if (fq.includes(q)) score += 6;
          // also check tokens against faq question
          for (const t of q.split(/\s+/)) if (t && fq.includes(t)) score += 1;
        }
      }
      return score;
    };

    let best = null;
    let bestScore = 0;
    for (const item of kb) {
      const s = scoreItem(item);
      if (s > bestScore) {
        bestScore = s;
        best = item;
      }
    }

    if (best && bestScore > 1) {
      // Prefer returning a relevant FAQ answer if question matched
      if (Array.isArray(best.faqs)) {
        for (const faq of best.faqs) {
          if ((faq.q || '').toLowerCase().includes(q)) {
            return res.json({ answer: faq.a, source: 'faq', item: best.id });
          }
        }
      }
      const out = `${best.title}: ${best.summary || 'Information available.'}`;
      return res.json({ answer: out, source: 'kb', item: best.id });
    }

    // Fallback: provide suggestions by token match across KB titles
    const qTokens = q.split(/\s+/).filter(Boolean);
    const suggestions = [];
    for (const item of kb) {
      const title = (item.title || '').toLowerCase();
      for (const t of qTokens) {
        if (t && title.includes(t) && !suggestions.includes(item.title)) suggestions.push(item.title);
      }
    }

    const fallback = suggestions.length
      ? `I couldn't find an exact answer. Did you mean: ${suggestions.slice(0,5).join(', ')}?`
      : `I couldn't find a specific answer. I can help with destinations, festivals, tips, and bookings. Try: "Best time for Betla National Park?"`;

    return res.json({ answer: fallback, source: 'fallback', suggestions });
  });
} catch (err) {
  console.warn('Chat endpoint could not initialize KB:', err.message || err);
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
