import { useState, useEffect } from "react";
import Card from "./Card";
import styles from "../styles/Home.module.css";

function Home() {
   const initialDeck = [
      { id: 1, name: "billiard ball", image: "/billiardball.svg" },
      { id: 2, name: "billiard ball", image: "/billiardball.svg" },
      { id: 3, name: "bubble tea", image: "/bubbletea.svg" },
      { id: 4, name: "bubble tea", image: "/bubbletea.svg" },
      { id: 5, name: "cactus", image: "/cactus.svg" },
      { id: 6, name: "cactus", image: "/cactus.svg" },
      { id: 7, name: "dog", image: "/dog.svg" },
      { id: 8, name: "dog", image: "/dog.svg" },
      { id: 9, name: "laptop", image: "/laptop.svg" },
      { id: 10, name: "laptop", image: "/laptop.svg" },
      { id: 11, name: "octopus", image: "/octopus.svg" },
      { id: 12, name: "octopus", image: "/octopus.svg" },
      { id: 13, name: "strawberry", image: "/strawberry.svg" },
      { id: 14, name: "strawberry", image: "/strawberry.svg" },
      { id: 15, name: "sunglasses", image: "/sunglasses.svg" },
      { id: 16, name: "sunglasses", image: "/sunglasses.svg" },
   ];

   const simpleShuffleDeck = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const [deck, setDeck] = useState(() => simpleShuffleDeck([...initialDeck]));
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!timerOn && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn, time]);

  useEffect(() => {
    setDeck(simpleShuffleDeck([...initialDeck]));
    setTimerOn(true);
  }, []);

  useEffect(() => {
    if (matched.length === initialDeck.length / 2) {
      setTimerOn(false);
    }
  }, [matched, initialDeck.length]);

  const selectCard = (card) => {
    if (!timerOn) return; // Empêche la sélection de cartes une fois le jeu terminé

    if (selected.length < 2 && !selected.some((c) => c.id === card.id)) {
      const newSelected = [...selected, card];
      setSelected(newSelected);

      if (newSelected.length === 2) {
        if (newSelected[0].name === newSelected[1].name) {
          setMatched((prev) => [...prev, newSelected[0].name]);
          setSelected([]);
        } else {
          setTimeout(() => {
            setSelected([]);
          }, 1000);
        }
      }
    }
  };

  const cardsToDisplay = deck.map((card) => {
    const isSelected = selected.some((c) => c.id === card.id);
    const isMatched = matched.includes(card.name);
    return (
      <Card
        key={card.id}
        id={card.id}
        name={card.name}
        image={card.image}
        selectCard={() => selectCard(card)}
        selected={isSelected || isMatched}
      />
    );
  });

  const gameCompleted = matched.length === initialDeck.length / 2;

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Memo Game 🧠</h1>
        <div className={styles.headerDivider} />
        {gameCompleted ? (
          <div className={styles.congratulations}>
            Félicitations ! Vous avez terminé en {time} secondes.
          </div>
        ) : (
          <div className={styles.timer}>Temps écoulé : {time} secondes</div>
        )}
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>{cardsToDisplay}</div>
      </div>
    </div>
  );
}

export default Home;