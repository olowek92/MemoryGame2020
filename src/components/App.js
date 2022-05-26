/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./Board";

import initializeDec from "./initializeDec";

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [dimension, setDimension] = useState(400);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    resizeBoard();
    setCards(initializeDec());
  }, []);

  useEffect(() => {
    showResult();
  });

  useEffect(() => {
    preloadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, cards);

  useEffect(() => {
    const resizeListener = window.addEventListener("resize", resizeBoard);

    return () => window.removeEventListener("resize", resizeListener);
  });

  const handleClick = (id) => {
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      if (sameCardClicked(id)) return;
      setFlipped([flipped[0], id]);
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        resetCards();
      } else {
        setTimeout(resetCards, 2000);
      }
    }
  };

  const handleButtonClick = () => {
    setSolved([]);
    setFlipped([]);
    setCards(initializeDec());
  };

  const preloadImages = () => {
    cards.map((card) => {
      const src = `/img/${card.type}.png`;
      new Image().src = src;
    });
  };

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  };
  const sameCardClicked = (id) => flipped.includes(id);

  const isMatch = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    const flippedCard = cards.find((card) => flipped[0] === card.id);
    return flippedCard.type === clickedCard.type;
  };

  const resizeBoard = () => {
    setDimension(
      Math.min(111, 112)
      // Math.min(
      // document.documentElement.clientWidth,
      // document.documentElement.clientHeight
      // )
    );
  };

  const showResult = () => {
    if (solved.length === 0) {
      setResult("Let's play");
    } else if (solved.length > 0 && solved.length < 16) {
      setResult("Have fun");
    } else if (solved.length === 16) {
      setResult("Victory");
    } else {
      setResult("Błąd gry :(");
    }
  };

  return (
    <>
      <h2>Can you remember where the cards are?</h2>
      <Board
        dimension={dimension}
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        handleButtonClick={handleButtonClick}
        disabled={disabled}
        solved={solved}
        result={result}
      />
    </>
  );
}

export default App;
