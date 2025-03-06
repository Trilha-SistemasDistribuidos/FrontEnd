import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiTrilhas, ApiAgendamentos } from '../../../axios-config/index';
import { FiLoader } from 'react-icons/fi'; // Ícone de carregamento
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import CardTrilha from '../../../components/CardTrilha';

function DetalhesTrilha() {
  const { id } = useParams(); // Obtém o ID da trilha da URL
  const [trail, setTrail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBooked, setIsBooked] = useState(null); // Inicializa como null para indicar que estamos esperando a resposta
  const [isLoadingBooking, setIsLoadingBooking] = useState(false); // Para gerenciar o carregamento do agendamento
  const [message, setMessage] = useState(""); // Mensagem de feedback para o usuário

  // Função para verificar se a trilha já foi agendada
  const checkIfBooked = async () => {
    const user_id = JSON.parse(localStorage.getItem("user")).id;
    try {
      const response = await ApiAgendamentos.get(`/api/bookings/?user_id=${user_id}&trail_id=${id}`);
      if (response.data.length > 0) {
        setIsBooked(true); // Se já existir agendamento, atualizar o estado
      } else {
        setIsBooked(false); // Se não existir agendamento, garantir que o estado seja falso
      }
    } catch (error) {
      console.error("Erro ao verificar agendamento:", error);
    }
  };

  useEffect(() => {
    // Buscar os detalhes da trilha
    ApiTrilhas.get(`/api/trails/${id}`)
      .then(response => {
        setTrail(response.data);
      })
      .catch(error => console.error("Erro ao buscar trilhas:", error))
      .finally(() => {
        setLoading(false); // Para garantir que a tela seja renderizada após o carregamento da trilha
        checkIfBooked(); // Verificar o agendamento após a trilha ter sido carregada
      });
  }, [id]); // Reexecuta toda vez que o ID mudar

  const handleBooking = async () => {
    setIsLoadingBooking(true); // Inicia o carregamento ao clicar no botão
    const user_id = JSON.parse(localStorage.getItem("user")).id;

    if (isBooked) {
      // Se já está agendado, cancelar o agendamento
      try {
        const booking = await ApiAgendamentos.get(`/api/bookings/?user_id=${user_id}&trail_id=${id}`);
        const bookingId = booking.data[0].id; // Pega o ID do agendamento
        await ApiAgendamentos.delete(`/api/bookings/${bookingId}/`);
        setIsBooked(false);
        setMessage("Trilha cancelada com sucesso!"); // Mensagem de sucesso
      } catch (error) {
        console.error("Erro ao cancelar o agendamento:", error);
        setMessage("Erro ao cancelar a trilha. Tente novamente."); // Mensagem de erro
      }
    } else {
      // Se não está agendado, criar um novo agendamento
      try {
        await ApiAgendamentos.post(`/api/bookings/`, {
          user_id: user_id,
          trail_id: id,
          status: "pending",
        });
        setIsBooked(true);
        setMessage("Trilha agendada com sucesso!"); // Mensagem de sucesso
      } catch (error) {
        console.error("Erro ao agendar a trilha:", error);
        setMessage("Erro ao agendar a trilha. Tente novamente."); // Mensagem de erro
      }
    }
    setIsLoadingBooking(false); // Finaliza o carregamento
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <Header title={trail.name} path={'/home'} />
      <main className="container mx-auto my-20 p-4 pt-20">
        <div>
          <CardTrilha trilha={trail} />
          <div className="mt-4 flex gap-4">
            {isLoadingBooking ? (
              <button 
                className="bg-gray-500 text-white w-[50%] py-2 px-4 rounded"
                disabled
              >
                <FiLoader className="animate-spin mr-2" />
                Carregando...
              </button>
            ) : isBooked === null ? ( // Enquanto estamos esperando a resposta, exibe um botão genérico
              <button
                className="bg-gray-500 w-[50%] text-white py-2 px-4 rounded"
                disabled
              >
                --------
              </button>
            ) : isBooked ? (
              <button
                className="bg-red-600 w-[50%] text-white py-2 px-4 rounded"
                onClick={handleBooking}
              >
                Cancelar Trilha
              </button>
            ) : (
              <button
                className="bg-green-600 w-[50%] text-white py-2 px-4 rounded"
                onClick={handleBooking}
              >
                Agendar Trilha
              </button>
            )}
            <button className="bg-blue-600 w-[50%] text-white py-2 px-4 rounded">
              Ver Reviews
            </button>
          </div>
          {/* Exibe a mensagem de feedback para o usuário */}
          {message && <p className="mt-4 text-center text-lg">{message}</p>}

        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DetalhesTrilha;
