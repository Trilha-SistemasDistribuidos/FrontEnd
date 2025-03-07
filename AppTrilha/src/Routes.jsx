import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/dashboard/LandingPage";
import Login from "./pages/auth/Login"
import Cadastro from "./pages/auth//Cadastro";
import NotFound from "./pages/NotFound";
import Home from './pages/dashboard/Home'
import CadastroTrilha from "./pages/dashboard/Guia/CadastroTrilha";
import CadastroCategoria from "./pages/dashboard/Guia/CadastroCategoria";
import Cadastros from "./pages/dashboard/Guia/Cadastros";
import AgendaGuia from "./pages/dashboard/Guia/AgendaGuia";
import Perfil from "./pages/dashboard/Perfil";
import DetalhesTrilhas from './pages/dashboard/Aventureiro/DetalhesTrilhas'
import AgendaAventureiro from "./pages/dashboard/Aventureiro/AgendaAventureiro";
import Inscritos from "./pages/dashboard/Inscritos";
import DetalhesTrilhaGuia from "./pages/dashboard/Guia/DetalhesTrilhaGuia";
import Reviews from "./pages/dashboard/Reviews";

function AppRoutes() {
  return (
      <Router>
          <Routes>
            {/* Página inicial */}
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path = "/home" element={<Home />} /> 
            <Route path = "/perfil" element={<Perfil />} /> 
            <Route path='/inscritos/:id' element = {<Inscritos/>} />
            <Route path='/reviews/:id' element = {<Reviews/>} />

            {/* Rotas de autenticação */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/cadastro" element={<Cadastro />} />
            {/* Rotas do aventureiro */}
            
            <Route path="/aventureiro/detalhestrilha/:id" element={<DetalhesTrilhas />} />
            <Route path="/aventureiro/agenda" element={<AgendaAventureiro />} />


            
            {/* Rotas do guia */}
            <Route path="/guia/agenda" element={<AgendaGuia />} />
            <Route path="/guia/cadastros" element={<Cadastros />} />
            <Route path='/guia/cadastro_trilha' element = {<CadastroTrilha/>} />
            <Route path='/guia/cadastro_categoria' element = {<CadastroCategoria/>} />
            <Route path='/guia/detalhestrilha/:id' element = {<DetalhesTrilhaGuia/>} />



          </Routes>
      </Router>
  );
}

export default AppRoutes;