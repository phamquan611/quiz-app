import axios from "axios";
import './App.css';
import React,{useState, useEffect} from "react";
import { BrowserRouter as Routes, Route, Switch, Redirect , useHistory} from 'react-router-dom';
import AdminPage from "@pages/admin";
import SignInPage from "@pages/signIn";
import HomePage from "@pages/user/Home/home";
import Error from '@pages/error';
import Quiz from "@pages/user/Quiz/Quiz";
import Result from "@pages/user/Result/result";
import "./sass/main.css";
import Home from "./pages/user/Home/home"

function App() {
  const [name, setName] = useState("");
  const [ getID ,setGetID] = useState("");
  const [questions, setQuestions] = useState();
  const [handleSelected, setHandleSelected] = useState();
  const history = useHistory();
  const[viewAnswer, setViewAnswer] = useState(false)
  const [checkID, setCheckID] = useState()
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    axios
      .get(
        "https://quiz-app-winds.herokuapp.com/sessions"
      )
      .then((res) => {
          console.log(res.data);
          const Data = res.data;
          // const test = Object.entries(Data)
          // console.log(test);
          // const Check = [Data.map(id => id._id)]
          setCheckID(Data)
          // console.log(Check);
          setGetID(getID)
        });
      }, []);
      console.log(getID);

  useEffect(() => {
    axios
      .get(
        "https://quiz-app-winds.herokuapp.com/quizzes/626a3d59b8c4d6734fe45e94"
      )
      .then((res) => {
        setHandleSelected(res.data[0].isSelected);
        setQuestions(res.data[0].questions);
      });
  }, []);
  return (
    <>
      <Routes>
        <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/admin" component={AdminPage}/>
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
                />
                )}
          </Route>
          <Route path="/result" >
            <Result
              getID={getID}
              viewAnswer={viewAnswer}
              setViewAnswer={setViewAnswer}
            setGetID={setGetID}
            />
          </Route>
          <Route path="/home">
            <Home name={name} 
            getID={getID}
            setGetID={setGetID}
            checkID={checkID}
            setCheckID={setCheckID}
            setName={setName}
            viewAnswer={viewAnswer}
            setViewAnswer={setViewAnswer}
            handleSelected={handleSelected}
            setHandleSelected={setHandleSelected}
             />
          </Route>
              <Route path="/error" component={Error} />
              <Redirect to="/"/>
          </Switch>
      </Routes>
    </>
  );
}

export default App;
