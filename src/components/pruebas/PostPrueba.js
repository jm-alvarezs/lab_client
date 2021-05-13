import React, { useState } from "react";

const PostPrueba = ({ type, url }) => {
  const [copied, setCopied] = useState(false);

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
        {type === "hemi"
          ? "Hemi Atención"
          : type === "condicional"
          ? "Atención Condicional"
          : "Atención Simple"}
      </p>
      <div className="row my-3">
        <label className="px-3">Enviar por Correo Electrónico</label>
        <div className="col-8">
          <input type="email" className="form-control" />
        </div>
        <div className="col-4">
          <button className="btn btn-dark w-100">Enviar</button>
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
      <input id="url-input" type="text" value={url} className="invisible" />
    </div>
  );
};

export default PostPrueba;
