"use client";

import { useEffect, useState } from "react";

// super slow at the end
const easeOutExtreme = (t) => 1 - Math.pow(1 - t, 5); 
// power > 3 makes the curve flatten more at the end

export function useCountUp(target, duration = 2000, easing = easeOutExtreme) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easing(progress);

      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setCount(target); // ensure final value
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, easing]);

  return count;
}
