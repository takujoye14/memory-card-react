import React, { useEffect } from "react"

type Props = {
  showModal: boolean
  toggleModal: () => void
  moves: number
}

const ModalComp: React.FC<Props> = ({ showModal, toggleModal, moves }) => {
  useEffect(() => {
    if (showModal) {
      createConfetti()
    }
  }, [showModal])

  const createConfetti = () => {
    const colors = ['#ef516f', '#27888e', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1']
    const confettiCount = 100
    
    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div')
        confetti.className = 'confetti'
        confetti.style.left = Math.random() * 100 + '%'
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.animationDelay = Math.random() * 3 + 's'
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'
        document.body.appendChild(confetti)
        
        setTimeout(() => confetti.remove(), 5000)
      }, i * 30)
    }
  }

  if (!showModal) return null
  
  return (
    <div className="modal-overlay">
      <div className="modal-banner">
        <div className="trophy">🏆</div>
        <h1 className="win-title">🎉YOU WIN!🎉</h1>
        <p className="win-stats">Completed in <strong>{moves}</strong> moves!</p>
        <button className="restart-button" onClick={toggleModal}>
          🔄 Play Again
        </button>
      </div>
    </div>
  )
}

export default ModalComp