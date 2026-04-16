import ThemeToggle from './ThemeToggle';

export default function Header({ project, pipeline, updatedAt, onRefresh, refreshing }) {
  const date = updatedAt
    ? new Date(updatedAt).toLocaleDateString('es-PE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Sin fecha';

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Panel de Calidad
          </h1>
          <p className="text-base mt-1" style={{ color: 'var(--text-secondary)' }}>
            {project?.name || 'Proyecto'}
            <span className="mx-2" style={{ color: 'var(--text-muted)' }}>|</span>
            <span style={{ color: 'var(--text-muted)' }}>{project?.framework}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{
                backgroundColor:
                  pipeline?.status === 'success' ? 'var(--success)' : 'var(--danger)',
              }}
            />
            <span style={{ color: 'var(--text-secondary)' }}>
              Pipeline {pipeline?.status === 'success' ? 'exitoso' : 'fallido'}
            </span>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
              style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)', border: 'none' }}
              title="Re-importar metricas desde los archivos locales"
            >
              <svg
                className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {refreshing ? 'Actualizando...' : 'Actualizar'}
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Badge de datos verificados */}
      <div className="flex items-center gap-2 mt-3">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: 'var(--success-soft)', color: 'var(--success)' }}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Datos verificados
        </span>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Ultimo analisis: {date}
        </span>
      </div>
    </header>
  );
}
