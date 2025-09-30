import React from "react"

type Props = {
  showModal: boolean
  toggleModal: () => void
}

const ModalComp: React.FC<Props> = ({ showModal, toggleModal }) => {
  if (!showModal) return null
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>You Win!</h2>
        <button onClick={toggleModal}>Restart Game</button>
      </div>
    </div>
  )
}

export default ModalComp
