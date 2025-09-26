import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Users, MapPin, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const preferences = [
  { id: "nature", label: "Nature & Wildlife", icon: "🌿" },
  { id: "adventure", label: "Adventure", icon: "🏔️" },
  { id: "culture", label: "Culture & Heritage", icon: "🏛️" },
  { id: "spirituality", label: "Spirituality", icon: "🕉️" },
  { id: "photography", label: "Photography", icon: "📸" },
  { id: "tribal", label: "Tribal Experience", icon: "🎭" },
];

const TripPlanner = () => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    duration: "",
    travelers: "",
    budget: "",
  });
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);

  const togglePreference = (id: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const generateItinerary = () => {
    if (selectedPreferences.length === 0) {
      toast({
        title: "Select Preferences",
        description: "Please select at least one travel preference",
        variant: "destructive",
      });
      return;
    }

    // Simulated AI response
    const itinerary = {
      title: "Your Personalized Jharkhand Journey",
      duration: formData.duration || "5 days",
      highlights: [
        "Day 1: Arrival in Ranchi - Visit Rock Garden & Tagore Hill",
        "Day 2: Hundru Falls & Jonha Falls exploration",
        "Day 3: Betla National Park Safari",
        "Day 4: Tribal village experience & cultural program",
        "Day 5: Netarhat sunrise & departure",
      ],
      recommendations: [
        "Best time to visit: October to March",
        "Carry light woolens for hill areas",
        "Book homestays for authentic experience",
      ],
    };

    setGeneratedItinerary(itinerary);
    toast({
      title: "Itinerary Generated!",
      description: "Your personalized trip plan is ready",
    });
  };

  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-forest bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Trip Planner
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us your preferences and let our AI create the perfect Jharkhand itinerary
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Travel Preferences</h2>
              
              {/* Preference Selection */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {preferences.map((pref) => (
                  <motion.button
                    key={pref.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => togglePreference(pref.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedPreferences.includes(pref.id)
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{pref.icon}</span>
                      <span className="text-sm">{pref.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Form Inputs */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="duration">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Trip Duration
                  </Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 5 days"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="travelers">
                    <Users className="inline h-4 w-4 mr-1" />
                    Number of Travelers
                  </Label>
                  <Input
                    id="travelers"
                    type="number"
                    placeholder="e.g., 2"
                    value={formData.travelers}
                    onChange={(e) =>
                      setFormData({ ...formData, travelers: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="budget">Budget Range (INR)</Label>
                  <Input
                    id="budget"
                    placeholder="e.g., 20000-30000"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                  />
                </div>
              </div>

              <Button
                className="w-full mt-6 bg-gradient-forest hover:opacity-90"
                onClick={generateItinerary}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Itinerary
              </Button>
            </Card>
          </motion.div>

          {/* Generated Itinerary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 h-full">
              {generatedItinerary ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <MapPin className="mr-2 h-6 w-6 text-primary" />
                    {generatedItinerary.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Duration: {generatedItinerary.duration}
                  </p>

                  <div className="space-y-3 mb-6">
                    <h3 className="font-semibold text-lg">Daily Highlights</h3>
                    {generatedItinerary.highlights.map((day: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                        <p className="text-sm">{day}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Travel Tips</h3>
                    {generatedItinerary.recommendations.map((tip: string, index: number) => (
                      <p key={index} className="text-sm text-muted-foreground mb-1">
                        • {tip}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-forest opacity-10 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Your Adventure Awaits
                  </h3>
                  <p className="text-muted-foreground">
                    Select your preferences and generate a personalized itinerary
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;