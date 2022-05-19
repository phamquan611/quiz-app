/* eslint-disable import/no-unresolved */
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "@store";
import Home from "@pages/user-page/home/index";
import Quiz from "@pages/user-page/quiz/index";
import Result from "@pages/user-page/result";
import AdminPage from "@pages/AdminPage";
import SignInPage from "@pages/SignInPage";
import "./App.css";
import "antd/dist/antd.min.css";

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
        <Route path="/admin" component={AdminPage} />
        <Route path="/signin" component={SignInPage} />
      </Router>
    </Provider>
  );
}

export default App;
