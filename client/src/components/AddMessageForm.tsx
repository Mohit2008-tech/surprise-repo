import React, { useState } from "react";
import { useCreateMessage } from "@/hooks/use-messages";
import { useToast } from "@/hooks/use-toast";
import { Send, Heart, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export function AddMessageForm() {
  const [content, setContent] = useState("");
  const createMessage = useCreateMessage();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    createMessage.mutate(
      { content: content.trim() },
      {
        onSuccess: () => {
          setContent("");
          // Cute confetti effect
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffb6c1', '#f68bb3', '#f2d1f4', '#ffffff']
          });
          
          toast({
            title: "Message Sent! 💌",
            description: "Your sweet note has been added to the board.",
            className: "bg-white border-primary/20 text-foreground",
          });
        },
        onError: (err) => {
          toast({
            title: "Oops!",
            description: err.message || "Failed to send your message.",
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-2xl mx-auto mb-16"
    >
      <div className="glass-panel p-2 sm:p-3 rounded-[2.5rem] shadow-2xl shadow-primary/10">
        <div className="bg-gradient-to-br from-white/80 to-white/40 rounded-[2rem] p-6 sm:p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-display text-primary mb-2">Leave a Love Note</h3>
            <p className="text-muted-foreground text-sm">Express your feelings for this special day</p>
          </div>

          <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="My dearest..."
                className="
                  w-full min-h-[120px] px-6 py-4 rounded-2xl
                  bg-white/50 border-2 border-border/50
                  text-foreground placeholder:text-muted-foreground
                  focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10
                  transition-all duration-300 resize-none
                "
                disabled={createMessage.isPending}
              />
              <Heart className="absolute bottom-4 right-4 w-5 h-5 text-primary/30 pointer-events-none" />
            </div>

            <button
              type="submit"
              disabled={createMessage.isPending || !content.trim()}
              className="
                group relative self-end overflow-hidden
                px-8 py-3 rounded-full font-bold tracking-wide
                bg-gradient-to-r from-primary to-accent
                text-white shadow-lg shadow-primary/30
                hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5
                active:translate-y-0 active:shadow-md
                disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
                transition-all duration-300
              "
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center gap-2">
                {createMessage.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Love <Send className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
