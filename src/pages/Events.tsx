import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import { motion } from "framer-motion";

const events = [
  {
    name: "Sarhul Festival",
    type: "Cultural",
    icon: "🎉",
    description: "Spring festival celebrating nature and harvest",
    date: "March 24-26, 2024",
    location: "Ranchi",
    expected: "50,000+ expected"
  },
  {
    name: "Karam Festival",
    type: "Tribal/Cultural",
    icon: "🌿",
    description: "Harvest festival honoring the Karam tree and local deities, features dance and song",
    date: "September 15, 2024",
    location: "Across Jharkhand (notably Lohardaga, Gumla)",
    expected: "20,000+ expected"
  },
  {
    name: "Sohrai Festival",
    type: "Tribal/Cultural",
    icon: "🐃",
    description: "Cattle and harvest festival, worship of cows and bulls, traditional Sohrai wall paintings",
    date: "November 2-5, 2024",
    location: "Santhal Pargana & Hazaribagh",
    expected: "15,000+ expected"
  },
  {
    name: "Bhagta Parab",
    type: "Tribal",
    icon: "🤸",
    description: "Festival of physical feats and courage, includes Chhau dance and daring rituals",
    date: "April 18-20, 2024",
    location: "Tamar region",
    expected: "10,000+ expected"
  },
  {
    name: "Bandna Festival",
    type: "Tribal/Cultural",
    icon: "🐄",
    description: "Festival for honoring cattle, marked by rituals, songs and festivities",
    date: "October 29, 2024 (Karthik Amavasya)",
    location: "Rural Jharkhand",
    expected: "5,000+ expected"
  },
  {
    name: "Jharkhand Tribal Festival",
    type: "Cultural/Tribal",
    icon: "🎶",
    description: "Celebrates World Tribal Day with tribal music, dance, art, food, and discussions",
    date: "August 9-10, 2024",
    location: "Ranchi",
    expected: "25,000+ expected"
  },
  {
    name: "Adivasi Mahakumbh Mela",
    type: "Tribal",
    icon: "🪘",
    description: "Grand tribal gathering founded by Raja Medini Ray’s descendants; cultural exchanges",
    date: "February 16-18, 2024",
    location: "Palamau",
    expected: "8,000+ expected"
  },
  {
    name: "Jani Shikar",
    type: "Tribal",
    icon: "🏹",
    description: "Unique hunt by women (once every 12 years), celebrates ancient Kurukh victory",
    date: "Last held: 2019, Next: 2031",
    location: "Rohtas Garh (select areas)",
    expected: "3,000+ expected"
  },
  {
    name: "Patratu Adventure Festival",
    type: "Adventure/Cultural",
    icon: "🚣",
    description: "Water sports, mountain biking, and cultural showcases at lake resort",
    date: "September 7-9, 2024",
    location: "Patratu Lake Resort, Ramgarh",
    expected: "10,000+ expected"
  },
  {
    name: "Chhath Puja",
    type: "Religious/Cultural",
    icon: "🌅",
    description: "Worship of Sun God with riverbank rituals, fasting, and offerings",
    date: "November 5, 2024",
    location: "Ranchi and riverbanks statewide",
    expected: "80,000+ expected"
  },
  {
    name: "Rajrappa Dance Festival",
    type: "Cultural",
    icon: "💃",
    description: "Folk and tribal dance performances, music, and food",
    date: "January 26-27, 2024",
    location: "Rajrappa temple, Ramgarh",
    expected: "4,000+ expected"
  },
  {
    name: "World Tourism Day",
    type: "Cultural/Sports",
    icon: "🎵",
    description: "Music, dance, food, and adventure events to promote tourism",
    date: "September 27, 2024",
    location: "Ranchi",
    expected: "2,000+ expected"
  },
  {
    name: "Netarhat Tribal Festival",
    type: "Tribal/Cultural",
    icon: "🎨",
    description: "Cultural immersion and traditional performances by tribal communities",
    date: "May 28-30, 2024",
    location: "Netarhat",
    expected: "5,000+ expected"
  },
  {
    name: "Hazaribagh Festival",
    type: "Cultural",
    icon: "🎭",
    description: "Folk theatre, crafts, and fairs",
    date: "February 12-14, 2024",
    location: "Hazaribagh",
    expected: "6,000+ expected"
  }
];


const gradientBg = "bg-gradient-to-br from-green-100 via-yellow-50 to-orange-100 dark:from-background dark:via-muted/30 dark:to-muted/10";

