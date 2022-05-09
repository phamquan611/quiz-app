import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Countdown from 'react-countdown';
const Question = ({
  currentQuestion,
  name,
  setCurrentQuestion,
  options,
  questions,
  selectedOption,
  setSelectedOption,
  setQuestions,
  currentPick,
  setCurrentPick,
  handleSelected,
  setHandleSelected,
  viewAnswer,
  setViewAnswer

}) => {
  // console.log(questions[0].question);
  const history = useHistory();
  const handleNext = () => {
    if (currentQuestion > 8) {
      history.push("/result");

    } else {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentPick(currentPick + 1);
      setHandleSelected(handleSelected);

    } 
  };

  const handlePrev = () => {
    setCurrentQuestion(currentQuestion - 1);
    setCurrentPick(currentPick - 1);
    setHandleSelected(handleSelected);
  };

  const handleSelectOption = (index) => {
    questions[currentPick].isSelected = index;
    setSelectedOption(questions[currentPick].isSelected);

  };
  // const renderer = ({ hours, minutes, seconds, completed }) => {
  //   if (completed) {
  //     // Render a complete state
  //     return history.push("/result")
  //   } else {
  //     // Render a countdown
  //     return (
  //       <span>
  //         {hours}:{minutes}:{seconds}
  //       </span>
  //     );
  //   }
  // };

  return (
    <>
      <div className="flex m-[auto] justify-between ">
        <button
          disabled={currentQuestion === 0}
          onClick={handlePrev}
          className={
            currentQuestion === 0
              ? "px-10 py-5 mr-3.5 text-slate-300  text-2xl bg-gray-200 rounded-3xl shadow-lg"
              : "px-10 py-5 mr-3.5  text-2xl bg-red-600 rounded-3xl shadow-lg"
          }
        >
          Previous
        </button>
        {/* <Countdown date={Date.now() + 300000 }  renderer={renderer} /> */}
        <button
          onClick={handleNext}
          className="px-10 py-5 ml-3.5  text-2xl bg-green-300 hover:bg-green-900 rounded-3xl shadow-lg "
        >
          Next
        </button>
      </div>
      <div className="m-[auto] py-6">
        <div className="px-36 py-20 bg-white mb-5 rounded-3xl shadow-xl">
          {/* <p>{name}</p> */}
          <p className="text-xl font-extrabold text-center text-indigo-700 pb-3.5">
            Question: {currentQuestion + 1}
          </p>
          <p className="text-2xl">{questions[currentQuestion].question}</p>
        </div>
        <div className="flex w-4/5 flex-col m-[auto] ">
          {options &&
            options.map((item, index) => (
              <button
                disabled={viewAnswer === true}
                key={item}
                onClick={() => handleSelectOption(index)}
                className={
                  handleSelected === index 
                    ? "over:bg-violet-600 cursor-pointer hover:text-stone-50 bg-white py-3.5 rounded-3xl text-2xl   mb-5 border-2 bg-indigo-900"
                    : " border-2 cursor-pointer hover:bg-violet-600 hover:text-stone-50 bg-white py-3.5 rounded-3xl text-2xl mb-5"
                    // && viewAnswer === true ? "border-2 bg-white py-3.5 rounded-3xl text-2xl mb-5 text-slate-300":
                    //  " border-2 cursor-pointer hover:bg-violet-600 hover:text-stone-50 bg-white py-3.5 rounded-3xl text-2xl mb-5"
                }
              >
                {item}
              </button>
            ))}
        </div>
      </div>
    </>
  );
};
export default Question;
