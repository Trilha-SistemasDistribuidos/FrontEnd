import imgLogo from "../../assets/logo_eco_trilha_white_green.svg";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const { username, password, errorMessage, setUsername, setPassword, handleLogin } = useLogin();

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center p-4">
      <h1 className="flex items-center text-[#2D8C50] text-5xl mb-8 sm:text-4xl md:text-5xl">
        <img src={imgLogo} alt="Logo EcoTrilha" className="w-64 mr-2" />
      </h1>

      <Input value={username} onChange={(e) => setUsername(e.target.value)} title={"UserName"} tipo={'text'} placeholder={"Digite seu UserName"} />
      <Input value={password} onChange={(e) => setPassword(e.target.value)} title = {"Senha"} tipo = {"password"} placeholder={"Digite sua senha"}/>

      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 flex flex-col">
        <Link
          to={"/auth/recuperar-senha"}
          className="text-[#2D8C50] text-right block mb-4"
        >
          Forgot your password?
        </Link>

        <button
          className="bg-[#2D8C50] text-white p-2 rounded-2xl w-full mb-4"
          onClick={handleLogin}
        >
          Entrar
        </button>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <div className="flex items-center w-full mb-4">
          <hr className="border-[#B8DCC2] w-full border-1" />
          <span className="text-gray-500 mx-2">ou</span>
          <hr className="border-[#B8DCC2] w-full border-1" />
        </div>

        <button className="bg-white text-[#2D8C50] border border-[#2D8C50] p-2 rounded-2xl w-full mb-4">
          Login com Google
        </button>

        <div className="text-center mb-2">
          <span className="text-gray-500">Não possui conta? </span>
          <Link to={"/auth/cadastro"} className="text-[#2D8C50] font-bold">
            Crie uma agora
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;