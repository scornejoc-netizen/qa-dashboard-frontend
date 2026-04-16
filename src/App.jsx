import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/project/integrav7interfaz" replace />} />
        <Route path="/project/:slug" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function DashboardPage() {
  const { slug } = useParams();
  return <Dashboard slug={slug} />;
}

export default App;
