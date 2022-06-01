/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "@store";
import Home from "@pages/userPage/home/index";
import Quiz from "@pages/userPage/quiz/index";
import Result from "@pages/userPage/result";
import AdminPage from "@pages/AdminPage";
import SignInPage from "@pages/SignInPage";
import NotFound from "@pages/userPage/404Page";
import "./App.css";
import "antd/dist/antd.min.css";
import { history } from "@utils/routing";

const store = configureStore();
function App() {
  const [quizzesID, setQuizzesID] = useState();
  const [isOptionAvailable, setIsOptionAvailable] = useState(false);
  const [isCheckTime, setIsCheckTime] = useState(false);
  const [name, setName] = useState("");
  const [quizzID, setQuizzID] = useState("");
  const [viewAnswers, setViewAnswers] = useState();
  const [view, setView] = useState(false);
  const [hadbeenSubmited, setHadbeenSubmited] = useState(false);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home
              quizzesID={quizzesID}
              setQuizzesID={setQuizzesID}
              name={name}
              quizzID={quizzID}
              setName={setName}
              setQuizzID={setQuizzID}
            />
          </Route>
          <Route path="/quiz">
            <Quiz
              quizzesID={quizzesID}
              setQuizzesID={setQuizzesID}
              isOptionAvailable={isOptionAvailable}
              setIsOptionAvailable={setIsOptionAvailable}
              isCheckTime={isCheckTime}
              setIsCheckTime={setIsCheckTime}
              viewAnswers={viewAnswers}
              setViewAnswers={setViewAnswers}
              view={view}
              setView={setView}
              hadbeenSubmited={hadbeenSubmited}
              setHadbeenSubmited={setHadbeenSubmited}
            />
          </Route>
          <Route path="/result">
            <Result
              quizzesID={quizzesID}
              setIsCheckTime={setIsCheckTime}
              name={name}
              quizzID={quizzID}
              viewAnswers={viewAnswers}
              setViewAnswers={setViewAnswers}
              setView={setView}
              isOptionAvailable={isOptionAvailable}
              setIsOptionAvailable={setIsOptionAvailable}
              hadbeenSubmited={hadbeenSubmited}
              setHadbeenSubmited={setHadbeenSubmited}
            />
          </Route>
          <Route path="/admin" component={AdminPage} />
          <Route path="/signin" component={SignInPage} />
          <Route exact path="*"><NotFound /></Route>
        </Switch>
      </Router>
    </Provider>
  );
}
export default App;
