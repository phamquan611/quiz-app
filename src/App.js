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
  const [isOptionAvailable, setIsOptionAvailable] = useState(false);
  const [isCheckTime, setIsCheckTime] = useState(false);
  const [name, setName] = useState("");
  const [viewAnswers, setViewAnswers] = useState();
  const [isView, setIsView] = useState(false);
  const [hadbeenSubmited, setHadbeenSubmited] = useState(false);
  // const [isBackHome, setIsBackHome] = useState(false);
  const [isUserBack, setIsUserBack] = useState(false);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home
              name={name}
              setName={setName}
              isUserBack={isUserBack}
            />
          </Route>
          <Route path="/quiz">
            <Quiz
              isOptionAvailable={isOptionAvailable}
              setIsOptionAvailable={setIsOptionAvailable}
              isCheckTime={isCheckTime}
              setIsCheckTime={setIsCheckTime}
              viewAnswers={viewAnswers}
              setViewAnswers={setViewAnswers}
              isView={isView}
              setIsView={setIsView}
              hadbeenSubmited={hadbeenSubmited}
              setHadbeenSubmited={setHadbeenSubmited}

            />
          </Route>
          <Route path="/result">
            <Result
              setIsCheckTime={setIsCheckTime}
              name={name}
              viewAnswers={viewAnswers}
              setViewAnswers={setViewAnswers}
              setIsView={setIsView}
              isOptionAvailable={isOptionAvailable}
              setIsOptionAvailable={setIsOptionAvailable}
              hadbeenSubmited={hadbeenSubmited}
              setIsUserBack={setIsUserBack}
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
