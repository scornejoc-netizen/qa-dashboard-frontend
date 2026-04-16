export default function SecurityOverview({ findings, summary }) {
  if (!findings || findings.length === 0) {
    return (
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        No se detectaron riesgos de seguridad.
      </p>
    );
  }

  const severityConfig = [
    { key: 'critical', label: 'Criticos', color: '#dc2626', icon: '!!' },
    { key: 'high', label: 'Altos', color: '#ea580c', icon: '!' },
    { key: 'medium', label: 'Medios', color: '#d97706', icon: '~' },
    { key: 'low', label: 'Bajos', color: '#2563eb', icon: '-' },
  ];

  const total = findings.length;

  return (
    <div>
      {/* Big number + severity pills */}
      <div className="flex items-center gap-6 mb-5">
        <div>
          <div className="text-5xl font-black" style={{ color: 'var(--text-primary)' }}>
            {total}
          </div>
          <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
            riesgos detectados
          </div>
        </div>
        <div className="flex-1 grid grid-cols-4 gap-2">
          {severityConfig.map((sev) => {
            const count = summary?.[sev.key] || 0;
            return (
              <div
                key={sev.key}
                className="rounded-xl p-3 text-center"
                style={{
                  backgroundColor: count > 0 ? `${sev.color}15` : 'var(--bg-card-alt)',
                  border: `1px solid ${count > 0 ? sev.color : 'var(--border)'}`,
                }}
              >
                <div
                  className="text-2xl font-bold"
                  style={{ color: count > 0 ? sev.color : 'var(--text-muted)' }}
                >
                  {count}
                </div>
                <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {sev.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        Detectados por analisis automatico del codigo fuente (clasificacion OWASP).
        No son explotaciones confirmadas sino riesgos potenciales a revisar.
        &middot; Fuente: Agente QA de seguridad
      </p>
    </div>
  );
}
