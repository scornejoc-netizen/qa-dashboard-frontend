export default function Section({ title, subtitle, children, id }) {
  return (
    <div
      id={id}
      className="rounded-2xl border p-6 mb-6"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="mb-5">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
