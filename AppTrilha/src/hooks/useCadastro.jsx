import { useState, useEffect } from "react";
import { ApiUser } from "../axios-config";

const useCadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    username: "",
    senha: "",
    confirmarSenha: "",
    tipoConta: "Aventureiro",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [usuarios, setUsuarios] = useState([]); // Estado para armazenar os usuários já cadastrados

  // Busca todos os usuários cadastrados ao carregar o componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await ApiUser.get("/api/usuario/");
        setUsuarios(response.data); 
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    };

    fetchUsuarios();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(formData);

    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    // Verifica se o username já existe
    const usernameExiste = usuarios.some((user) => user.username === formData.username);

    if (usernameExiste) {
      setError("Nome de usuário já está em uso. Escolha outro.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const url = "/api/registrar/";

    try {
      const response = await ApiUser.post(url, {
        nome: formData.nome,
        email: formData.email,
        username: formData.username,
        password: formData.senha,
        password2: formData.confirmarSenha,
        tipo: formData.tipoConta,
      });

      setSuccess(true);
      console.log("Cadastro realizado com sucesso:", response.data);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Erro ao realizar cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading, error, success };
};

export default useCadastro;
