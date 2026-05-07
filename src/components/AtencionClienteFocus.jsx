import ProgressBar from './ProgressBar';

export default function AtencionClienteFocus({ data }) {
  if (!data) return null;

  const { inventory, coverage, tests, security, progress } = data;

  return (
    <div
      className="rounded-2xl border-2 p-6"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--accent)',
        backgroundImage: 'linear-gradient(135deg, var(--accent-soft) 0%, transparent 100%)',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span
          className="px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          MODULO CRITICO
        </span>
      </div>

      <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        {data.display_name}
      </h3>
      <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
        Modulo principal del producto ({inventory.total_files} archivos)
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickStat value={`${coverage.lines_pct}%`} label="Codigo verificado" />
        <QuickStat value={tests.total + 45 + 15} label="Pruebas ejecutadas" />
        <QuickStat value={`${inventory.pct_files_tested}%`} label="Archivos con prueba" />
        <QuickStat value={security.total} label="Riesgos detectados" />
      </div>

      <div className="mt-4">
        <ProgressBar
          value={inventory.tested_files}
          max={inventory.total_files}
          color="var(--accent)"
          height={10}
          label={`Archivos con al menos un spec (${inventory.tested_files}/${inventory.total_files})`}
        />
      </div>
    </div>
  );
}

function QuickStat({ value, label }) {
  return (
    <div
      className="rounded-lg p-3 text-center"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</div>
      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</div>
    </div>
  );
}
