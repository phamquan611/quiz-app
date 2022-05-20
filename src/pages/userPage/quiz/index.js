/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Question from "@components/userQuestion";
import CheckQuestion from "@components/userQuestionCheck";
import { url } from "@services/http";
import { useHistory } from "react-router-dom";

function Quiz({
  quizzesID,
  isOptionAvailable,
  setIsCheckTime,
  isCheckTime,
  setIsOptionAvailable,
  setViewAnswers
}) {
  const [questions, setQuestions] = useState([]);
  const [timeStamp, setTimeStamp] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const history = useHistory();

  useEffect(() => {
    setTimeStamp(timeStamp);
    axios.get(`${url}/quizzes/${quizzesID}`).then((res) => {
      setQuestions(res.data?.questions);
      setTimeStamp(res.data?.timeChangllenge);
    });
  }, []);

  const onSelectAnswer = (answerId) => {
    const _questions = [...questions];
    _questions[currentQuestionIndex].selectedAnswer = answerId;
    setQuestions(_questions);
    setViewAnswers(_questions);
  };
  return (
    // TO DO : prev and next btn
    <div className="bg-quiz">
      <div className="container m-[auto]">
        <div className="flex justify-between">
          {questions.length > 0 && (
            <CheckQuestion
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              isCheckTime={isCheckTime}
              setIsCheckTime={setIsCheckTime}
              onSelectAnswer={onSelectAnswer}
            />
          )}
          {questions.length > 0 && (
            <Question
              questions={questions}
              timeStamp={timeStamp}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              onSelectAnswer={onSelectAnswer}
              isCheckTime={isCheckTime}
              setIsCheckTime={setIsCheckTime}
              isOptionAvailable={isOptionAvailable}
              setIsOptionAvailable={setIsOptionAvailable}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
