import React, { useEffect, useState } from "react";
import { secciones } from "../../utils";

const DamageForm = ({ id, damageLocation, modifier, deleteDamage }) => {
  const [location, setLocation] = useState("corteza");
  const [section, setSection] = useState("");
  const [side, setSide] = useState("derecho");

  useEffect(() => {
    const damageProps = damageLocation.split("_");
    if (damageProps.length === 1 && damageLocation !== "") {
      setLocation(damageLocation);
    } else if (damageProps.length === 2) {
      setLocation(damageProps[0]);
      setSection(damageProps[1]);
    } else if (damageProps.length === 3) {
      setLocation(damageProps[0]);
      setSection(damageProps[1]);
      setSide(damageProps[2]);
    }
  }, []);

  useEffect(() => {
    modifier(`${location}_${section}_${side}`);
  }, [location, section, side]);

  useEffect(() => {
    if (section === "" && location !== "") {
      const seccion = secciones[location];
      if (seccion) {
        if (seccion.options) {
          let option = seccion.options[0];
          if (option && option !== null) {
            let value = option.value;
            setSection(value);
          }
        }
      }
    }
  }, [location]);

  const renderSecciones = () => {
    const seccion = secciones[location];
    if (seccion)
      return seccion.options.map(({ name, value }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ));
  };

  return (
    <div className="row align-items-center">
      <div className="col-10">
        <label>Ubicación del Daño</label>
        <select
          className="form-control mb-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="corteza">Corteza</option>
          <option value="subcorteza">Subcorteza</option>
          <option value="tronco">Tronco del Encéfalo</option>
          <option value="cerebelo">Cerebelo</option>
          <option value="lobulos">Lóbulos</option>
        </select>
        <div className="row">
          <div
            className={
              secciones[location].has_side &&
              section !== "hipotalamo" &&
              section !== "glandula"
                ? "col-6"
                : "col-12"
            }
          >
            <select
              className="form-control mb-3"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              {renderSecciones()}
            </select>
          </div>
          {secciones[location].has_side &&
            section !== "hipotalamo" &&
            section !== "glandula" && (
              <div className="col-6">
                <select
                  className="form-control mb-3"
                  value={side}
                  onChange={(e) => setSide(e.target.value)}
                >
                  <option>Derecho</option>
                  <option>Izquierdo</option>
                  <option>Bihemisférico</option>
                </select>
              </div>
            )}
        </div>
      </div>
      <div className="col-2">
        <button
          className="btn btn-outline-danger"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            deleteDamage(id);
          }}
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default DamageForm;
