import React, { useEffect, useState } from "react";
import { calculateAverage, randomize } from "../utils";

const SplitHalfTesting = ({
  items,
  average_one,
  average_two,
  column,
  result,
}) => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [iterations, setIterations] = useState(100);

  useEffect(() => {
    calculateTest();
  }, [iterations]);

  const calculateTest = () => {
    let elements = cleanArray(items);
    let { firstAvg, secondAvg } = calculateMedians(elements);
    setFirst(firstAvg);
    setSecond(secondAvg);
  };

  const cleanArray = (items) => {
    return items
      .map((item) => item[column])
      .filter((item) => item !== undefined && item !== null);
  };

  const calculateMedians = (items) => {
    let elements = randomize(items, iterations);
    let firstHalf = elements.slice(0, elements.length / 2);
    let secondHalf = elements.slice(elements.length / 2, elements.length);
    let firstAvg = calculateAverage(firstHalf);
    let secondAvg = calculateAverage(secondHalf);
    return { firstAvg, secondAvg };
  };

  return (
    <div className="container px-0">
      <h2>Prueba de Fiabilidad</h2>
      <div className="row align-items-center my-2">
        <div className="col col-md-6">
          <label>1era Mitad</label>
        </div>
        <div className="col col-md-6">
          <label>{average_one} ms</label>
        </div>
      </div>
      <div className="row align-items-center my-2">
        <div className="col col-md-6">
          <label>2da Mitad</label>
        </div>
        <div className="col col-md-6">
          <label>{average_two} ms</label>
        </div>
      </div>
      <div className="row align-items-center my-2">
        <div className="col col-md-6">
          <label>Resultado</label>
        </div>
        <div className="col col-md-6">
          <label>{calculateAverage(cleanArray(items))} ms</label>
        </div>
      </div>
    </div>
  );
};

export default SplitHalfTesting;
