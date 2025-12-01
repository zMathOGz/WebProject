import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, senha }),
    });
    if (response.ok) navigate('/reservas');
    else alert('Falha no login');
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" class="w-full border p-2" />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" class="w-full border p-2" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Entrar</button>
        <p className="text-center"><a href="/cadastro" className="text-blue-600">Cadastre-se</a></p>
      </form>
    </div>
  );
};
export default LoginPage;