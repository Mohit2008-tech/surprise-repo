import React from "react";
import { motion } from "framer-motion";
import { useMessages } from "@/hooks/use-messages";
import { FloatingBackground } from "@/components/FloatingBackground";
import { MessageCard } from "@/components/MessageCard";
import { AddMessageForm } from "@/components/AddMessageForm";
import { Loader2, Heart, Flower2 } from "lucide-react";

export default function Home() {
  const { data: messages, isLoading, error } = useMessages();

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden pb-24">
      <FloatingBackground />
      
      {/* Decorative top border */}
      <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-80" />

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-12 sm:pt-20">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-16 sm:mb-24"
        >
          <div className="flex justify-center gap-3 mb-6">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
              <Flower2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary opacity-80" />
            </motion.div>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-accent fill-accent/20" />
            </motion.div>
            <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}>
              <Flower2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary opacity-80" />
            </motion.div>
          </div>
          
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-primary leading-tight sm:leading-tight lg:leading-tight drop-shadow-sm mb-6">
            Happy Women's Day<br/>
            <span className="text-4xl sm:text-5xl lg:text-6xl text-foreground/80 mt-2 block">to my amazing girlfriend</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            You are the light of my life, the reason behind my smiles, and the most beautiful soul I know. 
            Today and every day, I celebrate you. 🌸
          </p>
        </motion.div>

        {/* Form Section */}
        <AddMessageForm />

        {/* Message Board Section */}
        <div className="mt-12">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px bg-primary/20 flex-grow max-w-[100px]" />
            <h2 className="text-3xl font-display text-primary px-4 text-center">
              Our Love Notes
            </h2>
            <div className="h-px bg-primary/20 flex-grow max-w-[100px]" />
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-60">
              <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
              <p className="text-primary font-medium animate-pulse">Loading sweet messages...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-white/50 rounded-3xl border border-destructive/20 max-w-2xl mx-auto">
              <p className="text-destructive font-medium text-lg">Failed to load messages.</p>
              <p className="text-muted-foreground mt-2">Please refresh the page to try again.</p>
            </div>
          ) : !messages || messages.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20 glass-panel rounded-3xl max-w-2xl mx-auto"
            >
              <Heart className="w-16 h-16 mx-auto text-primary/20 fill-primary/10 mb-4" />
              <p className="text-xl font-medium text-foreground/70">No messages yet.</p>
              <p className="text-muted-foreground mt-2">Be the first to write a beautiful note!</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {messages.map((msg, idx) => (
                <MessageCard key={msg.id} message={msg} index={idx} />
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
