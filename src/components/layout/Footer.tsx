import { Mail, Phone, MapPin, Globe } from "lucide-react";
import FeedbackForm from "./FeedbackForm";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-muted/30 to-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-forest bg-clip-text text-transparent">Regus</span>
            </div>
            <p className="text-muted-foreground">
              Eco Jharkhand Trails is a sustainable tourism initiative that connects
              travelers with the rich natural landscapes, vibrant tribal culture,
              and local communities of Jharkhand. We promote eco-friendly travel,
              responsible tourism, and authentic local experiences.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">About Us</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Our Mission: Sustainable eco-tourism for Jharkhand</li>
              <li>Community First: Support local artisans and homestays</li>
              <li>Conservation: Protect forests and biodiversity</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <span>support@ecojharkhandtrails.in</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <span>+91 000 0000 000</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>Ranchi, Jharkhand, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-1/2">
            <h3 className="text-lg font-semibold mb-2 text-primary">Feedback</h3>
            <FeedbackForm />
          </div>
          <div className="text-sm text-muted-foreground flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>© {new Date().getFullYear()} Regus · Eco Jharkhand Trails. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a className="hover:text-foreground" href="#">Privacy</a>
              <a className="hover:text-foreground" href="#">Terms</a>
              <a className="hover:text-foreground" href="#">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;








