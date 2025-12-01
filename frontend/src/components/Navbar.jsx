import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      // Chama o backend para destruir a sessão
      await fetch('http://localhost:3000/logout', { 
        method: 'POST',
        credentials: 'include' 
      });
      // Redireciona para login independente da resposta do back (UX)
      navigate('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      navigate('/login');
    }
  };

  // Função para verificar se o link está ativo (estilo visual)
  const isActive = (path) => location.pathname === path ? "bg-blue-700" : "";

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Home */}
          <Link to="/reservas" className="text-xl font-bold flex items-center gap-2">
            <span>📅</span> Sistema de Reservas
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link 
              to="/reservas" 
              className={`hover:bg-blue-700 px-3 py-2 rounded transition font-medium ${isActive('/reservas')}`}
            >
              Minhas Reservas
            </Link>
            <Link 
              to="/espacos" 
              className={`hover:bg-blue-700 px-3 py-2 rounded transition font-medium ${isActive('/espacos')}`}
            >
              Espaços
            </Link>
            
            <div className="border-l border-blue-400 h-6 mx-2"></div>
            
            <button 
              onClick={handleLogout} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition text-sm font-bold shadow-sm"
            >
              Sair
            </button>
          </div>

          {/* Botão Menu Mobile */}
          <button 
            className="md:hidden focus:outline-none p-2 rounded hover:bg-blue-700" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-blue-500 pt-2">
            <Link 
              to="/reservas" 
              className={`block px-3 py-2 rounded ${isActive('/reservas') || 'hover:bg-blue-700'}`}
              onClick={() => setIsOpen(false)}
            >
              Minhas Reservas
            </Link>
            <Link 
              to="/espacos" 
              className={`block px-3 py-2 rounded ${isActive('/espacos') || 'hover:bg-blue-700'}`}
              onClick={() => setIsOpen(false)}
            >
              Espaços
            </Link>
            <button 
              onClick={() => { handleLogout(); setIsOpen(false); }}
              className="w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded font-bold mt-2"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;