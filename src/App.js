import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "@store";
import Home from "@pages/userPage/home/index";
import Quiz from "@pages/userPage/quiz/index";
import Result from "@pages/userPage/result";
import "./App.css";

function App() {
  const [quizzesID, setQuizzesID] = useState();
  const store = configureStore();
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/">
          <Home quizzesID={quizzesID} setQuizzesID={setQuizzesID} />
        </Route>
        <Route path="/quiz">
          <Quiz quizzesID={quizzesID} setQuizzesID={setQuizzesID} />
        </Route>
        <Route path="/result">
          <Result />
        </Route>
      </Router>
    </Provider>
  );
}

export default App;
