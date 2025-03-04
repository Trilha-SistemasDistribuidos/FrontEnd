import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo_eco_trilha_white_green.svg";

const LandingPage = () => {
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState("Carregando...");

  useEffect(() => {
    // Atualiza o texto de carregamento dinamicamente
    const loadingInterval = setInterval(() => {
      setLoadingText((prev) =>
        prev === "Carregando..." ? "Carregando" : prev + "."
      );
    }, 500);

    // Redireciona para "/auth/login" após 3 segundos
    const timer = setTimeout(() => {
      navigate("/auth/login");
    }, 2500);

    // Limpa os timers se o componente for desmontado
    return () => {
      clearTimeout(timer);
      clearInterval(loadingInterval);
    };
  }, [navigate]);

  return (
    <div className="w-full h-screen bg-eco-green flex flex-col justify-center items-center">
      <img src={logo} className="w-64 mb-6" alt="logo-eco-trilha" />
      <p className="text-white text-lg font-medium">{loadingText}</p>
    </div>
  );
};

export default LandingPage;