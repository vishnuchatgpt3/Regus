import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, MapPin, Home } from "lucide-react";

const listings = [
  {
    id: 1,
    type: "artisan",
    name: "Tribal Dokra Art",
    provider: "Rajesh Kumar",
    price: "₹2,500",
    rating: 4.8,
    location: "Ranchi",
    image: "/api/placeholder/300/200",
  },
  {
    id: 2,
    type: "homestay",
    name: "Forest View Cottage",
    provider: "Green Valley Homestays",
    price: "₹3,500/night",
    rating: 4.9,
    location: "Netarhat",
    image: "/api/placeholder/300/200",
  },
  {
    id: 3,
    type: "guide",
    name: "Wildlife Safari Guide",
    provider: "Amit Singh",
    price: "₹1,500/day",
    rating: 5.0,
    location: "Betla",
    image: "/api/placeholder/300/200",
  },
  {
    id: 4,
    type: "artisan",
    name: "Handwoven Tussar Silk",
    provider: "Weaver's Collective",
    price: "₹5,000",
    rating: 4.7,
    location: "Dumka",
    image: "/api/placeholder/300/200",
  },
  {
    id: 5,
    type: "homestay",
    name: "Riverside Retreat",
    provider: "Nature's Nest",
    price: "₹2,800/night",
    rating: 4.6,
    location: "Dassam",
    image: "/api/placeholder/300/200",
  },
  {
    id: 6,
    type: "guide",
    name: "Cultural Heritage Tour",
    provider: "Priya Sharma",
    price: "₹2,000/day",
    rating: 4.9,
    location: "Ranchi",
    image: "/api/placeholder/300/200",
  },
];

import { useState } from "react";

const MarketplaceGrid = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredListings =
    activeFilter === "All"
      ? listings
      : listings.filter((l) =>
          (activeFilter === "Artisans" && l.type === "artisan") ||
          (activeFilter === "Homestays" && l.type === "homestay") ||
          (activeFilter === "Guides" && l.type === "guide")
        );

  const handleAction = (listing) => {
    if (listing.type === "artisan") {
      alert(`Buy request for ${listing.name}`);
    } else if (listing.type === "homestay") {
      alert(`Reserve request for ${listing.name}`);
    } else if (listing.type === "guide") {
      alert(`Book request for ${listing.name}`);
    }
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
            <span className="bg-gradient-earth bg-clip-text text-transparent">
              Local
            </span>{" "}
            Marketplace
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with local artisans, book authentic homestays, and hire certified guides
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-2 p-1 bg-muted rounded-lg">
            {["All", "Artisans", "Homestays", "Guides"].map((filter) => (
              <Button
                key={filter}
                variant={filter === activeFilter ? "default" : "ghost"}
                size="sm"
                className="px-6"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 bg-gradient-to-br from-forest/20 to-river/20 flex items-center justify-center">
                  <div className="text-6xl opacity-20">
                    {listing.type === "artisan" && "🎨"}
                    {listing.type === "homestay" && "🏡"}
                    {listing.type === "guide" && "🧭"}
                  </div>
                  <div className="absolute top-2 left-2">
                    <div className="bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs capitalize">
                      {listing.type}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{listing.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    by {listing.provider}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{listing.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {listing.location}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {listing.price}
                    </span>
                    <Button size="sm" className="bg-gradient-forest hover:opacity-90" onClick={() => handleAction(listing)}>
                      {listing.type === "artisan" && <ShoppingBag className="h-4 w-4 mr-1" />}
                      {listing.type === "homestay" && <Home className="h-4 w-4 mr-1" />}
                      {listing.type === "guide" && "Book"}
                      {listing.type === "artisan" && "Buy"}
                      {listing.type === "homestay" && "Reserve"}
                    </Button>
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

export default MarketplaceGrid;