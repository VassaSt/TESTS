import { useState } from "react";
import "./App.css";
import Form from "./assets/components/form/form";
import Buttons from "./assets/components/buttons/buttons";
import CheckBox from "./assets/components/CheckBox"


function App() {
  // input
  const [text, setText] = useState("");
  const [printText, setPrintText] = useState("");

  const handleText = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const handleClick = () => {
    setPrintText(text);
  };

  //styles

  function handleBackground() {
    document.getElementById("btn-section").style.background = "#0bc6ff";
  }

  function handleTextStyle() {
    document.getElementById("printText").style.fontSize = "24px";
  }

  return (
    <>
      <section id="input-section">
        <Form text={text} handleText={handleText} handleClick={handleClick} />
        <p id="printText">{printText}</p>
      </section>
      <section id="btn-section">
        <Buttons
          handleFunction={handleBackground}
          text={"Click to change background"}
          nameForClass={"set-bg"}
        />

        <Buttons
          handleFunction={handleTextStyle}
          text={"Click to change Text Style"}
          nameForClass={"set-text"}
        />
      </section>
      <section>
        <CheckBox
        />
      </section>
    </>
  );
}

export default App;
