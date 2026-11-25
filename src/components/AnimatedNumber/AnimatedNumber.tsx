import { useCountUp } from '../../hooks/useCountUp';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  enabled?: boolean;
  fallback?: string;
}

function formatValue(value: number, decimals: number): string {
  if (decimals <= 0) {
    return String(Math.round(value));
  }
  return value.toFixed(decimals).replace('.', ',');
}

function AnimatedNumber({
  value,
  duration = 900,
  decimals = 0,
  suffix = '',
  enabled = true,
  fallback,
}: AnimatedNumberProps) {
  const animated = useCountUp(value, { duration, decimals, enabled });

  if (!enabled && fallback !== undefined) {
    return <>{fallback}</>;
  }

  return (
    <>
      {formatValue(animated, decimals)}
      {suffix}
    </>
  );
}

export default AnimatedNumber;
