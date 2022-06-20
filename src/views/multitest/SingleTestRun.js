import React from "react";
import { BASE_URL } from "../../utils";

const SingleTestRun = ({ test }) => {
  const buildUrl = () => {
    let url = `http://localhost:3000/${test.testType.handle}?idTest=${test.id}&token=${test.token}`;
    return url;
  };

  console.log(test);

  return (
    <iframe src={buildUrl()} width="100%" className="vh-100 overflow-hidden" />
  );
};

export default SingleTestRun;
