/* eslint-disable import/no-unresolved */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import "./App.css";
import Home from "@pages/user-page/home/index";
import Quiz from "@pages/user-page/quiz/index";
import Result from "@pages/user-page/result";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/quiz">
        <Quiz />
      </Route>
      <Route path="/result">
        <Result />
      </Route>
    </Router>
  );
}

export default App;
