export function getPlaceDescription(name: string): string {
  switch (name) {
    case "Ranchi":
      return "Ranchi, the capital city of Jharkhand, is known for its scenic beauty, waterfalls, and vibrant culture.";
    case "Jamshedpur":
      return "Jamshedpur is an industrial city, home to Tata Steel, and offers lush parks and lakes.";
    case "Deoghar":
      return "Deoghar is a spiritual city famous for the Baba Baidyanath Temple, attracting pilgrims year-round.";
    case "Dhanbad":
      return "Dhanbad, the coal capital of India, is a bustling city with rich mining history.";
    case "Hazaribagh":
      return "Hazaribagh is known for its hills, lakes, and wildlife, making it a nature lover's paradise.";
    case "Netarhat":
      return "Netarhat, the Queen of Chotanagpur, is a hill station famous for its sunrise and sunset points.";
    case "Hundru Falls":
      return "Hundru Falls is a majestic waterfall surrounded by dense forests, perfect for nature enthusiasts.";
    case "Dassam Falls":
      return "Dassam Falls is a picturesque waterfall ideal for picnics and relaxation.";
    case "Betla National Park":
      return "Betla National Park is a wildlife sanctuary with elephants, tigers, and diverse flora and fauna.";
    case "Magnolia Sunset Point":
      return "Magnolia Sunset Point in Netarhat offers breathtaking views of the setting sun over the hills.";
    case "Jubilee Park":
      return "Jubilee Park in Jamshedpur is a sprawling green space with lakes, gardens, and recreational activities.";
    // Add more cases for other places as needed
    default:
      return "Discover more about this beautiful destination in Jharkhand.";
  }
}
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, Camera, Eye } from "lucide-react";
import hundruFalls from "@/assets/hundru-falls.jpg";
import betlaPark from "@/assets/betla-national-park.jpg";
import culturalFestival from "@/assets/cultural-festival.jpg";
import placeholder from "@/assets/placeholder.svg";

