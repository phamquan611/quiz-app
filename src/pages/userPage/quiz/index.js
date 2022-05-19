/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Question from "@components/userQuestion";
import CheckQuestion from "@components/userQuestionCheck";
import { url } from "@services/http";
import { useHistory } from "react-router-dom";

function Quiz({ quizzesID, setQuizzesID }) {
  const [questions, setQuestions] = useState([]);
  const [timeStamp, setTimeStamp] = useState();
  const [question, setQuestion] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [selectedAnswer, setSelectedAnswer] = useState();
  const [currentPick, setCurrentPick] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState();
  const [userSelected, setUserSelected] = useState(-1);
  const history = useHistory();

  useEffect(() => {
    setTimeStamp(timeStamp);
    axios.get(`${url}/quizzes/${quizzesID}`).then((res) => {
      setQuestions(res.data?.questions);
      setTimeStamp(res.data?.timeChangllenge);
    });
    // setCurrentPick(currentPick);
  }, [currentQuestion, currentPick]);
  // const nextQuestion = () => {
  //   setCurrentQuestion(currentQuestion + 1);
  //   setCurrentPick(currentPick + 1);
  //   // setCurrentAnswers(questions[currentQuestion]?.answers);
  //   setSelectedAnswer(selectedAnswer);
  //   if (currentQuestion === questions.length - 1) {
  //     history.push("/result");
  //   }
  // };

  // const prevQuestion = () => {
  //   setCurrentQuestion(currentQuestion - 1);
  //   setCurrentPick(currentPick + 1);
  //   // setCurrentAnswers(questions[currentQuestion]?.answers);
  //   setSelectedAnswer(selectedAnswer);

  //   // setSelectedAnswer(questions[currentPick].answers);
  // };

  return (
    // TO DO : prev and next btn
    <div className="bg-quiz">
      <div className="container m-[auto]">
        <div className="flex justify-between">
          {questions.length > 0 && (
            <CheckQuestion
              questions={questions}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              currentPick={currentPick}
              currentAnswers={currentAnswers}
              setCurrentAnswers={setCurrentAnswers}
              userSelected={userSelected}
            />
          )}
          {questions.length > 0 && (
            <Question
              questions={questions}
              timeStamp={timeStamp}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              question={question}
              setQuestion={setQuestion}
              currentPick={currentPick}
              setCurrentPick={setCurrentPick}
              currentAnswers={currentAnswers}
              setCurrentAnswers={setCurrentAnswers}
              setUserSelected={setUserSelected}
              userSelected={userSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
