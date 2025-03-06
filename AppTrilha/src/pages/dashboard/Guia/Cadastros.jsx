import React from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";

function Cadastros() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={"Cadastros"} path="/home" />
      <main className="flex flex-col flex-1 items-center justify-center gap-4">
        <Link
          className="bg-[#2D8C50] text-white flex items-center rounded justify-center w-[80%] px-4 py-2 cursor-pointer"
          to="/guia/cadastro_trilha"
        >
          Cadastrar Trilhas
        </Link>
        <Link
          className="bg-[#2D8C50] text-white flex items-center rounded justify-center w-[80%] px-4 py-2 cursor-pointer"
          to="/guia/cadastro_categoria"
        >
          Cadastrar Categorias
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default Cadastros;