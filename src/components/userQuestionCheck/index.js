/* eslint-disable no-unused-vars */
/* eslint-disable no-self-compare */
/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { useHistory } from "react-router-dom";
import { BsLightbulb,  BsLightbulbFill } from "react-icons/bs";

function CheckQuestion({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setIsCheckTime,
  view,
  viewAnswers,
  setViewAnswers,
  isOptionAvailable,
  setHadbeenSubmited,
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
      if (viewAnswers === undefined) {
        setViewAnswers(questions);
      }
      console.log(isOptionAvailable);
      if (isOptionAvailable === true) {
        setHadbeenSubmited(true);
      }
      history.push("/result");
    }
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    setIsCheckTime(true);
  };
  return (
    // TO DO :  choose question when click and do prev and next btn question
    <div className=" w-[25%] flex flex-col ">
      {view === false ? (
        <div className=" rounded-lg shadow-2xl mb-[20px] border-sky-500 border-2 bg-white py-[20px]  px-[50px] lg:px-0 flex justify-center flex-wrap">
          {questions
            && questions.map((item, index) => (
              <i
                className="flex justify-center items-center ml-[10px] mb-[10px]"
                onClick={() => handleQuestion(index)}
                key={index}
              >
                {questions[index].selectedAnswer === undefined
                  ? (
                    <BsLightbulb className="w-[50px] h-[50px] lg:w-[45px] lg:h-[45px] text-yellow-300 relative" />
                  ) : (
                    <BsLightbulbFill className="w-[50px] h-[50px] lg:w-[45px] lg:h-[45px] text-yellow-300 relative" />
                  )}
                <p className="ques-item not-italic absolute">{index + 1}</p>
              </i>
            ))}
        </div>
      )
        : (
          <div className=" rounded-lg shadow-2xl mb-[20px] border-sky-500 border-2 bg-white py-[20px]  px-[50px] lg:px-0 flex justify-center flex-wrap">
            {questions
          && questions.map((item, index) => (
            <i
              className="flex justify-center items-center ml-[10px] mb-[10px]"
              onClick={() => handleQuestion(index)}
              key={index}
            >
              {viewAnswers[index].selectedAnswer === undefined
                ? (
                  <BsLightbulb className="w-[50px] h-[50px] lg:w-[45px] lg:h-[45px] text-yellow-300 relative" />
                ) : (
                  <BsLightbulbFill className="w-[50px] h-[50px] lg:w-[45px] lg:h-[45px] text-yellow-300 relative" />
                )}
              <p className="ques-item not-italic absolute">{index + 1}</p>
            </i>
          ))}
          </div>
        )}
      <div className="flex justify-evenly rounded-lg pb-[50px]">
        <button
          disabled={currentQuestionIndex === 0}
          onClick={prevQuestion}
          className={`bg-rose-600 py-3.5 px-7 rounded-xl text-[20px] shadow-2xl text-white ${currentQuestionIndex === 0 && "bg-slate-300 text-slate-500"}`}
        >
          Prev
        </button>
        <button
          onClick={nextQuestion}
          className="bg-green-600 py-3.5 px-7 rounded-xl text-[20px] shadow-2xl text-white"
        >
          { currentQuestionIndex === questions.length - 1 && isOptionAvailable === false  ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
export default CheckQuestion;
