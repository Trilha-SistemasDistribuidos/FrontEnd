import { FaMapMarked, FaRegCalendarAlt } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { MdAppRegistration } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Footer() {
  const navigate = useNavigate();
  const [type, setType] = useState<"aventureiro" | "guia">("guia"); // Todos são tratados como "guia" por enquanto

  useEffect(() => {
    // Quando precisar ativar a verificação real, descomente esta parte:
    /*
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (userData?.type) {
      setType(userData.type); // Define dinamicamente o tipo do usuário
    }
    */
  }, []);

  const commonRoutes = [
    { path: "/home", label: "Home", icon: <FaMapMarked className="w-6 h-6" /> },
    { 
      path: type === "guia" ? "/guia/agenda" : "/aventureiro/agenda",
      label: "Agenda",
      icon: <FaRegCalendarAlt className="w-6 h-6" />,
    },
    { path: "/perfil", label: "Perfil", icon: <IoMdPerson className="w-6 h-6" /> },
  ];

  // Para guias, adiciona a rota de cadastros
  const extraRoutes = type === "guia"
    ? [{ path: "/cadastros", label: "Cadastros", icon: <MdAppRegistration className="w-6 h-6" /> }]
    : [];

  const routes = [
    ...commonRoutes,
    ...extraRoutes,
    { path: "/config", label: "Config", icon: <FaScrewdriverWrench className="w-6 h-6" /> },
  ];

  return (
    <footer className="flex fixed bottom-0 left-0 z-50 justify-around items-center w-full bg-[#2D8C50] p-4 rounded-b-sm">
      {routes.map(({ path, label, icon }) => (
        <div
          key={path}
          className="flex flex-col justify-center hover:text-white cursor-pointer items-center text-white text-xl gap-1"
          onClick={() => navigate(path)}
        >
          {icon}
          <p className="text-sm font-medium">{label}</p>
        </div>
      ))}
    </footer>
  );
}

export default Footer;
