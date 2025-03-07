import React, { useEffect, useState } from "react";
import CardTrilhaGuia from "../../../components/CardTrilha";
import { ApiTrilhas } from "../../../axios-config";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CartaoGuiaTrilha from '../../../components/CartaoGuiaTrilha'

function AgendaGuia() {
  const [trilhas, setTrilhas] = useState([]); // Todas as trilhas do usuário
  const [trilhasFiltradas, setTrilhasFiltradas] = useState([]); // Trilhas filtradas pela data
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [loading, setLoading] = useState(true); // Estado para o carregamento
  const [error, setError] = useState(null); // Estado para erros
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchTrilhas = async () => {
      if (!userId) {
        setError("Usuário não autenticado.");
        setLoading(false);
        return;
      }

      try {
        const response = await ApiTrilhas.get("/api/trails/");
        const trilhasDoUsuario = response.data.filter((trilha) => trilha.user_id === userId);
        setTrilhas(trilhasDoUsuario); // Armazenando todas as trilhas do usuário
        setTrilhasFiltradas(trilhasDoUsuario); // Inicialmente, mostramos todas as trilhas
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar trilhas:", error);
        setError("Erro ao carregar as trilhas.");
        setLoading(false);
      }
    };

    fetchTrilhas();
  }, [userId]);

  const handleDateChange = (date) => {
    setDataSelecionada(date);

    // Filtra as trilhas pela data selecionada
    const dataFormatada = date.toISOString().split('T')[0]; // Formata a data como 'YYYY-MM-DD'
    const trilhasFiltradasPorData = trilhas.filter((trilha) =>
      trilha.date_time.split('T')[0] === dataFormatada // Filtra pelo campo date_time
    );
    setTrilhasFiltradas(trilhasFiltradasPorData);
  };

  if (loading) {
    return <div>Carregando...</div>; // Exibe mensagem enquanto carrega
  }

  if (error) {
    return <div>{error}</div>; // Exibe mensagem de erro
  }

  // Função para formatar a data
  const formatarDataHora = (data) => {
    const date = new Date(data);
    const dataFormatada = date.toLocaleDateString("pt-BR"); // Exibe a data no formato 'DD/MM/YYYY'
    const horaFormatada = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }); // Exibe a hora no formato 'HH:MM'
    return `${dataFormatada} - ${horaFormatada}`; // Junta data e hora
  };

  return (
    <div className="p-4">
      <Header path='/home' title='Agenda' />
      <main className="w-full my-20 px-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Minhas Trilhas</h1>
        {/* Calendário para selecionar a data */}
        <div className="mb-6">
          <Calendar
            onChange={handleDateChange}
            value={dataSelecionada}
          />
        </div>
        {trilhasFiltradas.length > 0 ? (
          <div className="w-full">
            {trilhasFiltradas.map((trilha) => (
              <div key={trilha.id} className="flex flex-col ">
                {/* Exibe a data e hora acima do card */}
                <p className="text-lg font-semibold mb-2 text-gray-600">{formatarDataHora(trilha.date_time)}</p>
                <CartaoGuiaTrilha trilha={trilha} />
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma trilha encontrada para a data selecionada.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default AgendaGuia;
