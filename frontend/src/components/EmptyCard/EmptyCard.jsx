import React from "react"

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="d-flex flex-col align-items-center justify-content-center mt-5">
      <img src={imgSrc} alt="No notes" className="w-50" />

      <p className="text-center fw-light fs-6 mt-5">
        {message}
      </p>
    </div>
  )
}

export default EmptyCard