import React, { useRef, useState } from "react";
import randomWords from "random-words";
import alphabet from "alphabet";

function App() {
  const [word, setWord] = useState(randomWords());
  const [guesses, setGuesses] = useState([]);
  const [wordGuesses, setWordGuesses] = useState([]);
  const [isWinner, setIsWinner] = useState(false);

  const resetGame = () => {
    setWord(randomWords());
    setGuesses([]);
    setWordGuesses([]);
    setIsWinner(false);
  };
  const guessRef = useRef(null);

  const handleEnter = e => {
    if (e.key === "Enter") {
      handleGuessWord();
    }
  };
  const handleGuessWord = () => {
    const guess = guessRef.current.value;
    setWordGuesses(wordGuesses.concat([guess]));
    if (guess.toLowerCase() === word) {
      setIsWinner(true);
    }
    guessRef.current.value = "";
  };

  const guessLetter = letter => {
    setGuesses(guesses.concat([letter]));
    if (
      getPrompt() &&
      !getPrompt()
        .join()
        .includes("_")
    ) {
      console.log("TRUE", getPrompt().join());
      setIsWinner(true);
    }
  };

  const handleLetter = e => {
    if (e.target.dataset.letter) {
      guessLetter(e.target.dataset.letter);
    }
  };

  const getPrompt = () => {
    return word.split("").map(c => {
      if (guesses.includes(c)) {
        return `${c} `;
      } else {
        return "_ ";
      }
    });
  };

  return (
    <div
      style={{
        position: "relative"
      }}
    >
      <div>
        {isWinner && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              textAlign: "center",
              background: "#ECECEC"
            }}
          >
            <h1>You Win!</h1>
            <button onClick={resetGame} style={{ fontSize: 30 }}>
              Play Again
            </button>
          </div>
        )}
        <div
          style={{ textAlign: "right", margin: 5, fontSize: 20 }}
        >{`Guesses: ${guesses.length + wordGuesses.length}`}</div>
        <div
          style={{ fontFamily: "monospace", fontSize: 30, textAlign: "center" }}
        >
          {getPrompt()}
        </div>
        <div
          onClick={handleLetter}
          style={{ textAlign: "center", margin: "50px 10px 50px 10px" }}
        >
          {alphabet &&
            alphabet.lower.map(letter => {
              return (
                <button
                  disabled={guesses.includes(letter) ? true : false}
                  data-letter={letter}
                  style={{ padding: 10, margin: 2, fontSize: 50 }}
                >
                  {letter}
                </button>
              );
            })}
        </div>
        <div style={{ textAlign: "center" }}>
          <div>
            <input
              type="text"
              ref={guessRef}
              maxLength={word.length}
              style={{ fontSize: 30, margin: 5 }}
              onKeyDown={handleEnter}
            />
          </div>
          <button onClick={handleGuessWord} style={{ fontSize: 30 }}>
            Guess Word
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
