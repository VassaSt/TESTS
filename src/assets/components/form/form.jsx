import React from "react";
import "./form.css"

const form = ({ text, handleText, handleClick }) => {
  return (
    <form className="input-form">
      <input
        className="input"
        name="someText"
        onInput={handleText}
        value={text}
      />
      <button className="button" type="button" onClick={handleClick}>
        Print text
      </button>
    </form>
  );
};

export default form;
