/* eslint-disable no-return-assign */
/* eslint-disable semi */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-self-compare */
/* eslint-disable no-shadow */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

function Question({
  questions,
  timeStamp,
  currentQuestionIndex,
  onSelectAnswer,
  isCheckTime,
  setIsCheckTime,
  isOptionAvailable,
  setIsOptionAvailable,
}) {
  const [answers, setAnswers] = useState();
  const Ref = useRef(null);
  const history = useHistory();
  const [timer, setTimer] = useState("00:00:00");
  const handleShuffle = (options) => {
    return options.sort();
  };
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);
    if (total === 0) {
      setIsOptionAvailable(true);
      history.push("/result");
    }
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };
  const startTimer = (e) => {
    const {
      total, hours, minutes, seconds
    } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        `${hours > 9 ? hours : `0${hours}`}:${
          minutes > 9 ? minutes : `0${minutes}`
        }:${seconds > 9 ? seconds : `0${seconds}`}`
      );
    }
  };

  const minutes = Math.floor(timeStamp / 60000);
  const seconds = ((timeStamp % 60000) / 1000).toFixed(0);
  const timeCountDown = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const clearTimer = (e) => {
    if (isCheckTime === false) {
      setTimer(timeCountDown);
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
        startTimer(e);
      }, 1000);
      Ref.current = id;
    }
  };

  const getDeadTime = () => {
    const deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + timeStamp / 1000);
    return deadline;
  };
  useEffect(() => {
    setAnswers(
      questions.length > 0 &&
        handleShuffle([...questions[currentQuestionIndex].answers])
    );
    clearTimer(getDeadTime());
  }, [questions, currentQuestionIndex]);
  // question = questions[currentQuestion].content;
  const handleSelectAnswer = (id) => {
    onSelectAnswer(id);
    setIsCheckTime(true);
    // const SELECT = answers.filter(
    //   (answer) => answer.id === id
    // );
    // setSelectedAnswer(SELECT[0].id);
    // questions[currentQuestion].answers = index;
    // setUserSelected(answers[questions[currentPick].answers].id);
  };
  return (
  // TO DO : pick question

    <div className="w-[70%]">
      <div className="bg-white rounded-lg shadow-2xl pt-5 pb-[37px] text-center text-lg mb-[20px] border-2 border-sky-500">
        <h2 className="text-rose-600">{timer}</h2>
        <p className="pb-[10px]">
          Question :
          {currentQuestionIndex + 1}
          /
          {questions.length}
        </p>
        <p className="pb-[10px]">{questions[currentQuestionIndex].content}</p>
      </div>
      <div className="flex justify-between flex-wrap">
        {answers &&
          answers.map(({ content, id }, index) => (
            <button
              onClick={() => handleSelectAnswer(id)}
              key={id}
              disabled={isOptionAvailable === true}
              className={
                ` border-2 border-sky-500 bg-white rounded-lg shadow-2xl text-base mb-[20px] py-[20px] w-[48%] m-[auto] ${isOptionAvailable === true && "bg-gray-200 text-slate-300"} ${
                  questions[currentQuestionIndex].selectedAnswer === id &&
                  "bg-indigo-900"
                }`
              }
            >
              {content}
            </button>
          ))}
      </div>
    </div>
  );
}
export default Question;
