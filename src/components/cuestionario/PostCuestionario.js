import React, { useEffect, useState } from "react";
import EmailsService from "../../services/EmailsService";

const PostCuestionario = ({ id, type, url, defaultEmail }) => {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (defaultEmail) {
      setEmail(defaultEmail);
    }
  }, []);

  const copyURL = () => {
    var copyText = document.getElementById("url-input");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    navigator.clipboard.writeText(copyText.value).then(() => {
      setCopied(true);
    });
  };

  return (
    <div className="container-fluid">
      <p>
        {type === "nechapi" ? "Cuestionario Nechapi" : "Cuestioanrio CUPOM"}
      </p>
      <div className="row my-3">
        <label className="px-3">Enviar por Correo Electrónico</label>
        <div className="col-8">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.result)}
          />
        </div>
        <div className="col-4">
          <button
            className="btn btn-dark w-100"
            onClick={() => EmailsService.postEmail(id, "survey", email)}
          >
            Enviar
          </button>
        </div>
      </div>
      <button
        className="btn btn-warning w-100 mt-3 mb-2"
        onClick={() => window.open(url, "_blank")}
      >
        Abrir Ahora
      </button>
      <button className="btn btn-light w-100 mt-3 mb-2" onClick={copyURL}>
        <i className="fa fa-copy"></i> Copiar Enlace
      </button>
      {copied && (
        <span className="text-success">¡Copiado al portapapeles!</span>
      )}
      <input
        id="url-input"
        type="text"
        value={`${window.location.origin}${url}`}
        className="invisible"
        onChange={(e) => e}
      />
    </div>
  );
};

export default PostCuestionario;
