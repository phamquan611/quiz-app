/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { useHistory } from "react-router-dom";
import { BsLightbulb } from "react-icons/bs";
import { HiLightBulb } from "react-icons/hi";

function CheckQuestion({
  questions, currentQuestion, setCurrentQuestion, currentPick, currentAnswers, selectedAnswer, setCurrentAnswers, setSelectedAnswer, userSelected
}) {
  const history = useHistory();
  const handleQuestion = (index) => {
    setCurrentQuestion(index);
  };
  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    // setCurrentPick(currentPick + 1);
    setSelectedAnswer(selectedAnswer);
    if (currentQuestion === questions.length - 1) {
      history.push("/result");
    }
  };

  const prevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    // setCurrentPick(currentPick + 1);
    setSelectedAnswer(selectedAnswer);
  };
  return (
    // TO DO :  choose question when click and do prev and next btn question
    <div className=" w-[29%] flex flex-col ">
      <div className="flex justify-evenly rounded-lg pb-[50px]">
        <button
          disabled={currentQuestion === 0}
          onClick={prevQuestion}
          className="bg-rose-600 py-5 px-10 rounded-xl text-[20px] shadow-2xl"
        >
          Prev
        </button>
        <button
          onClick={nextQuestion}
          className="bg-green-600 py-5 px-10 rounded-xl text-[20px] shadow-2xl"
        >
          Next
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
              {questions[index] === index ?
                <BsLightbulb className="w-[50px] h-[50px] relative" />
                : <HiLightBulb className="w-[50px] h-[50px] relative" />}
              <p className="ques-item not-italic absolute">{index + 1}</p>
            </i>
          ))}
      </div>
    </div>
  );
}
export default CheckQuestion;
