import { useState } from "react";
import { ApiUser } from "../axios-config"

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await ApiUser.post("/api/token/", { email, password });
      console.log(response)
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      const user = await ApiUser.get("/api/user/usuarios/", {
        headers: {
          Authorization: `Bearer ${response.data.access}`,
        },
      });

      localStorage.setItem("user", JSON.stringify(user.data[0]));
      
      if (user.data[0].tipo === "Aventureiro") {
        window.location.href = "/aventureiro";
      } else {
        window.location.href = "/guia";
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail || "Erro ao realizar login. Tente novamente."
      );
    }
  };

  return {
    email,
    password,
    errorMessage,
    setEmail,
    setPassword,
    handleLogin,
  };
};