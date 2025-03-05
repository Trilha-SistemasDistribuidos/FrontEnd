import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para acessar o ID da URL
import { ApiTrilhas } from '../../axios-config/index.jsx';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function DetalhesTrilha() {
  const { id } = useParams(); // Obtém o ID da trilha da URL
  const [trail, setTrail] = useState(null); // Estado para armazenar os dados da trilha

  useEffect(() => {
    ApiTrilhas.get(`/trails/${id}`)
      .then(response => setTrail(response.data))
      .catch(error => console.error("Erro ao buscar detalhes da trilha:", error));
  }, [id]);

  if (!trail) return <p>Carregando...</p>;

  return (
    <div>
      <Header title={trail.name} path={'/home'} />
      <main className="container mx-auto p-4 pt-20">
        <div>
            <CardTrilha trilha = {trail} />
            <button className="mt-4 bg-[#2D8C50] text-white py-2 px-4 rounded">
                Agendar
            </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DetalhesTrilha;
