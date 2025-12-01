import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CadastroPage from './pages/CadastroPage.jsx';
import ReservasPage from './pages/ReservasPage.jsx';
import EspacosPage from './pages/EspacosPage.jsx';

// Componente auxiliar para controlar a exibição da Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  // Lista de rotas onde a Navbar NÃO deve aparecer
  const hideNavRoutes = ['/login', '/cadastro', '/'];
  
  // Verifica se a rota atual está na lista de exclusão
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {showNav && <Navbar />}
      <main className={showNav ? "container mx-auto px-4 py-6" : ""}>
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          
          {/* Rotas Protegidas (Navbar aparecerá aqui) */}
          <Route path="/reservas" element={<ReservasPage />} />
          <Route path="/espacos" element={<EspacosPage />} />
          
          {/* Rota 404 simples */}
          <Route path="*" element={<div className="text-center mt-10">Página não encontrada</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;