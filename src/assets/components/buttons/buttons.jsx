import React from 'react'
import "./buttons.css"

const buttons = ({ handleFunction, text, nameForClass }) => {
  return (
    <button
      className={nameForClass}
      type="button"
      onClick={handleFunction}
    >
      {text}
    </button>
  );
};

export default buttons