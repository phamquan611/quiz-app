/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Question from "@components/userQuestion";
import CheckQuestion from "@components/userQuestionCheck";
import { getDataQuizID } from "@actions/user.action";
import { getQuestionforUser, getTimeChallengeForUser, quizId } from "@store/slice";
import LoadingQuiz from "@components/Loading";

function Quiz({
  isOptionAvailable,
  setIsCheckTime,
  isCheckTime,
  setIsOptionAvailable,
  setViewAnswers,
  viewAnswers,
  isView,
  hadbeenSubmited,
  setHadbeenSubmited,
}) {
  const [questions, setQuestions] = useState([]);
  const [timeStamp, setTimeStamp] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const quizUserID = useSelector(quizId);
  const allquestions = useSelector(getQuestionforUser);
  const getTimeChallenge = useSelector(getTimeChallengeForUser);

  useEffect(() => {
    dispatch(getDataQuizID(quizUserID));
  }, [quizUserID]);
  useEffect(() => {
    setQuestions(allquestions);
    setTimeStamp(getTimeChallenge);
  });

  const onSelectAnswer = (answerId) => {
    if (isView) {
      const _answer = [...viewAnswers];
      _answer[currentQuestionIndex].selectedAnswer = answerId;
      setViewAnswers(_answer);
    } else {
      const _questions = [...questions];
      _questions[currentQuestionIndex].selectedAnswer = answerId;
      setQuestions(_questions);
      setViewAnswers(_questions);
    }
  };
  if (questions === undefined) {
    history.push("/error");
  }
  return (
    // TO DO : prev and next btn
    <>
    {questions.length === 0 ? <LoadingQuiz />
      : (
<div className="bg-quiz">
      <div className="container m-auto px-[20px]">
        <div className="flex flex-col">

            <CheckQuestion
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              isCheckTime={isCheckTime}
              setIsCheckTime={setIsCheckTime}
              onSelectAnswer={onSelectAnswer}
              viewAnswers={viewAnswers}
              isView={isView}
              setViewAnswers={setViewAnswers}
              isOptionAvailable={isOptionAvailable}
              hadbeenSubmited={hadbeenSubmited}
              setHadbeenSubmited={setHadbeenSubmited}
            />
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
              viewAnswers={viewAnswers}
              isView={isView}
              answers={answers}
              setAnswers={setAnswers}
            />
        </div>
      </div>
</div>
      )}
    </>
  );
}

export default Quiz;
