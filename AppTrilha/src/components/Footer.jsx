import { FaMapMarked, FaRegCalendarAlt } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { FaScrewdriverWrench, FaUserPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Footer() {
  const navigate = useNavigate();
  const [type, setType] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setType(storedUser.tipo); // Supondo que "tipo" seja salvo no localStorage
    }
  }, []);

  const routes =
    type.toLowerCase() === "aventureiro"
      ? [
          { icon: <FaMapMarked className="w-6 h-6" />, label: "Explorar", path: "/home" },
          { icon: <FaRegCalendarAlt className="w-6 h-6" />, label: "Agenda", path: "/aventureiro/agenda" },
          { icon: <IoMdPerson className="w-6 h-6" />, label: "Perfil", path: "/perfil" },
        ]
      : [
          { icon: <FaMapMarked className="w-6 h-6" />, label: "Explorar", path: "/home" },
          { icon: <FaRegCalendarAlt className="w-6 h-6" />, label: "Agenda", path: "/guia/agenda" },
          { icon: <FaUserPlus className="w-6 h-6" />, label: "Cadastros", path: "/guia/cadastros" },
          { icon: <IoMdPerson className="w-6 h-6" />, label: "Perfil", path: "/perfil" },
        ];

  return (
    <footer className="flex fixed bottom-0 left-0 z-50 justify-around items-center w-full bg-[#2D8C50] p-4 rounded-b-sm">
      {routes.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-center hover:text-white cursor-pointer items-center text-white text-xl lg:text-xl gap-1"
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          <p className="text-sm font-medium">{item.label}</p>
        </div>
      ))}
    </footer>
  );
}

export default Footer;
