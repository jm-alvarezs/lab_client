import React, { useEffect, useState, useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import EmailsService from "../../services/EmailsService";

const PostPrueba = ({ id, type, url, defaultEmail }) => {
  const [correo, setCorreo] = useState("");
  const [copied, setCopied] = useState(false);

  const { success } = useContext(ModalContext);

  useEffect(() => {
    if (defaultEmail) {
      setCorreo(defaultEmail);
    }
    return () => {
      setCorreo("");
    };
  }, []);

  useEffect(() => {
    setCorreo(defaultEmail);
  }, [defaultEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    EmailsService.postEmail(id, "test", correo).then(() => {
      success("¡Correo enviado!");
    });
  };

  const copyURL = () => {
    var copyText = document.getElementById("url-input");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    navigator.clipboard.writeText(copyText.value).then(() => {
      setCopied(true);
    });
  };

  const types = {
    flanker: "Flanker Task",
    hanoi: "Torre de Hanoi",
    hemi: "Hemi Atención",
    condicional: "Atención Condicional",
    simple: "Atención Simple",
  };

  return (
    <div className="container-fluid">
      <p>{types[type]}</p>
      <div className="row my-3">
        <label className="px-3">Enviar por Correo Electrónico</label>
        <div className="col-8">
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div className="col-4">
          <button className="btn btn-primary w-100" onClick={handleSubmit}>
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
      />
    </div>
  );
};

export default PostPrueba;
