import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/dashboard/LandingPage";
import Login from "./pages/auth/Login"
import Cadastro from "./pages/auth//Cadastro";
import NotFound from "./pages/NotFound";
import Home from './pages/dashboard/Home'
import CadastroTrilha from "./pages/dashboard/Guia/CadastroTrilha";
import CadastroCategoria from "./pages/dashboard/Guia/CadastroCategoria";
import Cadastros from "./pages/dashboard/Guia/Cadastros";

function AppRoutes() {
  return (
      <Router>
          <Routes>
            {/* Página inicial */}
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<NotFound />} />
      <Route path = "/home" element={<Home />} /> 
            {/* Rotas de autenticação */}
            <Route path="/auth/login" element={<Login />} />
      
            <Route path="/auth/cadastro" element={<Cadastro />} />
            {/* Rotas do aventureiro */}

            
            {/* Rotas do guia */}
            <Route path="/guia/cadastros" element={<Cadastros />} />
            <Route path='/guia/cadastro_trilha' element = {<CadastroTrilha/>} />
            <Route path='/guia/cadastro_categoria' element = {<CadastroCategoria/>} />

          </Routes>
      </Router>
  );
}

export default AppRoutes;