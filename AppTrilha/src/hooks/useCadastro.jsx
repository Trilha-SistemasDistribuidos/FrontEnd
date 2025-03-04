import { useState } from "react";
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

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(formData)
    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem.");
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
        password2:formData.confirmarSenha,
        tipo: formData.tipoConta,

      });
      setSuccess(true);
      console.log("Cadastro realizado com sucesso:", response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao realizar cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading, error, success };
};

export default useCadastro;