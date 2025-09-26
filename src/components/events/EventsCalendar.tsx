import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

const events = [
  {
    id: 1,
    name: "Sarhul Festival",
    date: "March 25-27, 2024",
    location: "Ranchi",
    type: "Cultural",
    description: "Spring festival celebrating nature and harvest",
    attendees: "50,000+",
    color: "bg-gradient-forest",
  },
  {
    id: 2,
    name: "Karma Festival",
    date: "September 15-17, 2024",
    location: "Multiple Locations",
    type: "Tribal",
    description: "Harvest festival with traditional dance and music",
    attendees: "30,000+",
    color: "bg-gradient-earth",
  },
  {
    id: 3,
    name: "Tusu Parab",
    date: "January 14-15, 2025",
    location: "Dumka",
    type: "Cultural",
    description: "Harvest festival celebrated by tribal communities",
    attendees: "20,000+",
    color: "bg-gradient-sunrise",
  },
  {
    id: 4,
    name: "Chhath Puja",
    date: "November 7-8, 2024",
    location: "Statewide",
    type: "Religious",
    description: "Sun worship festival at rivers and ponds",
    attendees: "100,000+",
    color: "bg-gradient-river",
  },
  {
    id: 5,
    name: "Jharkhand Tourism Festival",
    date: "December 10-15, 2024",
    location: "Netarhat",
    type: "Tourism",
    description: "Adventure sports, cultural programs, and local cuisine",
    attendees: "25,000+",
    color: "bg-gradient-forest",
  },
  {
    id: 6,
    name: "Baha Festival",
    date: "February 20-22, 2025",
    location: "Chakradharpur",
    type: "Tribal",
    description: "Spring festival of Santhal tribe",
    attendees: "15,000+",
    color: "bg-gradient-earth",
  },
];

const EventsCalendar = () => {
  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-sunrise bg-clip-text text-transparent">
              Cultural
            </span>{" "}
            Events & Festivals
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the vibrant festivals and cultural celebrations of Jharkhand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                <div className={`h-2 ${event.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{event.name}</h3>
                      <span className="inline-block px-2 py-1 bg-muted text-xs rounded-full">
                        {event.type}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl"
                    >
                      🎉
                    </motion.div>
                  </div>

                  <p className="text-muted-foreground mb-4">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{event.attendees} expected</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-forest hover:opacity-90">
                    <Clock className="h-4 w-4 mr-2" />
                    Set Reminder
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Card className="inline-block p-6 bg-gradient-to-r from-forest/10 to-river/10">
            <h3 className="text-lg font-semibold mb-2">Never Miss a Festival!</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to get notifications about upcoming cultural events
            </p>
            <Button variant="outline">Subscribe to Calendar</Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EventsCalendar;