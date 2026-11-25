import { useMemo, useState } from 'react';

import type { TicketsByDayPoint } from '../../services/api';

interface TicketsByDayChartProps {
  points: TicketsByDayPoint[];
}

interface TooltipState {
  point: TicketsByDayPoint;
  x: number;
  y: number;
}

function TicketsByDayChart({ points }: TicketsByDayChartProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chart = useMemo(() => {
    const width = 560;
    const height = 260;
    const padding = { top: 24, right: 16, bottom: 36, left: 36 };
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;
    const maxValue = Math.max(...points.map((item) => item.total), 1);
    const gap = 10;
    const barWidth =
      points.length > 0
        ? Math.max(18, (innerWidth - gap * (points.length - 1)) / points.length)
        : 18;

    const bars = points.map((point, index) => {
      const valueHeight = (point.total / maxValue) * innerHeight;
      const x = padding.left + index * (barWidth + gap);
      const y = padding.top + innerHeight - valueHeight;
      return {
        point,
        index,
        x,
        y,
        width: barWidth,
        height: Math.max(valueHeight, point.total > 0 ? 4 : 0),
        centerX: x + barWidth / 2,
      };
    });

    const ticks = [0, 0.5, 1].map((ratio) => {
      const value = Math.round(maxValue * ratio);
      const y = padding.top + innerHeight - ratio * innerHeight;
      return { value, y };
    });

    return { width, height, padding, innerHeight, bars, ticks, maxValue };
  }, [points]);

  if (points.length === 0) {
    return (
      <div className="no-results">
        <p>Nenhum chamado no período.</p>
      </div>
    );
  }

  return (
    <div className="day-chart">
      <svg
        className="day-chart-svg"
        viewBox={`0 0 ${chart.width} ${chart.height}`}
        role="img"
        aria-label="Chamados por dia"
      >
        {chart.ticks.map((tick) => (
          <g key={`tick-${tick.value}-${tick.y}`}>
            <line
              x1={chart.padding.left}
              x2={chart.width - chart.padding.right}
              y1={tick.y}
              y2={tick.y}
              className="day-chart-grid"
            />
            <text
              x={chart.padding.left - 8}
              y={tick.y + 4}
              className="day-chart-axis"
              textAnchor="end"
            >
              {tick.value}
            </text>
          </g>
        ))}

        {chart.bars.map((bar) => {
          const isActive = activeIndex === bar.index;
          return (
            <g key={bar.point.date}>
              <rect
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                rx={10}
                className={`day-chart-bar${isActive ? ' is-active' : ''}`}
                onMouseEnter={(event) => {
                  const bounds = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  const localX = event.clientX - (bounds?.left ?? 0);
                  const localY = event.clientY - (bounds?.top ?? 0);
                  setActiveIndex(bar.index);
                  setTooltip({
                    point: bar.point,
                    x: localX,
                    y: localY,
                  });
                }}
                onMouseMove={(event) => {
                  const bounds = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  const localX = event.clientX - (bounds?.left ?? 0);
                  const localY = event.clientY - (bounds?.top ?? 0);
                  setTooltip({
                    point: bar.point,
                    x: localX,
                    y: localY,
                  });
                }}
                onMouseLeave={() => {
                  setActiveIndex(null);
                  setTooltip(null);
                }}
              />
              <text
                x={bar.centerX}
                y={chart.height - 12}
                className="day-chart-label"
                textAnchor="middle"
              >
                {bar.point.label}
              </text>
            </g>
          );
        })}
      </svg>

      {tooltip ? (
        <div
          className="day-chart-tooltip"
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          <strong>{tooltip.point.label}</strong>
          <p>Total: {tooltip.point.total}</p>
          <p>Alta: {tooltip.point.alta}</p>
          <p>Média: {tooltip.point.media}</p>
          <p>Baixa: {tooltip.point.baixa}</p>
          <p>Novos: {tooltip.point.novos}</p>
          <p>Em atendimento: {tooltip.point.emAtendimento}</p>
          <p>Resolvidos: {tooltip.point.resolvidos}</p>
        </div>
      ) : null}
    </div>
  );
}

export default TicketsByDayChart;
