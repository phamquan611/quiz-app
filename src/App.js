import './App.css';
import React from "react";
import { BrowserRouter as Routes, Route, Switch, Redirect } from 'react-router-dom';
import AdminPage from "@pages/admin";
import SignInPage from "@pages/signIn";
import HomePage from "@pages/user/Home/home";
import Quiz from "@pages/user/Quiz/Quiz";
import Result from "@pages/user/Result/result";
import "./sass/main.css";
function App() {
  return (
    <>
      <Routes>
        <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/admin" component={AdminPage}/>
              <Route path="/signin" component={SignInPage} />
              <Route path="/quiz" component={Quiz} />
              <Route path="/result" component={Result} />
              <Redirect to="/"/>
          </Switch>
      </Routes>
    </>
  );
}

export default App;
