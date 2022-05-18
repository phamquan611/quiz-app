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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const history = useHistory();
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [currentPick, setCurrentPick] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState();
  useEffect(() => {
    setTimeStamp(timeStamp);
    axios.get(`${url}/quizzes/${quizzesID}`).then((res) => {
      setQuestions(res.data?.questions);
      setTimeStamp(res.data?.timeChangllenge);
    });
    setCurrentPick(currentPick);
    setCurrentAnswers(currentAnswers);
  }, [currentQuestion, currentPick]);
  // const userPick = questions[currentQuestion]?.content;
  // console.log(userPick);
  // setSelectedAnswer(userPick);
  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setCurrentPick(currentPick + 1);
    setSelectedAnswer(selectedAnswer);
    if (currentQuestion === questions.length - 1) {
      history.push("/result");
    }
  };

  const prevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    setCurrentPick(currentPick - 1);
  };

  return (
    // TO DO : prev and next btn
    <div className="bg-quiz">
      <div className="container m-[auto]">
        <div className="flex justify-evenly rounded-lg pb-[50px]">
          <button disabled={currentQuestion === 0} onClick={prevQuestion} className="bg-rose-600 py-5 px-10 rounded-xl text-[20px] shadow-2xl">
            Prev
          </button>
          <button onClick={nextQuestion} className="bg-green-600 py-5 px-10 rounded-xl text-[20px] shadow-2xl">
            Next
          </button>
        </div>
        <div className="flex justify-between">
          {questions.length > 0 && <CheckQuestion questions={questions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} /> }
          {questions.length > 0 && (
            <Question questions={questions} timeStamp={timeStamp} currentQuestion={currentQuestion} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} currentPick={currentPick} setCurrentPick={setCurrentPick} currentAnswers={currentAnswers} setCurrentAnswers={setCurrentAnswers} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