const badgeColors: Record<string, string> = {
  "Cultural": "bg-gradient-to-r from-pink-400 to-orange-300 text-white",
  "Tribal": "bg-gradient-to-r from-green-500 to-lime-300 text-white",
  "Adventure/Cultural": "bg-gradient-to-r from-blue-400 to-teal-300 text-white",
  "Religious/Cultural": "bg-gradient-to-r from-yellow-400 to-orange-400 text-white",
  "Cultural/Tribal": "bg-gradient-to-r from-purple-400 to-pink-300 text-white",
  "Tribal/Cultural": "bg-gradient-to-r from-green-500 to-yellow-300 text-white",
  "Cultural/Sports": "bg-gradient-to-r from-indigo-400 to-green-300 text-white"
};

function createICS(event) {
  // Parse date range (assume format: 'Month Day-Day, Year' or 'Month Day, Year')
  const dateRegex = /([A-Za-z]+) (\d+)(?:-(\d+))?, (\d{4})/;
  const match = event.date.match(dateRegex);
  if (!match) return null;
  const month = match[1];
  const startDay = match[2];
  const endDay = match[3] || match[2];
  const year = match[4];
  const monthNum = new Date(`${month} 1, 2000`).getMonth() + 1;
  const pad = n => n.toString().padStart(2, '0');
  const startDate = `${year}${pad(monthNum)}${pad(startDay)}T090000`;
  const endDate = `${year}${pad(monthNum)}${pad(endDay)}T180000`;
  return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${event.name}\nDESCRIPTION:${event.description}\nLOCATION:${event.location}\nDTSTART:${startDate}\nDTEND:${endDate}\nEND:VEVENT\nEND:VCALENDAR`;
}

const Events = () => (
  <div className={`min-h-screen py-24 ${gradientBg} relative overflow-hidden`}>
    {/* Animated background shapes */}
    <motion.div
      className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-primary/30 to-secondary/10 blur-2xl opacity-40"
      animate={{ x: [0, 40, -40, 0], y: [0, 30, -30, 0] }}
      transition={{ repeat: Infinity, duration: 12 }}
      style={{ zIndex: 0 }}
    />
    <motion.div
      className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gradient-to-tr from-orange-300/30 to-pink-200/10 blur-2xl opacity-30"
      animate={{ x: [0, -30, 30, 0], y: [0, -20, 20, 0] }}
      transition={{ repeat: Infinity, duration: 10 }}
      style={{ zIndex: 0 }}
    />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-river bg-clip-text text-transparent drop-shadow-lg">
            Jharkhand Events & Festivals
          </span>
        </h1>
        <div className="flex justify-center mb-4">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg animate-pulse">
            2024 Highlights
          </span>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the major festivals, cultural events, and adventure gatherings across Jharkhand for 2024.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, idx) => (
          <motion.div
            key={event.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.15)" }}
          >
            <Card className="p-6 h-full shadow-xl border-2 border-primary/20 rounded-2xl bg-white/80 dark:bg-card/80 transition-all duration-300">
              <div className="flex items-center mb-2">
                <span className="text-4xl mr-3 drop-shadow-lg">{event.icon}</span>
                <h2 className="text-2xl font-bold text-primary drop-shadow-sm">{event.name}</h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${badgeColors[event.type] || "bg-muted text-foreground"}`}>
                  {event.type}
                </span>
              </div>
              <div className="border-b border-dashed border-muted my-2" />
              <p className="mb-2 text-muted-foreground text-sm"><strong>Description:</strong> {event.description}</p>
              <div className="flex flex-col gap-1 text-sm mb-2">
                <span><strong>Date(s):</strong> <span className="text-primary font-semibold">{event.date}</span></span>
                <span><strong>Location:</strong> <span className="text-secondary font-semibold">{event.location}</span></span>
                <span><strong>Expected Attendance:</strong> <span className="text-green-700 dark:text-green-400 font-semibold">{event.expected}</span></span>
              </div>
              <Button
                size="sm"
                className="mt-2 w-full font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:scale-[1.03] hover:shadow-xl transition-all border-0"
                onClick={() => {
                  const ics = createICS(event);
                  if (!ics) return alert('Calendar export not available for this event date format.');
                  const blob = new Blob([ics.replace(/\n/g, "\r\n")], { type: 'text/calendar' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${event.name.replace(/\s+/g, '_')}.ics`;
                  document.body.appendChild(a);
                  a.click();
                  setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }, 100);
                }}
              >
                <CalendarPlus className="w-4 h-4" />
                Add to Calendar
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Events;
