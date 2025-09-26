import { motion } from "framer-motion";
import { Rocket, Languages, LockKeyhole, SatelliteDish, Sparkles, Store, ShieldCheck, CalendarDays, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Rocket,
    title: "AI Trip Planner",
    description: "Get personalized itineraries based on your preferences",
    gradient: "bg-gradient-forest",
  },
  // Multilingual Support removed
  {
    icon: LockKeyhole,
    title: "Secure Booking",
    description: "Blockchain-verified transactions and guide authentication",
    gradient: "bg-gradient-sunrise",
  },
  // Live Chatbot removed
  {
    icon: Sparkles,
    title: "Cultural Events",
    description: "Discover local festivals and traditions",
    gradient: "bg-gradient-river",
  },
  {
    icon: Store,
    title: "Marketplace",
    description: "Buy local crafts, book homestays, and hire guides",
    gradient: "bg-gradient-forest",
  },
  // Verified Guides removed
  // Events Calendar removed
  {
    icon: MapPin,
    title: "Interactive Map",
    description: "Explore destinations with our dynamic map",
    gradient: "bg-gradient-river",
  },
];

const featureRoutes = {
  "AI Trip Planner": "/planner",
  "Multilingual Support": "/chatbot", // Updated to navigate to chatbot page
  "Secure Booking": "/login",
  "Live Chatbot": "/chatbot",
  "Cultural Events": "/events",
  "Marketplace": "/marketplace",
  "Verified Guides": "/marketplace",
  "Events Calendar": "/events",
  "Interactive Map": "/map",
};

function getButtonText(title: string) {
  switch (title) {
    case "AI Trip Planner":
      return "Explore Planner";
    case "Multilingual Support":
      return "Open Chatbot";
    case "Secure Booking":
      return "Book Securely";
    case "Live Chatbot":
      return "Chat Now";
    case "Cultural Events":
      return "View Events";
    case "Marketplace":
      return "Visit Marketplace";
    case "Verified Guides":
      return "Find Guides";
    case "Events Calendar":
      return "See Calendar";
    case "Interactive Map":
      return "Open Map";
    default:
      return title;
  }
}

const FeaturesSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-earth bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the best of Jharkhand with our innovative platform features
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={`p-6 rounded-xl shadow-lg ${feature.gradient} text-white flex flex-col items-center justify-center min-h-[220px]`}>
                <feature.icon className="h-10 w-10 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/80 text-center">{feature.description}</p>
                {featureRoutes[feature.title] && (
                  <Button
                    className="mt-4 bg-white text-green-700 border border-green-400 font-medium px-6 py-2 rounded-full shadow-sm hover:bg-green-50 transition"
                    onClick={() => navigate(featureRoutes[feature.title])}
                  >
                    {getButtonText(feature.title)}
                  </Button>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;