const destinations = [
  // Major Cities & Hill Stations
  { id: 1, name: "Ranchi", description: "Capital city of Jharkhand", category: "Major Cities & Hill Stations", vrAvailable: false, image: placeholder },
  { id: 2, name: "Jamshedpur", description: "Industrial city, home to Tata Steel", category: "Major Cities & Hill Stations", vrAvailable: false, image: placeholder },
  { id: 3, name: "Deoghar", description: "Spiritual city, famous for Baba Baidyanath Temple", category: "Major Cities & Hill Stations", vrAvailable: false, image: placeholder },
  { id: 4, name: "Dhanbad", description: "Coal capital of India", category: "Major Cities & Hill Stations", vrAvailable: false, image: placeholder },
  { id: 5, name: "Hazaribagh", description: "City with scenic hills and lakes", category: "Major Cities & Hill Stations", vrAvailable: false, image: placeholder },
  { id: 6, name: "Bokaro Steel City", description: "Planned city, steel industry hub", category: "Major Cities & Hill Stations", vrAvailable: false, image: placeholder },
  { id: 7, name: "Giridih", description: "Gateway to Parasnath Hills", category: "Major Cities & Hill Stations", vrAvailable: false, image: placeholder },
  { id: 8, name: "Dumka", description: "Sub-capital, cultural center", category: "Major Cities & Hill Stations", vrAvailable: false, image: placeholder },
  { id: 9, name: "Netarhat", description: "Hill station, Magnolia Sunset Point", category: "Major Cities & Hill Stations", vrAvailable: true, image: hundruFalls },

  // Waterfalls
  { id: 10, name: "Dassam Falls", description: "Picturesque waterfall perfect for picnics", category: "Waterfalls", vrAvailable: true, image: hundruFalls },
  { id: 11, name: "Jonha Falls", description: "Also known as Gautamdhara Falls", category: "Waterfalls", vrAvailable: false, image: hundruFalls },
  { id: 12, name: "Hundru Falls", description: "Majestic 98m waterfall surrounded by dense forests", category: "Waterfalls", vrAvailable: true, image: hundruFalls },
  { id: 13, name: "Lodh Falls", description: "Tallest waterfall in Jharkhand", category: "Waterfalls", vrAvailable: false, image: hundruFalls },
  { id: 14, name: "Ghaghri Waterfalls", description: "Scenic waterfall near Netarhat", category: "Waterfalls", vrAvailable: false, image: hundruFalls },
  { id: 15, name: "Panchghagh Falls", description: "Five-stream waterfall near Khunti", category: "Waterfalls", vrAvailable: false, image: hundruFalls },
  { id: 16, name: "Sadni Falls", description: "Historic waterfall in Gumla", category: "Waterfalls", vrAvailable: false, image: hundruFalls },
  { id: 17, name: "Bhatinda Falls", description: "Beautiful falls near Dhanbad", category: "Waterfalls", vrAvailable: false, image: hundruFalls },
  { id: 18, name: "Usri Falls", description: "Three-stream falls near Giridih", category: "Waterfalls", vrAvailable: false, image: hundruFalls },
  { id: 19, name: "Sita Falls", description: "Hidden gem near Ranchi", category: "Waterfalls", vrAvailable: false, image: hundruFalls },

  // Lakes & Dams
  { id: 20, name: "Dimna Lake", description: "Picturesque lake near Jamshedpur", category: "Lakes & Dams", vrAvailable: false, image: placeholder },
  { id: 21, name: "Kanke Dam", description: "Popular picnic spot in Ranchi", category: "Lakes & Dams", vrAvailable: false, image: placeholder },
  { id: 22, name: "Ranchi Lake", description: "Historic lake in the heart of Ranchi", category: "Lakes & Dams", vrAvailable: false, image: placeholder },
  { id: 23, name: "Getalsud Dam", description: "Major water reservoir near Ranchi", category: "Lakes & Dams", vrAvailable: false, image: placeholder },
  { id: 24, name: "Chandil Dam", description: "Scenic dam near Jamshedpur", category: "Lakes & Dams", vrAvailable: false, image: placeholder },
  { id: 25, name: "Garga Dam", description: "Dam near Bokaro Steel City", category: "Lakes & Dams", vrAvailable: false, image: placeholder },
  { id: 26, name: "Maithon Dam", description: "Large dam on Barakar river", category: "Lakes & Dams", vrAvailable: false, image: placeholder },
  { id: 27, name: "Panchet Dam", description: "Dam near Dhanbad", category: "Lakes & Dams", vrAvailable: false, image: placeholder },
  { id: 28, name: "Topchanchi Lake", description: "Lake near Dhanbad", category: "Lakes & Dams", vrAvailable: false, image: placeholder },
  { id: 29, name: "Sitarampur Dam", description: "Dam near Hazaribagh", category: "Lakes & Dams", vrAvailable: false, image: placeholder },

  // National Parks & Wildlife
  { id: 30, name: "Betla National Park", description: "Wildlife sanctuary with elephants, tigers, and diverse flora", category: "National Parks & Wildlife", vrAvailable: true, image: betlaPark },
  { id: 31, name: "Hazaribagh National Park", description: "Park with scenic beauty and wildlife", category: "National Parks & Wildlife", vrAvailable: false, image: betlaPark },
  { id: 32, name: "Dalma Wildlife Sanctuary", description: "Sanctuary near Jamshedpur", category: "National Parks & Wildlife", vrAvailable: false, image: betlaPark },
  { id: 33, name: "Birsa Zoological Park", description: "Zoo near Ranchi", category: "National Parks & Wildlife", vrAvailable: false, image: betlaPark },
  { id: 34, name: "Jawaharlal Nehru Biological Park", description: "Zoo in Bokaro", category: "National Parks & Wildlife", vrAvailable: false, image: betlaPark },

  // Temples & Religious Sites
  { id: 35, name: "Baba Baidyanath Temple", description: "One of the 12 Jyotirlingas, in Deoghar", category: "Temples & Religious Sites", vrAvailable: false, image: placeholder },
  { id: 36, name: "Jagannath Temple", description: "Historic temple in Ranchi", category: "Temples & Religious Sites", vrAvailable: false, image: placeholder },
  { id: 37, name: "Pahari Mandir", description: "Temple on a hilltop in Ranchi", category: "Temples & Religious Sites", vrAvailable: false, image: placeholder },
  { id: 38, name: "Rajrappa Temple", description: "Chhinnamasta Temple near Ramgarh", category: "Temples & Religious Sites", vrAvailable: false, image: placeholder },
  { id: 39, name: "Shikharji (Parasnath Hills)", description: "Jain pilgrimage site", category: "Temples & Religious Sites", vrAvailable: false, image: placeholder },
  { id: 40, name: "Basukinath Temple", description: "Temple near Dumka", category: "Temples & Religious Sites", vrAvailable: false, image: placeholder },
  { id: 41, name: "Naulakha Mandir", description: "Temple in Deoghar", category: "Temples & Religious Sites", vrAvailable: false, image: placeholder },
  { id: 42, name: "Nandan Pahar", description: "Hill and temple in Deoghar", category: "Temples & Religious Sites", vrAvailable: false, image: placeholder },
  { id: 43, name: "Bhuvaneswari Temple", description: "Temple in Jamshedpur", category: "Temples & Religious Sites", vrAvailable: false, image: placeholder },
  { id: 44, name: "Satsang Ashram", description: "Spiritual center in Deoghar", category: "Temples & Religious Sites", vrAvailable: false, image: placeholder },
  { id: 45, name: "Surya Mandir", description: "Temple near Ranchi", category: "Temples & Religious Sites", vrAvailable: false, image: placeholder },
  { id: 46, name: "Harihar Dham", description: "Temple in Giridih", category: "Temples & Religious Sites", vrAvailable: false, image: placeholder },

  // Scenic & Adventure Spots
  { id: 47, name: "Patratu Valley", description: "Scenic valley with winding roads", category: "Scenic & Adventure Spots", vrAvailable: false, image: placeholder },
  { id: 48, name: "Magnolia Sunset Point", description: "Famous sunset spot in Netarhat", category: "Scenic & Adventure Spots", vrAvailable: true, image: hundruFalls },
  { id: 49, name: "Koel View Point", description: "Viewpoint in Netarhat", category: "Scenic & Adventure Spots", vrAvailable: false, image: hundruFalls },
  { id: 50, name: "Rock Garden", description: "Garden in Ranchi with rock sculptures", category: "Scenic & Adventure Spots", vrAvailable: false, image: placeholder },
  { id: 51, name: "Tagore Hill", description: "Hilltop with Rabindranath Tagore's memorial", category: "Scenic & Adventure Spots", vrAvailable: false, image: placeholder },
  { id: 52, name: "Canary Hill", description: "Hill in Hazaribagh", category: "Scenic & Adventure Spots", vrAvailable: false, image: placeholder },
  { id: 53, name: "Trikuta Hills", description: "Hill range near Deoghar", category: "Scenic & Adventure Spots", vrAvailable: false, image: placeholder },
  { id: 54, name: "Fuldungri Pahar", description: "Hill in Ghatshila", category: "Scenic & Adventure Spots", vrAvailable: false, image: placeholder },

  // Additional Attractions
  { id: 55, name: "Tata Steel Zoological Park", description: "Zoo in Jamshedpur", category: "Additional Attractions", vrAvailable: false, image: placeholder },
  { id: 56, name: "Jubilee Park", description: "Park in Jamshedpur", category: "Additional Attractions", vrAvailable: false, image: placeholder },
  { id: 57, name: "Jayanti Sarovar", description: "Lake in Jubilee Park, Jamshedpur", category: "Additional Attractions", vrAvailable: false, image: placeholder },
  { id: 58, name: "Hudco Lake", description: "Lake in Jamshedpur", category: "Additional Attractions", vrAvailable: false, image: placeholder },
  { id: 59, name: "Palamau Fort", description: "Historic fort in Palamau", category: "Additional Attractions", vrAvailable: false, image: placeholder },
  { id: 60, name: "Ramakrishna Mission Vidyapith", description: "School in Deoghar", category: "Additional Attractions", vrAvailable: false, image: placeholder },
  { id: 61, name: "Isko Village", description: "Rock art site in Hazaribagh", category: "Additional Attractions", vrAvailable: false, image: placeholder },
  { id: 62, name: "Suryakund Hot Spring", description: "Hot spring near Deoghar", category: "Additional Attractions", vrAvailable: false, image: placeholder },
  { id: 63, name: "Ranchi War Cemetery", description: "World War II cemetery in Ranchi", category: "Additional Attractions", vrAvailable: false, image: placeholder },
];

