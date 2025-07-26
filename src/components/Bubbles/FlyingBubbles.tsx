"use client";

import { useEffect, useState } from "react";
import "./FlyingBubbles.css";

const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export default function FlyingBubbles() {
  const [bubbles, setBubbles] = useState<
    { left: string; size: string; duration: string; delay: string }[]
  >([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 30 }).map(() => ({
      left: `${getRandom(0, 100)}%`,
      size: `${getRandom(10, 40)}px`,
      duration: `${getRandom(6, 12)}s`,
      delay: `${getRandom(0, 5)}s`,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="flying-bubbles-container">
      {bubbles.map((bubble, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDuration: bubble.duration,
            animationDelay: bubble.delay,
          }}
        />
      ))}
    </div>
  );
}
