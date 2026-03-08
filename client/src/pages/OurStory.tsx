import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingBackground } from "@/components/FloatingBackground";

import photo1 from "@assets/PXL_20260213_105404975_1772944321003.jpg";
import photo2 from "@assets/IMG_20260207_122811_1772944321003.jpg";
import photo3 from "@assets/PXL_20260214_125810320_1772944321004.jpg";
import photo4 from "@assets/PXL_20260213_104845717.MP_1772944321004.jpg";

const stories = [
  {
    image: photo1,
    title: "We Fight, But We Love",
    description: "We fight a lot, but our love runs deeper than any argument. Behind every disagreement is the care we have for each other. We love each other from our inner heart.",
    color: "from-pink-300 to-rose-300"
  },
  {
    image: photo2,
    title: "We Show Our Insecurities",
    description: "When either of us meets someone else, insecurity shows. And that's okay. It's a reminder of how much we mean to each other, how much we need one another.",
    color: "from-purple-300 to-pink-300"
  },
  {
    image: photo3,
    title: "We Truly Care",
    description: "We respect each other's boundaries and feelings. We care deeply about each other's happiness and well-being. That care is the foundation of everything we are.",
    color: "from-rose-300 to-purple-300"
  },
  {
    image: photo4,
    title: "Love & Friendship",
    description: "We started as lovers, and now we're trying to become the best of friends too. We're building something beautiful—a love that grows stronger every day, wrapped in genuine friendship.",
    color: "from-pink-300 to-purple-300"
  }
];

export default function OurStory() {
  const [, navigate] = useLocation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden pb-16">
      <FloatingBackground />

      {/* Decorative top border */}
      <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-80" />

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-12 sm:pt-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-16 sm:mb-24"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="flex justify-center mb-6"
          >
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-primary fill-primary/20" />
          </motion.div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-primary leading-tight mb-6">
            Our Love Story
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            What we have is real, raw, and beautiful. Through the fights and the insecurities, 
            through every moment—our romance will never stop. 💕
          </p>
        </motion.div>

        {/* Stories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-16"
        >
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group cursor-default"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-80">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${story.color} opacity-30 group-hover:opacity-40 transition-opacity duration-300`} />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-display text-white mb-3 leading-tight">
                      {story.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                      {story.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Romance Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 glass-panel rounded-3xl p-8 sm:p-12"
        >
          <p className="text-xl sm:text-2xl text-primary font-display mb-4">
            The Romance Will Never Stop
          </p>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-6">
            Through every season, every challenge, every moment of doubt and every burst of joy—
            our love remains constant. We're not just partners; we're best friends, 
            confidants, and the keepers of each other's hearts.
          </p>
          <div className="flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Heart className="w-8 h-8 text-secondary fill-secondary/30" />
            </motion.div>
          </div>
        </motion.div>

        {/* Next Section Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 mt-20"
        >
          <p className="text-muted-foreground text-sm sm:text-base font-medium">
            Ready to leave a sweet message?
          </p>
          <Button
            onClick={() => navigate("/messages")}
            size="lg"
            className="gap-2 rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all"
          >
            Leave a Love Note
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
