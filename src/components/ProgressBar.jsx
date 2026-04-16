export default function ProgressBar({ value, max = 100, color = 'var(--accent)', height = 10, label }) {
  const pct = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</span>
          <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{pct}%</span>
        </div>
      )}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--bg-card-alt)', height }}
      >
        <div
          className="rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, height: '100%', backgroundColor: color }}
        />
      </div>
    </div>
  );
}
