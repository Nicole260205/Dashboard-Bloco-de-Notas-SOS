import { useEffect, useState } from 'react';

interface AnimatedBarProps {
  percent: number;
  className: string;
  durationMs?: number;
}

function AnimatedBar({
  percent,
  className,
  durationMs = 900,
}: AnimatedBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(0);
    const frame = requestAnimationFrame(() => {
      setWidth(Math.max(0, Math.min(100, percent)));
    });
    return () => cancelAnimationFrame(frame);
  }, [percent]);

  return (
    <div
      className={className}
      style={{
        width: `${width}%`,
        transition: `width ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    />
  );
}

export default AnimatedBar;
