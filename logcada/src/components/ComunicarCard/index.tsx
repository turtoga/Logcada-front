import { useState } from "react";
import "./ComunicarCard.scss";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Button from "../Button";
import CloseIcon from '../../assets/icon/closeIcon.png';
import api from "../../services/api";
import Input from "../Input";

interface ComunicarCardProps {
  onClose: () => void;
}

const ComunicarCard = ({ onClose }: ComunicarCardProps) => {
  const [titulo, setTitulo] = useState("");
  const [recado, setRecado] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      alert("As mensagnes estão sendo enviadas. Isso pode levar alguns minutos.");
      await api.post("/comunicar", {
        titulo,
        recado
      });

      
      onClose();
    } catch (error) {
      console.error("Erro ao enviar comunicação:", error);
      alert("Erro ao enviar. Tente novamente.");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "link",
  "image",
];


  return (
    <section className="comunicar-card">
      <div className="card-content">
        <div className="card-header">
          <h2>Canal de Comunicação (Email)</h2>
          <Button tipo="quadrado" aria-label="Fechar" onClick={onClose}>
            <img src={CloseIcon} alt="Fechar" className="icon-close" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="spacer-in">
            <Input
            label="Título do Email"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          </div>
          

          <ReactQuill
            value={recado}
            onChange={setRecado}
            modules={modules}
            formats={formats}
            placeholder="Escreva aqui o conteúdo do seu email..."
          />

          <div className="form-buttons">
            <Button type="submit" tipo="normal">
              Enviar para todos
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ComunicarCard;
