export default function WeeklyProgress() {
  const files = [
    { name: 'tab-priority.service',         before: 3.5,  after: 98.5, delta: 95.0 },
    { name: 'portalAcademico.state',        before: 41.1, after: 90.9, delta: 49.8 },
    { name: 'sentinelDetalle.entity',       before: 32.1, after: 100.0, delta: 67.9 },
    { name: 'historialInteraccion.entity',  before: 33.1, after: 100.0, delta: 66.9 },
  ];

  return (
    <div
      className="rounded-2xl border p-6 mb-6"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span
          className="px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: '#10b981', color: '#fff' }}
        >
          AVANCE SEMANAL
        </span>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Comparativo 07 may 2026 → 13 may 2026
        </span>
      </div>

      <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        Esta semana: Profundidad de tests en ATC
      </h3>
      <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
        Foco en líneas/branches no cubiertas dentro de archivos ATC. <strong>Fase 2 cerrada al 100%</strong>, Fase 3 iniciada al 72%.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <DeltaCard label="Tests sumados al proyecto" value="+100" sub="2,679 → 2,779 (jest --coverage)" />
        <DeltaCard label="Cobertura ATC (lines)" value="+4.14pp" sub="46.00% → 50.14%" highlight />
        <DeltaCard label="Cobertura global (lines)" value="+2.05pp" sub="43.09% → 45.14%" />
      </div>

      <h4 className="text-sm font-semibold mb-2 mt-5" style={{ color: 'var(--text-primary)' }}>
        Archivos ATC profundizados
      </h4>
      <div className="space-y-3">
        {files.map((f) => (
          <FileDeltaRow key={f.name} {...f} />
        ))}
      </div>
    </div>
  );
}

function DeltaCard({ label, value, sub, highlight }) {
  return (
    <div
      className="rounded-lg p-3"
      style={{
        backgroundColor: highlight ? '#10b98115' : 'var(--bg-card-hover, var(--bg-card))',
        border: `1px solid ${highlight ? '#10b981' : 'var(--border)'}`,
      }}
    >
      <div className="text-2xl font-bold" style={{ color: '#10b981' }}>{value}</div>
      <div className="text-xs font-medium mt-1" style={{ color: 'var(--text-primary)' }}>{label}</div>
      <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{sub}</div>
    </div>
  );
}

function FileDeltaRow({ name, before, after, delta }) {
  const pct = Math.min(after, 100);
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm mb-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs" style={{ color: 'var(--text-primary)' }}>{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ color: 'var(--text-muted)' }}>{before}%</span>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{after}%</span>
          <span className="font-bold text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#10b98122', color: '#10b981' }}>
            +{delta.toFixed(1)}pp
          </span>
        </div>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-card-hover, #1f2937)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: '#10b981' }}
        />
      </div>
    </div>
  );
}
