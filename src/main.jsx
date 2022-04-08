import React, { useEffect, useState } from "react";
import axios from "axios";

function MyComponent() {
  const [userInput, setUserInput] = useState("Samuel");
  const [agifyData, setAgifyData] = useState({});

  const agifyAPI = "https://api.agify.io?name=";

  useEffect(() => {
    console.log("userInput updated");

    axios
      .get(`${agifyAPI}` + userInput)
      .then(function (response) {
        // handle success
        setAgifyData(response.data);
        console.log(response);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [userInput]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setUserInput(e.target.value);
    }
  }
  console.log("User Input: ", userInput);

  // agifyAPI.map((obj) => {
  //   console.log(obj);
  // });

  return (
    <>
      <h3>Give me a name</h3>
      <label htmlFor="userInput">Hey</label>
      <input type="text" id="userInput" onKeyDown={handleKeyDown} />
    </>
  );
}

export default MyComponent;
