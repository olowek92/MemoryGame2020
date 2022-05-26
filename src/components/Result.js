import React from "react";

function Result({ result, solved }) {
  return (
    <h1>
      {result}
      <i class="fas fa-grin-beam"></i>
    </h1>
  );
}

export default Result;
