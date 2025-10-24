import { useState } from "react";
import "./ComunicarCard.scss";
import ReactQuill from "react-quill-new";

const ComunicarCard = () => {
  const [emailContent, setEmailContent] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Conteúdo HTML do email:", emailContent);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <section className="comunicar-card">
      <div className="card-content">
        <form onSubmit={handleSubmit}>
          <h2>Escreva o conteúdo do email</h2>

          <ReactQuill
            value={emailContent}
            onChange={setEmailContent}
            modules={modules}
            formats={formats}
            placeholder="Escreva aqui o conteúdo do seu email..."
          />

          <button type="submit" className="submit-btn">
            Enviar
          </button>
        </form>

        <div className="preview">
          <h3>Prévia do email:</h3>
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: emailContent }}
          />
        </div>
      </div>
    </section>
  );
};

export default ComunicarCard;
