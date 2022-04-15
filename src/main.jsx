import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
  Spinner,
} from "reactstrap";

function MyComponent() {
  // API data
  const [agifyData, setAgifyData] = useState({});

  // Loader
  const [agifyLoading, setAgifyLoading] = useState(true);
  // Error
  const [error, setError] = useState(false);

  const [inputForAPI, setInputForAPI] = useState("YourName");

  const initialRender = useRef(true);

  // API routes
  const agifyAPI = "https://api.agify.io?name=";
  const genderizeAPI = "https://api.genderize.io/?name=";

  function fetchData(url, searchData, dataSetter, errorSetter, loaderSetter) {
    axios
      .get(`${url}` + searchData, { timeout: 9000 })
      .then((response) => {
        dataSetter(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        errorSetter(true);
      })
      .finally(() => {
        loaderSetter(false);
      });
  }

  useEffect(() => {
    console.log(initialRender.current);
    if (initialRender.current) {
      console.log("first render");
      initialRender.current = false;
    } else {
      console.log("subsequent render...");
      setAgifyLoading(true);
      fetchData(agifyAPI, inputForAPI, setAgifyData, setError, setAgifyLoading);
    }
  }, [inputForAPI]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (error) {
        setError(false);
      }
      if (agifyLoading) {
        setAgifyLoading(true);
      }
      setInputForAPI(e.target.value);
    }
  }

  return (
    <>
      <Container className="">
        <Card>
          <CardBody>
            <CardTitle tag="h1">AI Guess</CardTitle>
            <CardSubtitle className="mb-4 text-muted" tag="h6">
              Now even more accurate!
            </CardSubtitle>
            <div>
              <Input
                placeholder="Insert a name"
                autoFocus
                type="text"
                id="userInput"
                onKeyDown={handleKeyDown}
              />
            </div>
            <br />
            <CardText>
              {error && <span>Something went wrong!</span>}
              {agifyLoading ? (
                <>{<Spinner />}</>
              ) : (
                <>
                  Name: {agifyData.name}
                  <br />
                  Age: {agifyData.age}
                  <br />
                  {"("}Based on {agifyData.count} results{")"}
                  {/* <strong>{agifyData.count}</strong> entries. */}
                </>
              )}
            </CardText>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default MyComponent;
