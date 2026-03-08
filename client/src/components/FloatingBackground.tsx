import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export function FloatingBackground() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    // Generate 15 random hearts
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // 0 to 100vw
      delay: Math.random() * 15, // 0 to 15s delay
      duration: 15 + Math.random() * 10, // 15 to 25s duration
      size: 16 + Math.random() * 32, // 16px to 48px size
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart flex items-center justify-center"
          style={{
            left: `${heart.left}vw`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <Heart 
            className="text-primary/30 fill-primary/20" 
            style={{ width: heart.size, height: heart.size }} 
          />
        </div>
      ))}
    </div>
  );
}
