import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  duration?: number;
  decimals?: number;
  enabled?: boolean;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useCountUp(
  target: number,
  { duration = 900, decimals = 0, enabled = true }: UseCountUpOptions = {}
): number {
  const [value, setValue] = useState(0);
  const currentRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!enabled || Number.isNaN(target)) {
      return;
    }

    const from = currentRef.current;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const next = from + (target - from) * easeOutCubic(progress);
      currentRef.current = next;
      setValue(next);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        currentRef.current = target;
        setValue(target);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, enabled]);

  if (decimals <= 0) {
    return Math.round(value);
  }

  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
