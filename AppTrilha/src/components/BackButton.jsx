import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";

const BackButton = ({ path, style }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (!path) {
      navigate(-1); // Se não houver um path, apenas volta para a página anterior
    } else {
      navigate(-1); // Volta primeiro
      setTimeout(() => {
        navigate(path); // Depois de um pequeno delay, vai para a nova rota
      }, 100);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center bg-[#2D8C50] ${style}`}
    >
      <FaChevronCircleLeft className="w-6 h-6 bg-white" />
      <span className="text-sm sm:text-base"></span>
    </button>
  );
};

export default BackButton;