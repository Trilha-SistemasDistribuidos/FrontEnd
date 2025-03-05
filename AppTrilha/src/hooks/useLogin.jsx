import { useState } from "react";
import { ApiUser } from "../axios-config"

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await ApiUser.post("/api/token/", { username, password });
      console.log(response)
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      const user = await ApiUser.get("/api/usuario/", {
        headers: {
          Authorization: `Bearer ${response.data.access}`,
        },
      });

      localStorage.setItem("user", JSON.stringify(user.data[0]));
      console.log(localStorage.getItem('user'))
      
     // if (user.data[0].tipo === "Aventureiro") {
       // window.location.href = "/home";
      //} else {
      //  window.location.href = "/home";
     // }
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