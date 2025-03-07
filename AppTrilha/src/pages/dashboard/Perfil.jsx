import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom"; 
import perfil from '../../assets/Imagem perfil.jpg';

function Perfil() {
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); 
      setUserImage(storedUser.image || null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/auth/login"); 
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Header path="/home" title="Perfil" />

      <div className="max-w-lg mx-auto bg-white  my-35 shadow-lg rounded-lg p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-24 h-24">
            <img
              src={userImage || perfil}
              alt="User"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.nome}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600 capitalize">{user?.tipo}</p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            <span>Logout</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              <path fillRule="evenodd" d="M7 5a1 1 0 011.707-.707l4 4a1 1 0 010 1.414l-4 4A1 1 0 017 13V5z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Perfil;
