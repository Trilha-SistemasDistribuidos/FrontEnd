import React, { useState, useEffect } from 'react';
import { ApiTrilhas } from '../../axios-config/index.jsx';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { MdManageSearch } from "react-icons/md";
import CardTrilha from '../../components/CardTrilha.jsx';

function Home() {
  const [trails, setTrails] = useState([]); // Lista de trilhas
  const [search, setSearch] = useState(""); // Barra de pesquisa

  // Função para buscar trilhas da API
  useEffect(() => {
    ApiTrilhas.get('/api/trails')
      .then(response => {
        console.log(response.data); // Verifique o que está sendo retornado
        setTrails(response.data); // Define os dados no estado
      })
      .catch(error => console.error("Erro ao buscar trilhas:", error));
  }, []);
  
  const filteredTrails = search
    ? trails.filter(trail =>
        trail.name.toLowerCase().includes(search.toLowerCase())
      )
    : trails;

  const handleClick = (trailId) => {
    // Aqui pode adicionar a lógica de navegação ou outra ação
  };

  return (
    <div>
      <Header title={"Home"} path={'/home'} />
      <main className="container mx-auto p-4 pt-20">

        {/* Barra de Pesquisa */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Buscar trilha..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <div className="bg-[#2D8C50] text-white flex items-center rounded justify-center w-12 h-11 cursor-pointer">
            <MdManageSearch className="text-2xl" />
          </div>        
        </div>

        {/* Lista de Trilhas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrails.length > 0 ? (
            filteredTrails.map(trail => (
              <div key={trail.id} onClick={() => handleClick(trail.id)} className="cursor-pointer">
                <CardTrilha trilha={trail} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">Nenhuma trilha encontrada.</p>
          )}
        </div>

      </main>
      <Footer />
    </div>
  );
}

export default Home;
