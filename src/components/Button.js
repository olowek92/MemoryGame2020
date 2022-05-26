import React from "react";
import "./Button.css";

function Button({ handleButtonClick }) {
  return (
    <button className="button" onClick={handleButtonClick}>
      Play again
    </button>
  );
}

export default Button;
