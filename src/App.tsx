import React, { useEffect, useState } from "react"
import CardComp from "./components/CardComp"
import cards from "./data/cards.json"
import type { TCard, TCardList } from "./types/card.types"
import ModalComp from "./components/ModalComp"
import "./index.css"

const shuffle = (arr: TCardList): TCardList => {
  return [...arr].sort(() => Math.random() - 0.5)
}

const createGameCards = (): TCardList => {
  const paired = cards.flatMap((c) => [
    { ...c, id: c.id, flipped: false, matched: false },
    { ...c, id: c.id + 100, flipped: false, matched: false }
  ])
  return shuffle(paired)
}

const App: React.FC = () => {
  const [gameCards, setGameCards] = useState<TCardList>([])
  const [flippedCards, setFlippedCards] = useState<TCard[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startNewGame = () => {
    setGameCards(createGameCards())
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setGameOver(false)
  }

  const handleCardClick = (clicked: TCard) => {
    if (clicked.flipped || clicked.matched) return
    if (flippedCards.length === 2) return

    setGameCards((prev) =>
      prev.map((c) =>
        c.id === clicked.id ? { ...c, flipped: true } : c
      )
    )
    setFlippedCards((prev) => [...prev, clicked])
  }

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((m) => m + 1)
      const [first, second] = flippedCards
      if (first.name === second.name) {
        setMatches((m) => m + 1)
        setGameCards((prev) =>
          prev.map((c) =>
            c.name === first.name ? { ...c, matched: true } : c
          )
        )
        setFlippedCards([])
      } else {
        setTimeout(() => {
          setGameCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, flipped: false }
                : c
            )
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }, [flippedCards])

  useEffect(() => {
    if (matches > 0 && matches === gameCards.length / 2) {
      setGameOver(true)
    }
  }, [matches, gameCards])

  return (
    <div className="main_section">
      <h1>Memory Game</h1>
      <p>Moves: {moves}</p>
      <div className="card_container">
        {gameCards.map((c) => (
          <CardComp key={c.id} card={c} clickProp={handleCardClick} />
        ))}
      </div>
		<ModalComp showModal={gameOver} toggleModal={startNewGame} moves={moves} />
    </div>
  )
}

export default App
