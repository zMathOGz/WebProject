import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx'; 

const EspacosPage = () => {
  const [espacos, setEspacos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Estado para o formulário de criação
  const [showForm, setShowForm] = useState(false);
  const [novoEspaco, setNovoEspaco] = useState({
    nome: '',
    capacidade: '',
    descricao: '',
    tipo_espaco_id: 1 // Default simples para teste
  });

  useEffect(() => {
    fetchEspacos();
  }, []);

  const fetchEspacos = async () => {
    try {
      console.log("--- DEBUG FRONTEND: Iniciando fetch para /espacos ---");

      const response = await fetch('http://localhost:3000/espacos', { credentials: 'include' });
      
      console.log("DEBUG FRONTEND - Status da Resposta:", response.status);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      // LOG IMPORTANTE: Verifica o que chegou do Backend
      console.log("DEBUG FRONTEND - JSON recebido:", data);

      if (Array.isArray(data)) {
        setEspacos(data);
      } else {
        console.error("DEBUG FRONTEND - Erro: Dados recebidos não são um array!", data);
        setErrorMsg("Formato de dados inválido recebido do servidor.");
      }
      
      setLoading(false);
    } catch (err) {
      console.error("DEBUG FRONTEND - Erro no fetch:", err);
      setErrorMsg("Falha ao carregar espaços. Verifique se o backend está rodando.");
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/espacos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(novoEspaco)
      });

      if (response.ok) {
        alert('Espaço criado com sucesso!');
        setShowForm(false);
        setNovoEspaco({ nome: '', capacidade: '', descricao: '', tipo_espaco_id: 1 });
        fetchEspacos(); // Recarrega a lista
      } else {
        const errData = await response.json();
        alert('Erro ao criar: ' + (errData.error || 'Desconhecido'));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este espaço?')) return;
    setErrorMsg('');

    try {
      const response = await fetch(`http://localhost:3000/espacos/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setEspacos(espacos.filter(espaco => espaco.id !== id));
        alert('Espaço excluído com sucesso.');
      } else {
        setErrorMsg(data.error || 'Erro ao excluir espaço.');
      }
    } catch (error) {
      setErrorMsg('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Espaços Disponíveis</h1>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {showForm ? 'Cancelar' : '+ Novo Espaço'}
          </button>
        </div>

        {/* Feedback de Erro */}
        {errorMsg && (
          <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Atenção</p>
            <p>{errorMsg}</p>
          </div>
        )}

        {/* Formulário de Criação */}
        {showForm && (
          <div className="bg-white p-6 rounded shadow-md mb-8 border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Cadastrar Novo Espaço</h3>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" placeholder="Nome da Sala" className="border p-2 rounded" required
                value={novoEspaco.nome} onChange={e => setNovoEspaco({...novoEspaco, nome: e.target.value})}
              />
              <input 
                type="number" placeholder="Capacidade" className="border p-2 rounded" required
                value={novoEspaco.capacidade} onChange={e => setNovoEspaco({...novoEspaco, capacidade: e.target.value})}
              />
              <input 
                type="text" placeholder="Descrição" className="border p-2 rounded md:col-span-2"
                value={novoEspaco.descricao} onChange={e => setNovoEspaco({...novoEspaco, descricao: e.target.value})}
              />
              <input 
                type="number" placeholder="ID do Tipo (Ex: 1)" className="border p-2 rounded" required
                value={novoEspaco.tipo_espaco_id} onChange={e => setNovoEspaco({...novoEspaco, tipo_espaco_id: e.target.value})}
              />
              <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700 md:col-span-2">
                Salvar Espaço
              </button>
            </form>
          </div>
        )}

        {/* Loader */}
        {loading && <div className="text-center py-4">Carregando espaços...</div>}

        {/* Lista de Espaços */}
        {!loading && espacos.length === 0 && (
            <div className="text-center text-gray-500">Nenhum espaço cadastrado. Crie o primeiro!</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {espacos.map((espaco) => (
            <div key={espaco.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{espaco.nome}</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                    {espaco.categoria_nome || 'Geral'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{espaco.descricao || 'Sem descrição.'}</p>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span className="mr-2">👥</span>
                  Capacidade: {espaco.capacidade} pessoas
                </div>
                
                <div className="border-t pt-4 flex justify-end">
                  <button 
                    onClick={() => handleDelete(espaco.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold hover:underline"
                  >
                    Excluir Espaço
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EspacosPage;