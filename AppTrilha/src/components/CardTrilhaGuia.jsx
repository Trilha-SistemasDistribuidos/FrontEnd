import React, { useEffect, useState } from "react";
import { GiPathDistance } from "react-icons/gi";
import { TbHelpSquare } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";
import logo from '../assets/logo_eco_trilha_white_green.svg'; // A imagem pode ser ajustada conforme necessário
import { useNavigate } from "react-router-dom";

const dificuldadeCores = {
  easy: { bg: "#FFF2CD", text: "#C99811" },
  medium: { bg: "#FFE4B2", text: "#C76B00" },
  hard: { bg: "#FFC0CB", text: "#C70039" }
};

const CardTrilha = ({ trilha }) => {
  const [category, setCategory] = useState(null); // Estado para armazenar a categoria
  const { name, difficulty, description, location, length_km, category_id } = trilha;
  const dificuldadeEstilo = dificuldadeCores[difficulty] || dificuldadeCores["easy"];
  const navigate = useNavigate()

  // Função para buscar a categoria pelo ID
  const fetchCategory = async (id) => {
    try {
      const response = await fetch(`/api/categorias/${id}`);
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.error("Erro ao buscar categoria:", error);
    }
  };

  useEffect(() => {
    if (category_id) {
      fetchCategory(category_id);
    }
  }, [category_id]);

  return (
    <div
      onClick={() => navigate(`/aventureiro/detalhestrilhaguia/${trilha.id}`)}
      className="bg-white p-2rounded-lg shadow-md hover:shadow-xl transition-all mb-5 h-[250px] duration-300 cursor-pointer"
    >
      <img src={logo} alt={name} className="w-[100%] h-[35%] mx-auto mb-5" />
      <div className="p-2 ml-2 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-[#18816C]">{name}</h3>
        <span
          className="px-3 py-1 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: dificuldadeEstilo.bg, color: dificuldadeEstilo.text }}
        >
          {difficulty === 'easy' ? 'Fácil' : difficulty === 'medium' ? 'Médio' : 'Difícil'}
        </span>
      </div>

      <p className="p-1 ml-3 text-gray-500 text-sm text-left">
        <strong className="inline-flex items-center mr-2">
          <TbHelpSquare />
          <span className="ml-2">Descrição:</span>
        </strong>
        {description}
      </p>
      <p className="p-1 ml-3 text-gray-500 text-sm text-left">
        <strong className="inline-flex items-center mr-2">
          <GiPathDistance />
          <span className="ml-2">Distância</span>
        </strong>
        {length_km} km
      </p>
      <p className="p-1 ml-3 text-gray-500 text-sm text-left">
        <strong className="inline-flex items-center mr-2">
          <GiPathDistance />
          <span className="ml-2">Localização:</span>
        </strong>
        {location} 
      </p>
    </div>
  );
};

export default CardTrilha;
