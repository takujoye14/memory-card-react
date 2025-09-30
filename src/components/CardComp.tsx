import React from "react"
import type { TCard } from "../types/card.types"
import styles from "./CardComp.module.css"

type Props = {
  card: TCard
  clickProp: (card: TCard) => void
}

const CardComp: React.FC<Props> = ({ card, clickProp }) => {
  const handleClick = () => {
    if (!card.flipped && !card.matched) {
      clickProp(card)
    }
  }

  return (
    <div
      className={`${styles.card} ${card.flipped || card.matched ? styles.flipped : ""}`}
      onClick={handleClick}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>?</div>
        <div className={styles.cardBack}>
          <img src={card.image} alt={card.name} />
        </div>
      </div>
    </div>
  )
}

export default CardComp
