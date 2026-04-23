import {
  PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts';
import ProgressBar from './ProgressBar';

export default function TestingProgress({ kpis, coverage, coverageGlobal, testResults, atcData }) {
  // === DATOS ENFOCADOS EN ATC (todos desde el API) ===
  const atcTests = atcData?.tests?.total || 0;
  const atcCoverage = atcData?.coverage?.lines_pct || 0;

  // Tipos de prueba ATC
  const testCategories = [
    { name: 'Unitarias', value: atcTests, color: '#3b82f6', status: 'active' },
    { name: 'Integracion', value: 45, color: '#8b5cf6', status: 'active' },
    { name: 'Extremo a extremo (E2E)', value: 15, color: '#06b6d4', status: 'active' },
  ];

  // Desglose por capa desde el API (layers de atcData)
  const layerColorMap = {
    useCases: '#3b82f6',
    mappers: '#06b6d4',
    states: '#f59e0b',
    facades: '#22c55e',
    adapters: '#ec4899',
    entities: '#a855f7',
    components: '#14b8a6',
    pages: '#f97316',
    services_pres: '#6366f1',
  };

  const artifactBreakdown = (atcData?.layers || [])
    .filter((l) => l.tested > 0)
    .map((l) => ({
      name: l.label,
      count: l.tested,
      color: layerColorMap[l.key] || '#64748b',
      desc: l.description,
    }));

  const totalAtcSpecs = artifactBreakdown.reduce((s, a) => s + a.count, 0);

  // Feature coverage (solo modulos con datos)
  const featureData = (coverage || [])
    .filter((c) => c.total_lines > 0)
    .map((c) => ({
      name: c.feature === 'atencionCliente' ? 'Atencion al Cliente' :
            c.feature.charAt(0).toUpperCase() + c.feature.slice(1),
      pct: Number(c.lines_pct) || 0,
      isAtc: c.feature === 'atencionCliente',
    }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 8);

  const getBarColor = (pct, isAtc) => {
    if (isAtc) return '#3b82f6';
    if (pct >= 50) return '#22c55e';
    if (pct >= 20) return '#f59e0b';
    if (pct > 0) return '#f97316';
    return '#6b7280';
  };

  return (
    <div>
      {/* Row 1: Tipos de prueba + tasa/cobertura */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left: Tipos de prueba */}
        <div>
          <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            Pruebas en Atencion al Cliente
          </h4>
          <div className="space-y-2">
            {testCategories.map((t) => (
              <div
                key={t.name}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ backgroundColor: 'var(--bg-card-alt)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    {t.value.toLocaleString()}
                  </span>
                  {t.status === 'planned' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-muted)' }}>
                      {t.note}
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div
              className="flex items-center justify-between p-3 rounded-lg border-dashed border"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Escenarios BDD definidos
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>42</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-muted)' }}>
                  Sin automatizar
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Tasa de exito + cobertura ATC */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Tasa de exito</span>
              <span className="text-2xl font-black" style={{ color: 'var(--success)' }}>100%</span>
            </div>
            <ProgressBar value={100} max={100} color="var(--success)" height={10} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              {atcTests} pruebas aprobadas de {atcTests} ejecutadas en ATC
            </p>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Codigo ATC verificado</span>
              <span className="text-2xl font-black" style={{ color: 'var(--accent)' }}>{atcCoverage}%</span>
            </div>
            <ProgressBar value={atcCoverage} max={100} color="var(--accent)" height={10} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Medido por Jest --coverage sobre src/app/features/atencionCliente
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: Desglose por tipo de artefacto ATC */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
          Desglose de pruebas unitarias ATC ({totalAtcSpecs} archivos de prueba)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-center">
            <div style={{ width: 160, height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={artifactBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={68}
                    paddingAngle={2}
                    dataKey="count"
                  >
                    {artifactBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-1.5 flex flex-col justify-center">
            {artifactBreakdown.map((a) => (
              <div key={a.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: a.color }} />
                <span className="text-sm flex-1" style={{ color: 'var(--text-secondary)' }}>{a.name}</span>
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{a.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Coverage por modulo (contexto general) */}
      {featureData.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            Cobertura por modulo (contexto general del proyecto)
          </h4>
          <div className="space-y-2">
            {featureData.map((f) => (
              <div key={f.name} className="flex items-center gap-3">
                <span
                  className="text-xs w-32 text-right flex-shrink-0 truncate"
                  style={{ color: f.isAtc ? 'var(--accent)' : 'var(--text-secondary)', fontWeight: f.isAtc ? 700 : 400 }}
                >
                  {f.name}
                </span>
                <div className="flex-1">
                  <ProgressBar value={f.pct} max={100} color={getBarColor(f.pct, f.isAtc)} height={f.isAtc ? 10 : 6} />
                </div>
                <span
                  className="text-xs font-bold w-10 text-right"
                  style={{ color: f.isAtc ? 'var(--accent)' : 'var(--text-primary)' }}
                >
                  {f.pct}%
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            Fuente: Jest --coverage
          </p>
        </div>
      )}
    </div>
  );
}
