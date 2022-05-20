/* eslint-disable no-self-compare */
/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BsLightbulb } from "react-icons/bs";
import { HiLightBulb } from "react-icons/hi";

function CheckQuestion({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setIsCheckTime,
}) {
  const history = useHistory();
  const handleQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setIsCheckTime(true);
  };
  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsCheckTime(true);
    if (currentQuestionIndex === questions.length - 1) {
      history.push("/result");
    }
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    setIsCheckTime(true);
  };
  return (
    // TO DO :  choose question when click and do prev and next btn question
    <div className=" w-[29%] flex flex-col ">
      <div className="flex justify-evenly rounded-lg pb-[50px]">
        <button
          disabled={currentQuestionIndex === 0}
          onClick={prevQuestion}
          className={`bg-rose-600 py-5 px-10 rounded-xl text-[20px] shadow-2xl ${currentQuestionIndex === 0 && "bg-gray-200 text-slate-300"}`}
        >
          Prev
        </button>
        <button
          onClick={nextQuestion}
          className="bg-green-600 py-5 px-10 rounded-xl text-[20px] shadow-2xl"
        >
          {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
      <div className=" rounded-lg shadow-2xl  border-sky-500 border-2 bg-white py-[20px] px-[50px] flex justify-center flex-wrap">
        {questions &&
          questions.map((item, index) => (
            <i
              className="flex justify-center items-center ml-[10px] mb-[10px]"
              onClick={() => handleQuestion(index)}
              key={index}
            >
              {questions[index].selectedAnswer === undefined
                ? (
                  <BsLightbulb className="w-[50px] h-[50px] relative" />
                ) : (
                  <HiLightBulb className="w-[50px] h-[50px] relative" />
                )}
              <p className="ques-item not-italic absolute">{index + 1}</p>
            </i>
          ))}
      </div>
    </div>
  );
}
export default CheckQuestion;
