import React from "react";
import PropTypes from "prop-types";

import Card from "./Card";
import Result from "./Result";
import Button from "./Button";

import "./Board.css";

function Board({
  disabled,
  dimension,
  cards,
  flipped,
  solved,
  handleClick,
  handleButtonClick,
  result
}) {
  return (
    <div className="board">
      {cards.map(card => (
        <Card
          key={card.id}
          id={card.id}
          type={card.type}
          width={dimension} // wcześniej było podzielone przez 4.5
          height={dimension} // wcześniej było podzielone przez 4.5
          flipped={flipped.includes(card.id)}
          solved={solved.includes(card.id)}
          handleClick={handleClick}
          disabled={disabled || solved.includes(card.id)}
        />
      ))}
      <Result result={result} />
      <Button handleButtonClick={handleButtonClick} />
    </div>
  );
}

Board.propTypes = {
  disabled: PropTypes.bool.isRequired,
  dimension: PropTypes.number.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
  solved: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Board;
