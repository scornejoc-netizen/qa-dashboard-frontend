export default function WeeklyProgress() {
  const modules = [
    { name: 'catalogo',      before: 23.1, after: 65.4, delta: 42.3, specs: 11 },
    { name: 'planificacion', before: 59.7, after: 64.9, delta: 5.2,  specs: 7 },
    { name: 'shared',        before: 56.0, after: 58.7, delta: 2.7,  specs: 3 },
  ];

  const totalSpecs = modules.reduce((acc, m) => acc + m.specs, 0);

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
          Comparativo 29 abr 2026 → 07 may 2026
        </span>
      </div>

      <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        Avance esta semana
      </h3>
      <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
        Foco en módulos secundarios con mayor gap de cobertura. {totalSpecs} specs nuevos sumados, +95 pruebas al proyecto (medidas por jest --coverage).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <DeltaCard label="Tests sumados al proyecto" value="+95" sub="2,584 → 2,679 (jest --coverage)" />
        <DeltaCard label="Specs nuevos esta semana" value={totalSpecs} sub="3 módulos trabajados" />
        <DeltaCard label="Cobertura global (lines)" value="+0.43pp" sub="42.66% → 43.09%" />
      </div>

      <div className="space-y-3 mt-5">
        {modules.map((m) => (
          <ModuleDeltaRow key={m.name} {...m} />
        ))}
      </div>
    </div>
  );
}

function DeltaCard({ label, value, sub }) {
  return (
    <div
      className="rounded-lg p-3"
      style={{ backgroundColor: 'var(--bg-card-hover, var(--bg-card))', border: '1px solid var(--border)' }}
    >
      <div className="text-2xl font-bold" style={{ color: '#10b981' }}>{value}</div>
      <div className="text-xs font-medium mt-1" style={{ color: 'var(--text-primary)' }}>{label}</div>
      <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{sub}</div>
    </div>
  );
}

function ModuleDeltaRow({ name, before, after, delta, specs }) {
  const pct = Math.min(after, 100);
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm mb-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>{name}</span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>+{specs} specs</span>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ color: 'var(--text-muted)' }}>{before}%</span>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{after}%</span>
          <span className="font-bold text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#10b98122', color: '#10b981' }}>
            +{delta}pp
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
