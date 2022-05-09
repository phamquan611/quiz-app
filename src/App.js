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
  const [questions, setQuestions] = useState();
  const [handleSelected, setHandleSelected] = useState();
  const history = useHistory();
  const[viewAnswer, setViewAnswer] = useState(false)
  useEffect(() => {
    axios
      .get(
        "https://quiz-app-winds.herokuapp.com/quizzes/626a3d59b8c4d6734fe45e94"
      )
      .then((res) => {
        setHandleSelected(res.data[0].isSelected);
        setQuestions(res.data[0].questions);
        console.log(res.data);
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
              viewAnswer={viewAnswer}
              setViewAnswer={setViewAnswer}
            />
          </Route>
          <Route path="/home">
            <Home name={name} 
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
