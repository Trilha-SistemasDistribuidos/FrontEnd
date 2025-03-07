import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiTrilhas, ApiAgendamentos } from '../../../axios-config/index';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import CartaoGuiaTrilha from '../../../components/CartaoGuiaTrilha'

function DetalhesTrilhaGuia() {
  const { id } = useParams(); // Obtém o ID da trilha da URL
  const [trail, setTrail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Buscar os detalhes da trilha
    ApiTrilhas.get(`/api/trails/${id}/`)
      .then(response => {
        setTrail(response.data);
      })
      .catch(error => console.error("Erro ao buscar trilhas:", error))
      .finally(() => {
        setLoading(false); // Para garantir que a tela seja renderizada após o carregamento da trilha
      });
  }, [id]); // Reexecuta toda vez que o ID mudar

  const handleDeleteTrilha = () => {
    // Função para excluir a trilha
    if (window.confirm("Tem certeza que deseja cancelar esta trilha?")) {
      ApiTrilhas.delete(`/api/trails/${id}/`)
        .then(() => {
          alert("Trilha cancelada com sucesso!");
          navigate('/guia/agenda');
        })
        .catch(error => {
          console.error("Erro ao cancelar a trilha:", error);
          alert("Houve um erro ao tentar cancelar a trilha.");
        });
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <Header title={trail.name} path={'/home'} />
      <main className="container mx-auto my-20 p-4 pt-20">

          <CartaoGuiaTrilha trilha={trail} />
            <div className='flex flex-col items-center gap-4'>
                <button className="bg-blue-600 w-[100%] text-white py-2 px-4 rounded" onClick={()=>navigate(`/reviews/${trail.user_id}`)}>
                  Ver Reviews
                </button>
            
                <button onClick={()=>navigate(`/inscritos/${id}`)} className="bg-blue-600 w-[100%] text-white py-2 px-4 rounded">
                  Ver inscritos
                </button>
                
                <button 
                  onClick={handleDeleteTrilha}
                  className="bg-red-600 w-[100%] text-white py-2 px-4 rounded"
                >
                  Cancelar Trilha
                </button>
            </div>

      </main>
      <Footer />
    </div>
  );
}

export default DetalhesTrilhaGuia;
