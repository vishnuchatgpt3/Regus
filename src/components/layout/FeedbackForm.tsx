import { useState } from "react";

const FeedbackForm = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setStatus("Please enter your feedback.");
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Thank you for your feedback!");
        setMessage("");
      } else {
        setStatus(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <textarea
        className="w-full p-2 rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
        rows={2}
        placeholder="Share your feedback..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="self-end bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-1.5 rounded-full shadow transition"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      {status && (
        <div className="text-sm text-center mt-1 text-green-700">{status}</div>
      )}
    </form>
  );
};

export default FeedbackForm;