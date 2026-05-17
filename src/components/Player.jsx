import { useState, useRef } from "react";

export default function Player() {

  console.log("component is re-rendered")
  const playerNameRef = useRef();
  
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  // const [submitted, setSubmitted] = useState(false);

  // function handleChange(event) {
  //   setSubmitted(false);
  //   setEnteredPlayerName(event.target.value);
  // }

  function handleClick() {
    setEnteredPlayerName(playerNameRef.current.value);
    // setSubmitted(true);
  }
  
  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={playerNameRef} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
