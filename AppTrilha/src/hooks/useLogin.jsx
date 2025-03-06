import { useState } from "react";
import { ApiUser } from "../axios-config";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await ApiUser.post("/api/token/", { username, password });
      console.log(response);

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      const usersResponse = await ApiUser.get("/api/usuario/", {
        headers: {
          Authorization: `Bearer ${response.data.access}`,
        },
      });

      // Filtra o usuário correto pelo username
      const user = usersResponse.data.find((u) => u.username === username);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        console.log(localStorage.getItem("user"));
        window.location.href = "/home";
      } else {
        setErrorMessage("Usuário não encontrado.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail || "Erro ao realizar login. Tente novamente."
      );
    }
  };

  return {
    username,
    password,
    errorMessage,
    setUsername,
    setPassword,
    handleLogin,
  };
};
