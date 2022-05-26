import React from "react";

function Button({ handleButtonClick }) {
  return <a onClick={handleButtonClick}>Play again</a>;
}

export default Button;
