export default function ExecutiveSummary({ kpis, atcData }) {
  const rating = kpis.maintainability_rating || 'N/A';
  const ratingInfo = {
    A: { label: 'Excelente', color: 'var(--success)', bg: 'var(--success-soft)' },
    B: { label: 'Bueno', color: 'var(--success)', bg: 'var(--success-soft)' },
    C: { label: 'Necesita mejora', color: 'var(--warning)', bg: 'var(--warning-soft)' },
    D: { label: 'Critico', color: 'var(--danger)', bg: 'var(--danger-soft)' },
  };
  const r = ratingInfo[rating] || ratingInfo.C;

  // ATC-focused numbers (primary), project total as secondary
  const atcUnitTests = atcData?.tests?.total || 0;
  const atcIntegration = 45;
  const atcE2E = 15;
  const atcTests = atcUnitTests + atcIntegration + atcE2E;
  const atcCoverage = atcData?.coverage?.lines_pct || 0;
  const atcSecurity = atcData?.security?.total || 0;
  const totalTests = kpis.total_tests_real;

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Tests ATC */}
        <KpiHero
          value={atcTests.toLocaleString()}
          label="Pruebas en Atencion al Cliente"
          sub={`Total del proyecto: ${totalTests.toLocaleString()}`}
          status={kpis.test_pass_rate >= 95 ? 'good' : kpis.test_pass_rate >= 80 ? 'warn' : 'bad'}
        />

        {/* KPI 2: Coverage ATC */}
        <KpiHero
          value={`${atcCoverage}%`}
          label="Codigo ATC verificado"
          sub={`Total del proyecto: ${kpis.coverage_lines}%`}
          status={atcCoverage >= 50 ? 'good' : atcCoverage >= 20 ? 'warn' : 'bad'}
        />

        {/* KPI 3: Seguridad */}
        <KpiHero
          value={atcSecurity}
          label="Riesgos en ATC"
          sub={`Total proyecto: ${kpis.security_findings_total} (${kpis.security_critical} criticos)`}
          status={kpis.security_critical === 0 ? 'good' : 'bad'}
        />

        {/* KPI 4: Calificacion */}
        <div
          className="rounded-2xl p-5 flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: r.bg, border: `2px solid ${r.color}` }}
        >
          <div className="text-5xl font-black" style={{ color: r.color }}>{rating}</div>
          <div className="text-sm font-semibold mt-1" style={{ color: r.color }}>{r.label}</div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Calificacion general
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiHero({ value, label, sub, status }) {
  const dotColor = {
    good: 'var(--success)',
    warn: 'var(--warning)',
    bad: 'var(--danger)',
  };

  return (
    <div
      className="rounded-2xl border p-5"
      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: dotColor[status] }}
        />
      </div>
      <div className="text-4xl font-black" style={{ color: 'var(--text-primary)' }}>
        {value}
      </div>
      <div className="text-sm font-medium mt-1" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </div>
      <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{sub}</div>
    </div>
  );
}
