import Input from "../../components/Input";
import useCadastro from '../../hooks/useCadastro'
import BackButton from "../../components/BackButton";
import { FaGoogle } from 'react-icons/fa';


const CadastroGuia = () => { 
  const { formData, handleChange, handleSubmit, loading, error, success } = useCadastro();

  return (
    <div className="flex flex-col w-screen h-auto justify-center items-center p-4">
      <div className="w-full flex justify-start">
        <BackButton path={"/auth/login"} style="top-8 left-4 z-50" />
      </div>
      <h2 className="font-bold text-3xl mb-6 sm:text-2xl md:text-3xl mt-4">Cadastre-se</h2>

      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 flex flex-col mb-4">
        <div className="flex items-center justify-between bg-[#FAFAFA] p-1 rounded-3xl">
          <button
            className={`flex-1 py-2 text-center rounded-3xl ${
              formData.tipoConta === "Aventureiro"
                ? "bg-white text-[#2D8C50] font-bold"
                : "bg-[#FAFAFA] text-[#666666] font-semibold"
            }`}
            onClick={() => handleChange("tipoConta", "Aventureiro")}
          >
            Aventureiro
          </button>
          <button
            className={`flex-1 py-2 text-center rounded-3xl ${
              formData.tipoConta === "Guia"
                ? "bg-white text-[#2D8C50] font-bold"
                : "bg-[#FAFAFA] text-[#666666] font-semibold"
            }`}
            onClick={() => handleChange("tipoConta", "Guia")}
          >
            Guia
          </button>
        </div>
      </div>

      <Input
        value={formData.nome}
        onChange={(e) => handleChange("nome", e.target.value)}
        title="Nome"
        tipo="text"
        placeholder="Digite seu nome"
      />
      <Input
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        title="E-mail"
        tipo="text"
        placeholder="Digite seu E-mail"
      />
      <Input
        value={formData.username}
        onChange={(e) => handleChange("username", e.target.value)}
        title="Nome de Usuário"
        tipo="text"
        placeholder="Digite seu nome de usuário"
      />
      <Input
        value={formData.senha}
        onChange={(e) => handleChange("senha", e.target.value)}
        title="Senha"
        tipo="password"
        placeholder="Digite sua senha"
      />
      <Input
        value={formData.confirmarSenha}
        onChange={(e) => handleChange("confirmarSenha", e.target.value)}
        title="Confirmar Senha"
        tipo="password"
        placeholder="Confirme sua senha"
      />

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      {success && <div className="text-green-500 text-sm mb-4">Cadastro realizado com sucesso!</div>}

      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 flex flex-col">
        <button
          className="bg-[#2D8C50] text-white p-2 rounded-2xl w-full my-2 transition-colors duration-300 hover:bg-white hover:text-[#2D8C50] border border-[#2D8C50]"
          onClick={handleSubmit}
          disabled={loading}
        >
        {loading ? "Carregando..." : "Cadastre-se"}
        </button>

        <div className="flex items-center w-full my-4">
          <hr className="border-[#B8DCC2] w-full border-1" />
          <span className="text-gray-500 mx-2">ou</span>
          <hr className="border-[#B8DCC2] w-full border-1" />
        </div>

        <button className="bg-white text-black border border-[#2D8C50] p-2 rounded-2xl w-full mb-4 transition-colors duration-300 hover:bg-[#2D8C50] hover:text-white flex items-center justify-center">
          <FaGoogle className="mr-2" />
          Cadastro com o Google
        </button>
      </div>
    </div>
  );
};

export default CadastroGuia;