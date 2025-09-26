import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RoleProtectedRoute from "./components/auth/RoleProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/layout/Navbar";
import Chatbot from "./components/chatbot/Chatbot";
import TripPlanner from "./components/planner/TripPlanner";
import ExploreGrid from "./components/explore/ExploreGrid";
import MarketplaceGrid from "./components/marketplace/MarketplaceGrid";
// import EventsCalendar from "./components/events/EventsCalendar";
import Events from "./pages/Events";
import AnalyticsDashboard from "./components/analytics/AnalyticsDashboard";
import MapPage from "./pages/MapPage";

const queryClient = new QueryClient();

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Chatbot />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/planner" element={<TripPlanner />} />
              <Route path="/explore" element={<ExploreGrid />} />
              <Route path="/marketplace" element={<MarketplaceGrid />} />
              <Route path="/chatbot" element={<Chatbot />} />
              {/* <Route path="/events-calendar" element={<EventsCalendar />} /> */}
              <Route path="/events" element={<Events />} />
              <Route path="/analytics" element={<RoleProtectedRoute requiredRole="author"><AnalyticsDashboard /></RoleProtectedRoute>} />
              <Route path="/map" element={<MapPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
