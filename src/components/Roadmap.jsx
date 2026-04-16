export default function Roadmap({ kpis, atcData }) {
  const atcCoverage = atcData?.coverage?.lines_pct || 0;
  const atcTests = atcData?.tests?.total || 0;

  const phases = [
    {
      name: 'Fase 1: Fundacion',
      sprints: 'Sprints 1-2',
      coverageTarget: 30,
      desc: 'Casos de uso, facades, mappers y estados del modulo ATC',
    },
    {
      name: 'Fase 2: Crecimiento',
      sprints: 'Sprints 3-4',
      coverageTarget: 50,
      desc: 'Adapters, entidades, componentes criticos de ATC',
    },
    {
      name: 'Fase 3: Expansion',
      sprints: 'Sprints 5-6',
      coverageTarget: 70,
      desc: 'Pruebas de integracion, componentes UI y paginas de ATC',
    },
    {
      name: 'Fase 4: Madurez',
      sprints: 'Sprints 7-8',
      coverageTarget: 80,
      desc: 'Pruebas E2E con Playwright, escenarios BDD automatizados',
    },
  ];

  // Status based on ATC coverage
  phases.forEach((phase, i) => {
    if (atcCoverage >= phase.coverageTarget) {
      phase.status = 'done';
    } else if (i === 0 || atcCoverage >= (phases[i - 1]?.coverageTarget || 0)) {
      phase.status = 'current';
    } else {
      phase.status = 'pending';
    }
  });

  const hasCurrent = phases.some((p) => p.status === 'current');
  if (!hasCurrent && atcCoverage > 0) {
    const firstPending = phases.find((p) => p.status !== 'done');
    if (firstPending) firstPending.status = 'current';
  }

  return (
    <div>
      <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
        Atencion al Cliente tiene <strong style={{ color: 'var(--accent)' }}>{atcTests} pruebas</strong> con{' '}
        <strong style={{ color: 'var(--accent)' }}>{atcCoverage}%</strong> de cobertura.
        Meta final: {phases[phases.length - 1].coverageTarget}%.
      </p>

      <div className="space-y-3">
        {phases.map((phase, i) => {
          const progress = phase.status === 'done'
            ? 100
            : phase.status === 'current'
            ? Math.round((atcCoverage / phase.coverageTarget) * 100)
            : 0;

          return (
            <div
              key={i}
              className="relative rounded-xl border p-4"
              style={{
                backgroundColor: phase.status === 'current' ? 'var(--accent-soft)' : 'var(--bg-card)',
                borderColor: phase.status === 'current' ? 'var(--accent)' : 'var(--border)',
                borderWidth: phase.status === 'current' ? 2 : 1,
              }}
            >
              {phase.status === 'current' && (
                <span
                  className="absolute -top-2.5 left-4 px-2 py-0.5 rounded text-[10px] font-bold"
                  style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
                >
                  ESTAMOS AQUI
                </span>
              )}

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                    style={{
                      backgroundColor:
                        phase.status === 'done' ? 'var(--success-soft)' :
                        phase.status === 'current' ? 'var(--accent-soft)' : 'var(--bg-card-alt)',
                      color:
                        phase.status === 'done' ? 'var(--success)' :
                        phase.status === 'current' ? 'var(--accent)' : 'var(--text-muted)',
                    }}
                  >
                    {phase.status === 'done' ? '✓' : i + 1}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {phase.name}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {phase.sprints} &middot; Meta: {phase.coverageTarget}% cobertura ATC
                    </div>
                  </div>
                </div>
                {phase.status !== 'pending' && (
                  <span className="text-sm font-bold" style={{ color: phase.status === 'done' ? 'var(--success)' : 'var(--accent)' }}>
                    {phase.status === 'done' ? '100%' : `${progress}%`}
                  </span>
                )}
              </div>

              <p className="text-xs pl-11" style={{ color: 'var(--text-muted)' }}>{phase.desc}</p>

              {phase.status !== 'pending' && (
                <div className="mt-2 ml-11 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-card-alt)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: phase.status === 'done' ? 'var(--success)' : 'var(--accent)',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
