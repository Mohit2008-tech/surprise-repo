import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import type { MessageResponse } from "@shared/routes";

interface MessageCardProps {
  message: MessageResponse;
  index: number;
}

export function MessageCard({ message, index }: MessageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100 
      }}
      className="relative group"
    >
      <div className="
        absolute -inset-0.5 bg-gradient-to-br from-primary/30 to-secondary/50 
        rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500
      " />
      <div className="
        relative glass-panel rounded-3xl p-6 sm:p-8 
        hover:-translate-y-1 transition-all duration-300
        flex flex-col h-full
      ">
        <Heart className="absolute top-4 right-4 w-5 h-5 text-primary/40 fill-primary/10" />
        
        <p className="text-foreground/90 font-medium text-lg leading-relaxed pt-2 flex-grow whitespace-pre-wrap">
          {message.content}
        </p>
        
        <div className="mt-6 flex items-center justify-between opacity-60">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Forever & Always</span>
        </div>
      </div>
    </motion.div>
  );
}
