import { motion } from "framer-motion";
import { Leaf, Users, Briefcase, TreePine } from "lucide-react";
import { useEffect, useState } from "react";

const impacts = [
  {
    icon: Leaf,
    label: "Carbon Offset",
    value: 2500,
    suffix: " tons",
  },
  {
    icon: Users,
    label: "Local Jobs Created",
    value: 50,
    suffix: "+",
  },
  {
    icon: Briefcase,
    label: "Artisans Supported",
    value: 32,
    suffix: "+",
  },
  {
    icon: TreePine,
    label: "Trees Planted",
    value: 15000,
    suffix: "+",
  },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-4xl font-bold text-primary">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const ImpactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-forest/5 to-river/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-earth bg-clip-text text-transparent">Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Promoting sustainable eco-tourism while preserving Jharkhand's natural beauty
            and supporting local communities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-forest mb-4"
              >
                <impact.icon className="h-10 w-10 text-white" />
              </motion.div>
              <Counter value={impact.value} suffix={impact.suffix} />
              <p className="text-muted-foreground mt-2">{impact.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto bg-card rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Sustainability Promise</h3>
            <p className="text-muted-foreground">
              Every booking through Regus contributes to forest conservation, supports
              local tribal communities, and helps preserve Jharkhand's rich cultural
              heritage for future generations.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;