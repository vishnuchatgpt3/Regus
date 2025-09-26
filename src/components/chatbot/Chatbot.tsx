import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Globe } from "lucide-react";
import kb from "@/data/jharkhand_kb.json";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Namaste! 🙏 I'm your Jharkhand travel assistant. I can help you in English, Hindi, or local languages. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isTyping, setIsTyping] = useState(false);

  const languages = ["English", "हिंदी", "संथाली", "हो"];

  // Allow other components to open the chatbot via a custom event
  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    // TypeScript doesn't know about this custom event name, cast listener type
    window.addEventListener("open-chatbot", openHandler as EventListener);
    return () => window.removeEventListener("open-chatbot", openHandler as EventListener);
  }, []);

  // Simple animated robot avatar
  const RobotAvatar = ({ size = 28 }: { size?: number }) => {
    return (
      <motion.div
        className="rounded-xl bg-gradient-forest/90 flex items-center justify-center shadow-inner"
        style={{ width: size, height: size }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative bg-white/90 rounded-md" style={{ width: size * 0.7, height: size * 0.55 }}>
          <motion.div
            className="absolute left-1/2 -top-3 -translate-x-1/2"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-0.5 h-3 bg-emerald-500 mx-auto" />
            <motion.div
              className="w-2 h-2 bg-emerald-500 rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            <motion.div className="w-2 h-2 bg-slate-800 rounded-full" animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
            <motion.div className="w-2 h-2 bg-slate-800 rounded-full" animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
          </div>
          <motion.div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-slate-700 rounded" animate={{ width: [12, 16, 12] }} transition={{ duration: 1.4, repeat: Infinity }} />
        </div>
      </motion.div>
    );
  };

  // Use server-side chat endpoint for retrieval/answers
  const fetchAnswer = async (query: string) => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, lang: selectedLanguage }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return `Sorry, I couldn't fetch an answer (${err?.error || res.status}).`;
      }
      const data = await res.json();
      return data.answer || "I'm not sure, try asking differently.";
    } catch (err: any) {
      return "Network error while fetching answer.";
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    // Ask server for an answer
    setIsTyping(true);
    fetchAnswer(inputValue).then((responseText) => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    });

    setInputValue("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-forest text-white p-4 rounded-full shadow-2xl"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="flex flex-col h-[600px] shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-forest text-white p-4 rounded-t-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <RobotAvatar size={28} />
                    <h3 className="font-semibold">Regus Assistant</h3>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`text-xs px-2 py-1 rounded ${
                        selectedLanguage === lang
                          ? "bg-white/20"
                          : "hover:bg-white/10"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: message.sender === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-end gap-2 ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.sender === "bot" && <RobotAvatar size={32} />}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-end gap-2">
                      <RobotAvatar size={32} />
                      <div className="bg-muted rounded-lg px-3 py-2">
                        <div className="flex items-center gap-1">
                          <motion.span className="w-1.5 h-1.5 bg-slate-600 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} />
                          <motion.span className="w-1.5 h-1.5 bg-slate-600 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.15 }} />
                          <motion.span className="w-1.5 h-1.5 bg-slate-600 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-gradient-forest hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;