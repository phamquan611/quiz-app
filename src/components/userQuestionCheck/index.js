/* eslint-disable no-unused-vars */
/* eslint-disable no-self-compare */
/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { useHistory } from "react-router-dom";
import { BsLightbulb, BsLightbulbFill } from "react-icons/bs";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";

function CheckQuestion({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setIsCheckTime,
  isView,
  viewAnswers,
  setViewAnswers,
  isOptionAvailable,
  setHadbeenSubmited,
}) {
  const history = useHistory();
  const onQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
    setIsCheckTime(true);
  };
  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsCheckTime(true);
  };

  const handleSubmit = () => {
    history.push("/result");
    if (viewAnswers === undefined) {
      setViewAnswers(questions);
    }
    if (isOptionAvailable) {
      setHadbeenSubmited(true);
    }
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
    <div className="flex m-auto pb-10 flex-col">

      <button
        className="m-auto bg-green-600 py-3 px-4 rounded-xl text-[20px] shadow-2xl text-white mb-[10px]"
        onClick={handleSubmit}
      >
        {!isOptionAvailable ? "Submit" : "Next"}
      </button>


      <div className="flex">
        <div className="m-auto">
          <button
            disabled={currentQuestionIndex === 0}
            onClick={prevQuestion}
            className={`bg-rose-600 py-3 px-4 rounded-xl text-[20px] shadow-2xl text-white mr-[10px] ${
              currentQuestionIndex === 0 && "bg-slate-300 text-slate-500"
            }`}
          >
            <TiChevronLeftOutline />
          </button>
        </div>
        {!isView ? (
          <div className=" rounded-lg m-auto shadow-2xl border-sky-500 border-2 bg-white py-[20px] px-[50px] lg:px-2.5 flex justify-center flex-wrap">
            {questions
          &&            questions.map((item, index) => (
            <i
              className="flex justify-center items-center"
              onClick={() => onQuestionClick(index)}
              key={index}
            >
              {questions[index].selectedAnswer === undefined ? (
                <BsLightbulb className="w-[40px] h-[40px] lg:w-[45px] lg:h-[45px] text-yellow-300 relative " />
              ) : (
                <BsLightbulbFill className="w-[40px] h-[40px] lg:w-[45px] lg:h-[45px] text-yellow-300 relative " />
              )}
              <p className="ques-item not-italic absolute cursor-pointer">{index + 1}</p>
            </i>
          ))}
          </div>
        ) : (
          <div className=" rounded-lg m-auto shadow-2xl border-sky-500 border-2 bg-white py-[20px] px-[50px] lg:px-2.5 flex justify-center flex-wrap">
            {questions
            && questions.map((item, index) => (
              <i
                className="flex justify-center items-center"
                onClick={() => onQuestionClick(index)}
                key={index}
              >
                {viewAnswers[index].selectedAnswer === undefined ? (
                  <BsLightbulb className="w-[40px] h-[40px] lg:w-[42px] lg:h-[42px] text-yellow-300 relative " />
                ) : (
                  <BsLightbulbFill className="w-[40px] h-[40px] lg:w-[42px] lg:h-[42px] text-yellow-300 relative " />
                )}
                <p className="ques-item not-italic absolute cursor-pointer">{index + 1}</p>
              </i>
            ))}
          </div>
        )}
        <div className="m-auto">
          <button
            onClick={nextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className={`py-3 px-4 rounded-xl text-[20px] shadow-2xl text-white ml-[10px] ${
              currentQuestionIndex === questions.length - 1 ? "bg-slate-300 text-slate-500" : "bg-green-600"
            }`}
          >
            <TiChevronRightOutline />
          </button>
        </div>
      </div>
    </div>
  );
}
export default CheckQuestion;
