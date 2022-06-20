import React, { useState, useEffect } from "react";
import PruebasService from "../../services/PruebasService";

const TestConfigCard = ({ test }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    if (showSettings && settings === null) {
      PruebasService.getPrueba(test.id).then((res) => {
        const prueba = res.data.data.settings;
        if (prueba) {
          setSettings(prueba);
        }
      });
    }
  }, [showSettings]);

  const renderSettings = () => {
    if (settings && settings !== null && showSettings) {
      let columns = Object.keys(settings).filter(
        (key) =>
          !String(key).startsWith("id") &&
          key !== "_id" &&
          key !== "createdAt" &&
          key !== "updatedAt"
      );
      return columns.map((key) => (
        <div className="row">
          <div className="col-6">{key}</div>
          <div className="col-6">{settings[key]}</div>
        </div>
      ));
    }
  };

  return (
    <div className="card p-3 shadow-sm my-3">
      <div className="row">
        <div className="col-10">
          <h4>{test.testType.name}</h4>
        </div>
        <div className="col-2 text-right">
          <button
            className="btn btn-light border"
            onClick={() => setShowSettings(!showSettings)}
          >
            <i className={`fa fa-chevron-${showSettings ? "up" : "down"}`}></i>
          </button>
        </div>
      </div>
      {renderSettings()}
    </div>
  );
};

export default TestConfigCard;
