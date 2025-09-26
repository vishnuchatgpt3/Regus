import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, MapPin, Leaf, Calendar, DollarSign } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const monthlyData = [
  { month: "Jan", visitors: 4000, bookings: 240 },
  { month: "Feb", visitors: 5200, bookings: 320 },
  { month: "Mar", visitors: 6800, bookings: 450 },
  { month: "Apr", visitors: 5900, bookings: 380 },
  { month: "May", visitors: 7200, bookings: 520 },
  { month: "Jun", visitors: 8100, bookings: 610 },
];

const destinationData = [
  { name: "Hundru Falls", value: 35, color: "#10b981" },
  { name: "Betla Park", value: 28, color: "#3b82f6" },
  { name: "Netarhat", value: 20, color: "#f59e0b" },
  { name: "Others", value: 17, color: "#8b5cf6" },
];

const stats = [
  {
    icon: Users,
    label: "Total Visitors",
    value: "42.3K",
    change: "+12.5%",
    trend: "up",
  },
  {
    icon: MapPin,
    label: "Active Bookings",
    value: "1,845",
    change: "+8.2%",
    trend: "up",
  },
  {
    icon: DollarSign,
    label: "Revenue (INR)",
    value: "₹28.4L",
    change: "+15.3%",
    trend: "up",
  },
  {
    icon: Leaf,
    label: "Eco Score",
    value: "92/100",
    change: "+3.1",
    trend: "up",
  },
];

const AnalyticsDashboard = () => {
  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tourism{" "}
            <span className="bg-gradient-river bg-clip-text text-transparent">
              Analytics
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into Jharkhand's tourism ecosystem
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm mt-2 ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-forest rounded-lg">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Monthly Visitor Trends
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="hsl(155, 72%, 38%)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="hsl(32, 60%, 58%)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                Popular Destinations
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={destinationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {destinationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Eco Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-to-r from-forest/5 to-river/5">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Leaf className="mr-2 h-5 w-5 text-green-600" />
              Environmental Impact Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Carbon Footprint Reduced</p>
                <p className="text-2xl font-bold text-green-600">-23%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Local Employment Growth</p>
                <p className="text-2xl font-bold text-primary">+42%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Forest Conservation Area</p>
                <p className="text-2xl font-bold text-green-600">2,500 Ha</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;