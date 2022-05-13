import axios from "axios";
import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import {
  BrowserRouter as Routes,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import AdminPage from "@pages/admin";
import SignInPage from "@pages/signIn";
import HomePage from "@pages/user/Home/home";
import Error from "@pages/error";
import Quiz from "@pages/user/Quiz/Quiz";
import Result from "@pages/user/Result/result";
import "./sass/main.css";
import Home from "./pages/user/Home/home";

function App() {
  const [name, setName] = useState("");
  const [getID, setGetID] = useState("");
  const [questions, setQuestions] = useState();
  const [handleSelected, setHandleSelected] = useState();
  const history = useHistory();
  const [viewAnswer, setViewAnswer] = useState(false);
  const [checkID, setCheckID] = useState();
  const [getTimeStamp, setGetTimeStamp] = useState();
  const [getQuizID, setGetQuizID] = useState();
  const [checkViewTime, setCheckViewTime] = useState(false);

  useEffect(() => {
    axios.get("https://quiz-app-winds.herokuapp.com/sessions").then((res) => {
      console.log(res.data[0].timeChallenge);
      const Data = res.data;
      // const test = Object.entries(Data)
      // const Check = [Data.map(id => id._id)]
      setCheckID(Data);
      setGetID(getID);
      setGetTimeStamp(getTimeStamp);
      // setCheckDateTime()
    });
    setGetQuizID(getQuizID);
    setHandleSelected(handleSelected);
    setQuestions(questions);
    setViewAnswer(viewAnswer)
  }, []);
  return (
    <>
      <Routes>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/quiz">
            {questions && questions.length > 0 && (
              <Quiz
                name={name}
                questions={questions}
                handleSelected={handleSelected}
                setHandleSelected={setHandleSelected}
                setQuestions={setQuestions}
                viewAnswer={viewAnswer}
                setViewAnswer={setViewAnswer}
                checkViewTime={checkViewTime}
                setCheckViewTime={setCheckViewTime}
                setGetTimeStamp={setGetTimeStamp}
                getTimeStamp={getTimeStamp}
                getQuizID={getQuizID}
              />
            )}
          </Route>
          <Route path="/result">
            <Result
              name={name}
              setName={setName}
              questions={questions}
              setQuestions={setQuestions}
              getID={getID}
              viewAnswer={viewAnswer}
              setViewAnswer={setViewAnswer}
              setGetID={setGetID}
              checkViewTime={checkViewTime}
              setCheckViewTime={setCheckViewTime}
              getQuizID={getQuizID}
              setGetQuizID={setGetQuizID}
            />
          </Route>
          <Route path="/home">
            <Home
              name={name}
              getID={getID}
              setGetID={setGetID}
              checkID={checkID}
              setCheckID={setCheckID}
              setName={setName}
              viewAnswer={viewAnswer}
              setViewAnswer={setViewAnswer}
              handleSelected={handleSelected}
              setHandleSelected={setHandleSelected}
              checkViewTime={checkViewTime}
              setCheckViewTime={setCheckViewTime}
              getTimeStamp={getTimeStamp}
              setGetTimeStamp={setGetTimeStamp}
              getQuizID={getQuizID}
              setGetQuizID={setGetQuizID}
              questions={questions}
              setQuestions={setQuestions}
            />
          </Route>
          <Route path="/error" component={Error} />
          <Redirect to="/" />
        </Switch>
      </Routes>
    </>
  );
}

export default App;
