import React from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { Link } from "react-router-dom";

function Cadastros() {
  return (
    <div>
        <Header title = {'Cadastros'} path = '/home' /> 
        <main>
            <Link className="bg-[#2D8C50] text-white flex items-center rounded justify-center w-auto h-11 cursor-pointer" to = '/guia/cadastro_trilha'>Cadastrar Trilhas</Link>
            <Link className="bg-[#2D8C50] text-white flex items-center rounded justify-center w-auto h-11 cursor-pointer" to = '/guia/cadastro_categoria'>Cadastrar Categorias</Link>
        </main>
        <Footer />
    </div>
  )
}

export default Cadastros