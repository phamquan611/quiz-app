/* eslint-disable import/no-unresolved */
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "@store";
import Home from "@pages/user-page/home/index";
import Quiz from "@pages/user-page/quiz/index";
import Result from "@pages/user-page/result";
import "./App.css";

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
