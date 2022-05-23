/* eslint-disable max-len */
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "@store";
import Home from "@pages/userPage/home/index";
import Quiz from "@pages/userPage/quiz/index";
import Result from "@pages/userPage/result";
import NotFound from "@pages/userPage/404Page";
import "./App.css";

const store = configureStore();
function App() {
  const [quizzesID, setQuizzesID] = useState();
  const [isOptionAvailable, setIsOptionAvailable] = useState(false);
  const [isCheckTime, setIsCheckTime] = useState(false);
  const [name, setName] = useState("");
  const [quizzID, setQuizzID] = useState("");
  const [viewAnswers, setViewAnswers] = useState();

  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/">
          <Home quizzesID={quizzesID} setQuizzesID={setQuizzesID} name={name} quizzID={quizzID} setName={setName} setQuizzID={setQuizzID} />
        </Route>
        <Route path="/quiz">
          <Quiz quizzesID={quizzesID} setQuizzesID={setQuizzesID} isOptionAvailable={isOptionAvailable} setIsOptionAvailable={setIsOptionAvailable} isCheckTime={isCheckTime} setIsCheckTime={setIsCheckTime} setViewAnswers={setViewAnswers} />
        </Route>
        <Route path="/result">
          <Result quizzesID={quizzesID} setIsOptionAvailable={setIsOptionAvailable} setIsCheckTime={setIsCheckTime} name={name} quizzID={quizzID} viewAnswers={viewAnswers} />
        </Route>
        {/* <Route path="/*">
          <NotFound />
        </Route> */}
      </Router>
    </Provider>
  );
}

export default App;
