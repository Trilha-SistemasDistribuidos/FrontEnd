import { FaMapMarked, FaRegCalendarAlt } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Footer() {
  const navigate = useNavigate();
  const [type,setType] = useState();
  const [user,setUser] = useState();

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [] )

  const routes = (type === "aventureiro") ? {
    home: "/home",
    agenda: "/aventureiro/agenda",
    ajustes: "/aventureiro/ajustes",
    perfil: "/perfil",
  } : {
    home: "/home",
    agenda: "/guia/agenda",
    ajustes: "/guia/ajustes",
    perfil: "/perfil",
  };


  return (
    <footer className={`flex fixed bottom-0 left-0 z-50 justify-around items-center w-full bg-[#2D8C50] p-4 rounded-b-sm`}>
      <div 
        className={`flex flex-col justify-center hover:text-white cursor-pointer items-center text-white text-xl lg:text-xl gap-1`}
        onClick={() => navigate(routes.home)}
      >
        <FaMapMarked className="w-6 h-6"/>
        <p className="text-sm font-medium">Explorar</p>        
      </div>
      <div 
        className={`flex flex-col justify-between hover:text-white cursor-pointer items-center text-white text-xl lg:text-xl gap-1`}
        onClick={() => navigate(routes.agenda)}
      >
        <FaRegCalendarAlt className="w-6 h-6"/>
        <p className="text-sm font-medium">Agenda</p>
      </div>
      <div 
        className={`flex flex-col justify-center hover:text-white cursor-pointer items-center text-white text-xl lg:text-xl gap-1`}
        onClick={() => navigate(routes.ajustes)}
      >
        <FaScrewdriverWrench className="w-6 h-6"/>
        <p className="text-sm font-medium">Ajustes</p>
      </div>
      <div 
        className={`flex flex-col justify-center hover:text-white cursor-pointer items-center text-white text-xl lg:text-xl gap-1`}
        onClick={() => navigate(routes.perfil)}
      >
        <IoMdPerson className="w-6 h-6"/>
        <p className="text-sm font-medium">Perfil</p>        
      </div>
    </footer>
  );
}

export default Footer;