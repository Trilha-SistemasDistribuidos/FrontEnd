import Input from "../../../components/Input";
import { useState, useEffect } from "react";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import { ApiTrilhas, ApiCategoria } from "../../../axios-config";
import PageHeader from "../../../components/Header";

function CadastroTrilha() {
  const navigate = useNavigate();

  const [name, setNome] = useState("");
  const [description, setDescricao] = useState("");
  const [location, setLocation] = useState("");
  const [difficulty, setDificuldade] = useState("easy");
  const [lengthKm, setLengthKm] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]); // Lista de categorias
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiCategoria.get("/api/categories/");
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };
    fetchCategories();
  }, []);

  const criarTrilha = async () => {
    setLoading(true);
    let accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("Sessão expirada. Faça login novamente.");
      navigate("/auth/login");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("difficulty", difficulty);
    formData.append("length_km", lengthKm);
    formData.append("category_id", Number(category));

    try {
      await ApiTrilhas.post("/api/trails/", formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      alert("Trilha cadastrada com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error("Erro ao cadastrar trilha:", error);
      alert("Erro ao cadastrar trilha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center h-full bg-gray-50">
      <PageHeader title="Cadastrar Trilha" type="guia" path="/home" />

      <main className="w-full my-30 px-6 flex flex-col items-center space-y-8">
        <div className="w-full flex flex-col items-center">
          <Input placeholder="Nome da trilha" tipo="text" title="Nome" onChange={(e) => setNome(e.target.value)} />
          <Input placeholder="Descrição" tipo="text" title="Descrição" onChange={(e) => setDescricao(e.target.value)} />
          <Input placeholder="Localização" tipo="text" title="Localização" onChange={(e) => setLocation(e.target.value)} />
          <Input placeholder="Comprimento (km)" tipo="number" title="Distância (km)" onChange={(e) => setLengthKm(e.target.value)} />

          <Input
            title="Categoria"
            tipo="select"
            value={category}
            onChange={(e) => 
              {
                setCategory(e.target.value)
                console.log("Categoria selecionada:", category);
              }
              }
            options={categories.map((cat) => ({
              value: cat.id, // Envia o ID real da categoria
              label: cat.name, // Mostra o nome da categoria no select
            }))}
          />

          <Input
            title="Dificuldade"
            tipo="select"
            value={difficulty}
            onChange={(e) => setDificuldade(e.target.value)}
            options={[
              { value: "easy", label: "Fácil" },
              { value: "medium", label: "Médio" },
              { value: "hard", label: "Difícil" },
            ]}
          /> 
        </div>

        <button
          className="bg-[#18816C] text-white w-full rounded text-lg hover:bg-[#146955] transition-all py-2"
          onClick={criarTrilha}
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar Trilha"}
        </button>
      </main>

      <Footer type="guia" />
    </div>
  );
}

export default CadastroTrilha;
