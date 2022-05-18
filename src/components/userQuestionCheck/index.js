/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { BsLightbulb } from "react-icons/bs";

function CheckQuestion({ questions, currentQuestion, setCurrentQuestion }) {
  const handleQuestion = (index) => {
    setCurrentQuestion(index);
  };
  return (
    // TO DO :  choose question when click and do prev and next btn question
    <div className=" w-[29%] flex flex-col ">
      <div className=" rounded-lg shadow-2xl  border-sky-500 border-2 bg-white py-[20px] px-[50px] flex justify-center flex-wrap">
        {questions
          && questions.map((item, index) => (
            <i className="flex justify-center items-center ml-[10px] mb-[10px]" onClick={() => handleQuestion(index)} key={index}>
              <BsLightbulb className="w-[50px] h-[50px] relative" />
              <p className="ques-item not-italic absolute">
                {index + 1}
              </p>
            </i>
          ))}
      </div>
    </div>
  );
}
export default CheckQuestion;
