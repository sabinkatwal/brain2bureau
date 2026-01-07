import React from 'react';

// A tiny, dependency-free SVG chart that supports line and bar modes.
// Props:
// - data: [{date: '2026-01-01', value: number}, ...] (dates should be increasing)
// - width, height
// - type: 'line'|'bar'
// - color
// - showGrid

export default function ProgressGraph({ data = [], width = 600, height = 160, type = 'line', color = '#3b82f6', showGrid = true }) {
  if (!data || !data.length) return <div style={{padding:16, color:'var(--text-secondary)'}}>No data to display</div>;

  const padding = { top: 12, right: 12, bottom: 24, left: 36 };
  const W = width - padding.left - padding.right;
  const H = height - padding.top - padding.bottom;

  const values = data.map(d => d.value || 0);
  const max = Math.max(...values, 10);
  const min = Math.min(...values, 0);
  const range = max - min || 1;

  const xStep = W / Math.max(1, data.length - 1);

  const points = data.map((d, i) => {
    const x = padding.left + i * xStep;
    const y = padding.top + H - ((d.value - min) / range) * H;
    return { x, y, label: d.date, v: d.value };
  });

  // Build path for line chart
  const dPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <svg width={width} height={height} style={{display:'block'}}> 
      {/* Grid lines */}
      {showGrid && Array.from({length:4}).map((_,i) => {
        const y = padding.top + (H * i) / 3;
        const label = Math.round(max - (range * i) / 3);
        return (
          <g key={i}>
            <line x1={padding.left} x2={padding.left+W} y1={y} y2={y} stroke="rgba(0,0,0,0.04)" />
            <text x={8} y={y+4} fontSize={11} fill="var(--text-secondary)">{label}</text>
          </g>
        );
      })}

      {/* Bars */}
      {type === 'bar' && points.map((p, idx) => {
        const barW = Math.max(6, xStep * 0.6);
        const x = p.x - barW/2;
        const y = p.y;
        const h = padding.top + H - y;
        return <rect key={idx} x={x} y={y} width={barW} height={h} fill={color} rx={4} />;
      })}

      {/* Line */}
      {type === 'line' && (
        <>
          <path d={dPath} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
          {/* area */}
          <path d={`${dPath} L ${padding.left+W} ${padding.top+H} L ${padding.left} ${padding.top+H} Z`} fill={`${color}33`} stroke="none" />
          {/* points */}
          {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={color} />)}
        </>
      )}

      {/* X labels */}
      {points.map((p, i) => {
        const show = (i === 0 || i === points.length - 1 || i % Math.ceil(Math.max(1, points.length / 4)) === 0);
        return show ? <text key={i} x={p.x} y={height - 6} fontSize={11} fill="var(--text-secondary)" textAnchor="middle">{p.label}</text> : null;
      })}
    </svg>
  );
}
