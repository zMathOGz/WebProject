import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CadastroPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
    // isAdmin removido para simplificar (padrão será 0/false no banco ou no backend)
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    setLoading(true);

    if (!formData.nome || !formData.email || !formData.senha) {
      setMessage({ text: 'Todos os campos são obrigatórios.', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Enviamos isAdmin: false fixo por segurança neste formulário público
        body: JSON.stringify({ ...formData, isAdmin: false }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: 'Cadastro realizado! Redirecionando para login...', type: 'success' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage({ text: data.error || 'Erro ao cadastrar.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Erro de conexão com o servidor.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 px-4 w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Crie sua Conta</h2>

        {message.text && (
          <div className={`mb-4 p-3 rounded text-sm text-center ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Nome Completo</label>
            <input 
              type="text" name="nome" value={formData.nome} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Seu nome" required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="seu@email.com" required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
            <input 
              type="password" name="senha" value={formData.senha} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Sua senha segura" required
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className={`w-full text-white font-bold py-2 px-4 rounded transition duration-200 mt-6 ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Já tem conta? <a href="/login" className="text-blue-600 font-semibold hover:underline">Entrar</a>
        </p>
      </div>
    </div>
  );
};

export default CadastroPage;