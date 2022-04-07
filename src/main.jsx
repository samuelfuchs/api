import React, { useEffect, useState } from "react";
import axios from "axios";

function MyComponent() {
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    console.log("userInput updated");

    axios
      .get("https://api.agify.io?name=michael")
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setUserInput(e.target.value);
    }
  }
  console.log("User Input: ", userInput);

  function handleInputData(e) {
    setUserInput(e.target.value);
  }

  return (
    <>
      <h3>Give me a name</h3>
      <label htmlFor="userInput">Hey</label>
      <input type="text" id="userInput" onKeyDown={handleKeyDown} />
    </>
  );
}

export default MyComponent;
