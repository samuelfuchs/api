import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function MyComponent() {
  // API data
  const [agifyData, setAgifyData] = useState({});

  // Loader
  const [loading, setLoading] = useState(true);
  // Error
  const [error, setError] = useState(false);

  const [inputForAPI, setInputForAPI] = useState("YourName");

  const initialRender = useRef(true);

  // API routes
  const agifyAPI = "https://api.agify.io?name=";
  const genderizeAPI = "https://api.genderize.io/?name=";

  useEffect(() => {
    console.log(initialRender.current);
    function fetchData() {
      axios
        .get(`${agifyAPI}` + inputForAPI, { timeout: 9000 })
        .then((response) => {
          setAgifyData(response.data);

          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (initialRender.current) {
      console.log("first render");
      initialRender.current = false;
    } else {
      console.log("subsequent render...");
      setLoading(true);
      fetchData();
    }
  }, [inputForAPI]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (error) {
        setError(false);
      }
      if (loading) {
        setLoading(true);
      }
      setInputForAPI(e.target.value);
    }
  }

  return (
    <>
      <div>
        <label htmlFor="userInput">
          <h3>Insert a name</h3>
        </label>
        <input type="text" id="userInput" onKeyDown={handleKeyDown} />
      </div>
      <br />
      {error && <span>Something went wrong!</span>}
      {loading ? (
        <span>loading...</span>
      ) : (
        <>
          <h3>Name:</h3>
          {agifyData.name}
          <br />
          <span>Age: {agifyData.age}</span>
          <br />
          <strong>{agifyData.count}</strong> entries.
        </>
      )}
    </>
  );
}

export default MyComponent;
