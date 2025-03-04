import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/dashboard/LandingPage";
import Login from "./pages/auth/Login"
import Cadastro from "./pages/auth//Cadastro";
import NotFound from "./pages/NotFound";


function AppRoutes() {
  return (
      <Router>
          <Routes>
            {/* Página inicial */}
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<NotFound />} />

            {/* Rotas de autenticação */}
            <Route path="/auth/login" element={<Login />} />
      
            <Route path="/auth/cadastro" element={<Cadastro />} />
            {/* Rotas do aventureiro */}

            
            {/* Rotas do guia */}
            
          </Routes>
      </Router>
  );
}

export default AppRoutes;