// Helper function for longer descriptions

const ExploreGrid = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useMemo(() => {
    const q = new URLSearchParams(location.search).get("q");
    return (q || "").toLowerCase();
  }, [location.search]);

  const filtered = useMemo(() => {
    if (!query) return destinations;
    return destinations.filter((d) =>
      [d.name, d.description, d.category]
        .some((v) => v.toLowerCase().includes(query))
    );
  }, [query]);

  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-river bg-clip-text text-transparent">
              Explore
            </span>{" "}
            Jharkhand
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover breathtaking destinations with interactive maps and VR previews
          </p>
          {query && (
            <p className="mt-2 text-sm text-muted-foreground">
              Showing results for "{query}" ({filtered.length})
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {dest.vrAvailable && (
                    <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs">
                      VR Available
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-accent/90 text-accent-foreground px-2 py-1 rounded-full text-xs">
                    {dest.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{dest.name}</h3>
                  <p className="text-muted-foreground text-sm mb-1">
                    {dest.description}
                  </p>
                  <p className="text-xs text-accent-foreground mb-4">
                    {getPlaceDescription(dest.name)}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-forest text-white font-semibold shadow-md hover:opacity-90 border-0"
                      onClick={() => navigate(`/map?name=${encodeURIComponent(dest.name)}`)}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="tracking-wide">View on Map</span>
                    </Button>
                    {dest.vrAvailable ? (
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-river text-white font-semibold shadow-md hover:opacity-90 border-0"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        <span className="tracking-wide">VR Tour</span>
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-sunrise text-white font-semibold shadow-md hover:opacity-90 border-0"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        <span className="tracking-wide">Gallery</span>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreGrid;