/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-trailing-spaces */
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
import { IDEA } from "@utils";

function Question({
  questions,
  timeStamp,
  currentQuestionIndex,
  onSelectAnswer,
  isCheckTime,
  setIsCheckTime,
  isOptionAvailable,
  setIsOptionAvailable,
  isView,
  viewAnswers,
  answers,
  setAnswers,
}) {
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
      total, hours, minutes, seconds,
    } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        `${hours > 9 ? hours : `0${hours}`}:${
          minutes > 9 ? minutes : `0${minutes}`
        }:${seconds > 9 ? seconds : `0${seconds}`}`,
      );
    }
  };

  const minutes = Math.floor(timeStamp / 6000);
  const seconds = ((timeStamp % 6000) / 100).toFixed(0);
  const timeCountDown = `${minutes}:${seconds < 10 && "0"}${seconds}`;

  const clearTimer = (e) => {
    if (!isCheckTime) {
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

    deadline.setSeconds(deadline.getSeconds() + timeStamp / 100);
    return deadline;
  };
  useEffect(() => {
    setAnswers(
      questions.length > 0
        && handleShuffle([...questions[currentQuestionIndex].answers]),
    );
    clearTimer(getDeadTime());
  }, [currentQuestionIndex]);
  const handleSelectAnswer = (id) => {
    onSelectAnswer(id);
    setIsCheckTime(true);
  };
  return (
  // TO DO : pick question
    <div className=" m-auto 2xl:w-7/12 lg:w-[66.33%]">
      <div className="bg-white rounded-lg shadow-2xl py-5 text-center text-lg mb-[20px] border-2 border-sky-500 m-auto w-11/12">
        <h2 className="text-rose-600">{timer}</h2>
        <p className="pb-[10px]">
          Question :
          {currentQuestionIndex + 1}
          /
          {questions.length}
        </p>
        <p className="px-5">{questions[currentQuestionIndex].content}</p>
      </div>
      {isView ? (
        <div className="flex justify-between flex-wrap m-auto">
          {answers
                && answers.map(({ content, id }, index) => (
                  <button
                    onClick={() => handleSelectAnswer(id)}
                    key={id}
                    disabled={isOptionAvailable}
                    className={
                      ` border-2 border-indigo-700 bg-white rounded-lg shadow-2xl text-base mb-[20px] py-[20px] w-5/12 m-auto  ${isOptionAvailable && "bg-gray-200 text-slate-600"} ${
                        viewAnswers[currentQuestionIndex].selectedAnswer === id
                        && "bg-indigo-900 text-white chosse-option"
                      }`
                    }
                  >
                    {`${IDEA[index]}. ${content} `}
                  </button>
                ))}
        </div>
      )
        : (
          <div className="flex justify-between flex-wrap m-auto">
            {answers
        && answers.map(({ content, id }, index) => (
          <button
            onClick={() => handleSelectAnswer(id)}
            key={id}
            className={
              ` border-2 border-indigo-700 bg-white rounded-lg shadow-2xl text-base mb-[20px] py-[20px] w-5/12 m-auto ${isOptionAvailable && "bg-gray-200 text-slate-400"} ${
                questions[currentQuestionIndex].selectedAnswer === id
                && "bg-indigo-900 chosse-option"
              }`
            }
          >
            {`${IDEA[index]}. ${content} `}
          </button>
        ))}
          </div>
        )}
    </div>
  );
}
export default Question;
