import React, { useState, useEffect } from 'react';

const ReservasPage = () => {
  const [reservas, setReservas] = useState([]);
  const [espacos, setEspacos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados UI
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null); // ID se estiver editando, null se criando
  
  const [formData, setFormData] = useState({
    espaco_id: '',
    data: '',
    hora_inicio: '',
    hora_fim: ''
  });

  useEffect(() => {
    fetchReservas();
    fetchEspacos();
  }, []);

  const fetchReservas = async () => {
    try {
      const response = await fetch('http://localhost:3000/reservas', { credentials: 'include' });
      if (!response.ok) throw new Error('Falha ao carregar reservas.');
      const data = await response.json();
      setReservas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEspacos = async () => {
    try {
      const response = await fetch('http://localhost:3000/espacos', { credentials: 'include' });
      if (response.ok) setEspacos(await response.json());
    } catch (err) { console.error(err); }
  };

  const handleEdit = (reserva) => {
    // Tratamento de data para o input HTML5 (YYYY-MM-DD)
    let dataFormatada = reserva.data;
    if (reserva.data && reserva.data.includes('T')) {
        dataFormatada = reserva.data.split('T')[0];
    }

    setFormData({
      espaco_id: reserva.espaco_id,
      data: dataFormatada,
      hora_inicio: reserva.hora_inicio,
      hora_fim: reserva.hora_fim
    });
    
    setEditingId(reserva.id);
    setShowForm(true);
    // Rola a página para o formulário
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ espaco_id: '', data: '', hora_inicio: '', hora_fim: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = editingId 
      ? `http://localhost:3000/reservas/${editingId}` 
      : 'http://localhost:3000/reservas';
    
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert(editingId ? 'Reserva atualizada com sucesso!' : 'Reserva criada com sucesso!');
        handleCancelForm();
        fetchReservas(); // Atualiza a lista
      } else {
        alert('Erro: ' + (data.error || 'Falha na operação.'));
      }
    } catch (error) {
      alert('Erro de conexão com o servidor.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja cancelar esta reserva permanentemente?')) return;
    try {
      const response = await fetch(`http://localhost:3000/reservas/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        setReservas(reservas.filter(r => r.id !== id));
        alert("Reserva cancelada.");
      } else {
        alert('Erro ao excluir reserva.');
      }
    } catch (error) { console.error(error); }
  };

  const formatDateDisplay = (dateString) => {
    if (!dateString) return '-';
    // Força UTC para evitar problemas de fuso horário na visualização
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' }); 
  };

  return (
    <div className="fade-in animate-fade-in">
      {/* Cabeçalho da Página e Botão Principal */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gerenciar Reservas</h1>
          <p className="text-gray-500 text-sm mt-1">Controle seus agendamentos de espaços</p>
        </div>
        
        <button 
          onClick={() => {
            if (showForm) handleCancelForm();
            else setShowForm(true);
          }}
          className={`px-6 py-2 rounded-lg text-white font-semibold shadow-md transition-all duration-200 transform hover:scale-105 ${
            showForm ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {showForm ? '✖ Cancelar' : '+ Nova Reserva'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm">
            <p><strong>Erro:</strong> {error}</p>
        </div>
      )}

      {/* Formulário de Criação/Edição */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-blue-100">
          <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            {editingId ? '✏️ Editando Reserva' : '📅 Novo Agendamento'}
          </h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-bold mb-2">Espaço / Sala</label>
              <select 
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                value={formData.espaco_id}
                onChange={e => setFormData({...formData, espaco_id: e.target.value})}
                required
              >
                <option value="">Selecione um local...</option>
                {espacos.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.nome} (Capacidade: {e.capacidade})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Data</label>
              <input 
                type="date" 
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                value={formData.data} 
                onChange={e => setFormData({...formData, data: e.target.value})} 
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                  <label className="block text-gray-700 font-bold mb-2">Início</label>
                  <input 
                    type="time" 
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                    value={formData.hora_inicio} 
                    onChange={e => setFormData({...formData, hora_inicio: e.target.value})} 
                    required 
                  />
              </div>
              <div>
                  <label className="block text-gray-700 font-bold mb-2">Fim</label>
                  <input 
                    type="time" 
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                    value={formData.hora_fim} 
                    onChange={e => setFormData({...formData, hora_fim: e.target.value})} 
                    required 
                  />
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
              <button 
                type="button" 
                onClick={handleCancelForm}
                className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 font-bold shadow-md transition transform hover:-translate-y-0.5"
              >
                {editingId ? 'Salvar Alterações' : 'Confirmar Reserva'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabela de Listagem */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
            <p>Carregando dados...</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
           {reservas.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                  <p className="text-lg font-medium mb-1">Nenhuma reserva encontrada.</p>
                  <p className="text-sm">Clique no botão acima para criar seu primeiro agendamento.</p>
              </div>
           ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Data</th>
                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Horário</th>
                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Espaço</th>
                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="px-5 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {reservas.map((r) => (
                        <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-4 text-sm font-medium text-gray-900">
                            {formatDateDisplay(r.data)}
                          </td>
                          <td className="px-5 py-4 text-sm text-gray-600">
                            {r.hora_inicio} - {r.hora_fim}
                          </td>
                          <td className="px-5 py-4 text-sm text-blue-600 font-semibold">
                            {r.nome_espaco}
                          </td>
                          <td className="px-5 py-4 text-sm">
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                r.status === 'CONFIRMADA' ? 'bg-green-100 text-green-800' : 
                                r.status === 'CANCELADA' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-sm text-center">
                            <div className="flex justify-center items-center gap-4">
                                <button 
                                    onClick={() => handleEdit(r)} 
                                    className="text-blue-600 hover:text-blue-800 font-bold text-sm flex items-center gap-1 transition"
                                    title="Editar Reserva"
                                >
                                    ✏️ Editar
                                </button>
                                <button 
                                    onClick={() => handleDelete(r.id)} 
                                    className="text-red-500 hover:text-red-700 font-bold text-sm flex items-center gap-1 transition"
                                    title="Cancelar Reserva"
                                >
                                    🗑️ Excluir
                                </button>
                            </div>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
              </div>
           )}
        </div>
      )}
    </div>
  );
};

export default ReservasPage;