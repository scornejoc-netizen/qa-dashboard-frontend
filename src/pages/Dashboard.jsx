import { useDashboard, useFocusATC } from '../hooks/useDashboard';
import Header from '../components/Header';
import ExecutiveSummary from '../components/ExecutiveSummary';
import AtencionClienteFocus from '../components/AtencionClienteFocus';
import WeeklyProgress from '../components/WeeklyProgress';
import TestingProgress from '../components/TestingProgress';
import CodeHealth from '../components/CodeHealth';
import SecurityOverview from '../components/SecurityOverview';
import Roadmap from '../components/Roadmap';
import Section from '../components/Section';

export default function Dashboard({ slug }) {
  const { data, loading, error, refresh, refreshing } = useDashboard(slug);
  const { data: atcData } = useFocusATC(slug);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin mx-auto"
            style={{ borderColor: 'var(--border)', borderTopColor: 'transparent' }}
          />
          <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            Cargando datos del proyecto...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="rounded-2xl border p-8 max-w-md text-center"
          style={{ backgroundColor: 'var(--danger-soft)', borderColor: 'var(--danger)' }}
        >
          <h3 className="text-lg font-semibold" style={{ color: 'var(--danger)' }}>
            No se pudieron cargar los datos
          </h3>
          <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const {
    kpis,
    coverage,
    coverage_global,
    test_results,
    technical_debt,
    security_findings,
    security_summary,
    quality_gates,
    pipeline,
  } = data;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Header
        project={data.project}
        pipeline={pipeline}
        updatedAt={data.project?.updated_at}
        onRefresh={refresh}
        refreshing={refreshing}
      />

      {/* SECCION 1: Estado del Proyecto (ATC como protagonista) */}
      <ExecutiveSummary kpis={kpis} atcData={atcData} />

      {/* AVANCE SEMANAL: foco del jueves */}
      <WeeklyProgress />

      {/* Modulo critico ATC */}
      {atcData && (
        <div className="mb-6">
          <AtencionClienteFocus data={atcData} />
        </div>
      )}

      {/* SECCION 2: Pruebas del Proyecto */}
      <Section
        id="testing"
        title="Pruebas de Atencion al Cliente"
        subtitle="Pruebas ejecutadas sobre el modulo principal del producto. Datos medidos por Jest."
      >
        <TestingProgress
          kpis={kpis}
          coverage={coverage}
          coverageGlobal={coverage_global}
          testResults={test_results}
          atcData={atcData}
        />
      </Section>

      {/* SECCION 3: Riesgos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Section
          id="security"
          title="Seguridad"
          subtitle="Riesgos potenciales en el codigo"
        >
          <SecurityOverview findings={security_findings} summary={security_summary} />
        </Section>

        <Section
          id="health"
          title="Salud del codigo"
          subtitle="Calidad y mantenibilidad"
        >
          <CodeHealth technicalDebt={technical_debt} qualityGates={quality_gates} />
        </Section>
      </div>

      {/* SECCION 4: Plan de accion */}
      <Section
        id="roadmap"
        title="Plan de accion"
        subtitle="Crecimiento progresivo de la cobertura de pruebas automaticas."
      >
        <Roadmap kpis={kpis} atcData={atcData} />
      </Section>

    </div>
  );
}
