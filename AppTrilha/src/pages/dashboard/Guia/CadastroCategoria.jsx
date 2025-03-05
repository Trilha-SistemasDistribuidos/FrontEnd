import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiCategoria } from "../../../axios-config";
import Input from "../../../components/Input";
import Footer from "../../../components/Footer";
import PageHeader from "../../../components/Header";

function CadastroCategoria() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [recommendedFor, setRecommendedFor] = useState("family");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateCategory = async () => {
    setLoading(true);
    let accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("Sessão expirada. Faça login novamente.");
      navigate("/auth/login");
      return;
    }

    try {
      const categoryData = {
        name,
        description,
        recommended_for: recommendedFor,
      };

      await ApiCategoria.post("/api/categories/", categoryData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      alert("Categoria cadastrada com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
      alert("Erro ao cadastrar categoria. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center h-full bg-gray-50">
      <PageHeader title="Cadastrar Categoria" path="/home" />

      <main className="w-full my-30 px-6 flex flex-col items-center space-y-8">
        <div className="w-full flex flex-col items-center">
          <Input
            placeholder="Nome da categoria"
            tipo="text"
            title="Nome"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Descrição"
            tipo="text"
            title="Descrição"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            title="Recomendado para"
            tipo="select"
            value={recommendedFor}
            onChange={(e) => setRecommendedFor(e.target.value)}
            options={[
              { value: "family", label: "Família" },
              { value: "adventurer", label: "Aventureiro" },
              { value: "couples", label: "Casais" },
              { value: "seniors", label: "Idosos" },
              { value: "nature_lovers", label: "Amantes da Natureza" },
            ]}
          />
        </div>

        <button
          className="bg-[#18816C] text-white w-full rounded text-lg hover:bg-[#146955] transition-all py-2"
          onClick={handleCreateCategory}
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar Categoria"}
        </button>
      </main>

      <Footer type="guia" />
    </div>
  );
}

export default CadastroCategoria;
