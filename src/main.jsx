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
  const [genderizeData, setGenderizeData] = useState([]);

  // Loader
  const [agifyLoading, setAgifyLoading] = useState(true);
  const [genderizeLoading, setGenderizeLoading] = useState(true);

  // Error
  const [errorAgify, setErrorAgify] = useState(false);
  const [errorGenderize, setErrorGenderize] = useState(false);

  const [inputForAPI, setInputForAPI] = useState("YourName");

  const initialRender = useRef(true);

  // API routes
  const agifyAPI = "https://api.agify.io?name=";
  const genderizeAPI = "https://api.genderize.io/?name=";

  function fetchData(url, dataSetter, errorSetter, loaderSetter) {
    axios
      .get(`${url}` + inputForAPI, { timeout: 9000 })
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
      fetchData(agifyAPI, setAgifyData, setErrorAgify, setAgifyLoading);
      fetchData(
        genderizeAPI,
        setGenderizeData,
        setErrorGenderize,
        setGenderizeLoading
      );
    }
  }, [inputForAPI]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (errorAgify || errorGenderize) {
        setErrorAgify(false);
        setErrorGenderize(false);
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
              {errorAgify && <span>Something went wrong with Agify!</span>}
              {errorGenderize && (
                <span>Something went wrong with Genderize!</span>
              )}
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
              {genderizeLoading ? (
                <>{<Spinner />}</>
              ) : (
                <>
                  <br />
                  Gender: {genderizeData.gender}
                  <br />
                  Probability: {genderizeData.probability}
                  <br />
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
