import React, { useState } from "react";

const CheckQuestions = ({
  questions,
  setCurrentQuestion,
  setCurrentPick,
  setIsCheckTime,
}) => {
  const handleCheck = (index) => {
    setCurrentQuestion(index);
    setCurrentPick(index);
    setIsCheckTime(true);
    // console.log(questions[event].question);
    // console.log(questions[currentPick].handleSelected);
  };
  //   console.log(questions[currentPick].isSelected);
  //   console.log(questions);
  return (
    <>
      <div className="flex justify-between mb-5">
        {questions &&
          questions.map((item, index) => (
            <button
              className={
                questions[index].isSelected === null
                  ? "bg-slate-300 shadow-2xl p-3 m-2 m-auto rounded-lg flex items-center"
                  : "bg-violet-800 border-2 p-3 m-2 m-auto rounded-lg flex items-center"
              }
              onClick={() => handleCheck(index)}
              key={index}
            >
              Question {index + 1}
            </button>
          ))}
      </div>
    </>
  );
};
export default CheckQuestions;
