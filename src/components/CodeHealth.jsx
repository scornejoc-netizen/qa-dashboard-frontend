const GATE_TRANSLATIONS = {
  'Line Coverage': 'Cobertura de lineas',
  'Branch Coverage': 'Cobertura de ramas',
  'Statement Coverage': 'Cobertura de sentencias',
  'Test Pass Rate': 'Tasa de exito de pruebas',
  'Build Success': 'Compilacion exitosa',
  'Lint Errors': 'Errores de formato',
};

function translateGateName(name) {
  return GATE_TRANSLATIONS[name] || name;
}

export default function CodeHealth({ technicalDebt, qualityGates }) {
  if (!technicalDebt) return null;

  const rating = technicalDebt.maintainability_rating || 'N/A';
  const ratingColors = {
    A: { color: 'var(--success)', bg: 'var(--success-soft)', label: 'Excelente' },
    B: { color: 'var(--success)', bg: 'var(--success-soft)', label: 'Bueno' },
    C: { color: 'var(--warning)', bg: 'var(--warning-soft)', label: 'Necesita mejora' },
    D: { color: 'var(--danger)', bg: 'var(--danger-soft)', label: 'Critico' },
  };
  const r = ratingColors[rating] || ratingColors.C;

  const gatesPassed = (qualityGates || []).filter((g) => g.status === 'passed').length;
  const gatesTotal = (qualityGates || []).length;

  return (
    <div>
      {/* Rating + 3 metrics in a row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <div
          className="rounded-xl p-4 text-center"
          style={{ backgroundColor: r.bg, border: `2px solid ${r.color}` }}
        >
          <div className="text-4xl font-black" style={{ color: r.color }}>{rating}</div>
          <div className="text-xs font-medium mt-1" style={{ color: r.color }}>
            Mantenibilidad
          </div>
        </div>

        <MetricBox
          value={technicalDebt.code_smells}
          label="Practicas mejorables"
          desc="Codigo que puede ser mas claro"
        />
        <MetricBox
          value={technicalDebt.complexity_issues}
          label="Funciones complejas"
          desc="Dificiles de mantener"
        />
        <MetricBox
          value={`${gatesPassed}/${gatesTotal}`}
          label="Criterios cumplidos"
          desc={`${technicalDebt.duplication_pct}% codigo duplicado`}
        />
      </div>

      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        Escala: A (excelente) → B (bueno) → C (necesita mejora) → D (critico)
        &middot; Fuente: Analisis estatico automatizado
      </p>
    </div>
  );
}

function MetricBox({ value, label, desc }) {
  return (
    <div
      className="rounded-xl border p-4 text-center"
      style={{ backgroundColor: 'var(--bg-card-alt)', borderColor: 'var(--border)' }}
    >
      <div className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</div>
      <div className="text-xs font-medium mt-1" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </div>
      <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{desc}</div>
    </div>
  );
}
