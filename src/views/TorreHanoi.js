import React, { useState, useEffect } from "react";

const TorreHanoi = () => {
  const discs = [
    {
      color: "naranja",
      size: 1,
    },
    {
      color: "negro",
      size: 2,
    },
    {
      color: "amarillo",
      size: 3,
    },
  ];

  useEffect(() => {
    setInterval(() => {
      move(1, 2);
    }, 3000);
  }, []);

  const [one, setOne] = useState(discs);
  const [two, setTwo] = useState([]);
  const [three, setThree] = useState([]);

  const getArray = (index) => {
    let discosRender = [];
    switch (index) {
      case 1:
        discosRender = [...one];
        break;
      case 2:
        discosRender = [...two];
        break;
      case 3:
        discosRender = [...three];
        break;
    }
    return discosRender;
  };

  const move = (origin, destination) => {
    const originArray = getArray(origin);
    const destArray = getArray(destination);
    const disc = { ...originArray[originArray.length - 1] };
    originArray.pop();
    destArray.push(disc);
    switch (origin) {
      case 1:
        setOne(originArray);
        break;
      case 2:
        setTwo(originArray);
        break;
      case 3:
        setThree(originArray);
        break;
    }
    switch (destination) {
      case 1:
        setOne(destArray);
        break;
      case 2:
        setTwo(destArray);
        break;
      case 3:
        setThree(destArray);
        break;
    }
  };

  const renderDiscos = (disc) => {
    const discosRender = getArray(disc);
    return discosRender.map((disco, index) => (
      <div
        key={index + 1}
        className={`disco disco-${disco.size} ${disco.color}`}
        style={{
          width: `calc(100% - ${disco.size} * 60px)`,
          margin: "auto",
          position: "absolute",
          bottom: `${index * 20}px`,
          left: `${disco.size * 30}px`,
        }}
      ></div>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="stick"></div>
          {renderDiscos(1)}
        </div>
        <div className="col-4">
          <div className="stick"></div>
          {renderDiscos(2)}
        </div>
        <div className="col-4">
          <div className="stick"></div>
          {renderDiscos(3)}
        </div>
      </div>
      <div className="base mw-100 w-100"></div>
      <div className="container-fluid text-center py-3 my-3">
        <button className="btn btn-dark">Iniciar</button>
      </div>
    </div>
  );
};

export default TorreHanoi;
