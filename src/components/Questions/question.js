import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  setViewAnswer,
  setIsSubmit,
  isSubmit, 
  isCheckTime,
  setIsCheckTime
}) => {
  // console.log(questions[0].question);
  const [isDone, setIsDone] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const history = useHistory();
  
  const handleNext = () => {
    if (currentQuestion > 8) {
      setIsShow(true);
      setIsSubmit(true)
      // if (isDone === true) {
      //   history.push("/result");
      // }
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentPick(currentPick + 1);
      setHandleSelected(handleSelected);
      setIsCheckTime(true)
    }
  };

  const handlePrev = () => {
    setCurrentQuestion(currentQuestion - 1);
    setCurrentPick(currentPick - 1);
    setHandleSelected(handleSelected);
    setIsCheckTime(true)
  };

  const handleSelectOption = (index) => {
    questions[currentPick].isSelected = index;
    setSelectedOption(questions[currentPick].isSelected);
    setIsCheckTime(true)
 
    if (currentQuestion === 0) {
      localStorage.setItem('choose_answer0' , index)
      localStorage.setItem('question0' , questions[currentQuestion].question)
    }
    else if (currentQuestion === 1) {
      localStorage.setItem('choose_answer1' , index)
      localStorage.setItem('question1' , questions[currentQuestion].question)
    }
    else if (currentQuestion === 2) {
      localStorage.setItem('choose_answer2' , index)
      localStorage.setItem('question2' , questions[currentQuestion].question)
    }
    else if (currentQuestion === 3) {
      localStorage.setItem('choose_answer3' , index)
      localStorage.setItem('question3' , questions[currentQuestion].question)
    }
    else if (currentQuestion === 4) {
      localStorage.setItem('choose_answer4' , index)
      localStorage.setItem('question4' , questions[currentQuestion].question)
    }
    else if (currentQuestion === 5) {
      localStorage.setItem('choose_answer5' , index)
      localStorage.setItem('question5' , questions[currentQuestion].question)
    }
    else if (currentQuestion === 6) {
      localStorage.setItem('choose_answer6' , index)
      localStorage.setItem('question6' , questions[currentQuestion].question)
    }
    else if (currentQuestion === 7) {
      localStorage.setItem('choose_answer7' , index)
      localStorage.setItem('question7' , questions[currentQuestion].question)
    }
    else if (currentQuestion === 8) {
      localStorage.setItem('choose_answer8' , index)
      localStorage.setItem('question8' , questions[currentQuestion].question)
    }
    else if (currentQuestion === 9) {
      localStorage.setItem('choose_answer9' , index)
      localStorage.setItem('question9' , questions[currentQuestion].question)
    }

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

  const handleCheckdone = () => {
    setIsDone(true);
    if (currentQuestion > 8) {
      history.push("/result");
    }
  };
  const handleChecknone = () => {
    setIsShow(false);
  };

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
        {currentQuestion == 9 ? 
        <button
          onClick={handleNext}
          className="px-10 py-5 ml-3.5  text-2xl bg-green-300 hover:bg-green-900 rounded-3xl shadow-lg "
        >Submit
        </button>
        :<button
        onClick={handleNext}
        className="px-10 py-5 ml-3.5  text-2xl bg-green-300 hover:bg-green-900 rounded-3xl shadow-lg "
      >Next
      </button>
           }
      </div>
      <div className="m-[auto] py-6">
        <div className="px-36 py-20 bg-white mb-5 rounded-3xl shadow-xl">
          {localStorage.getItem('name') && (
            <h2>{name}</h2>
          )}
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
                  && viewAnswer === true ? "border-2 bg-white py-3.5 rounded-3xl text-2xl mb-5 text-slate-300":
                   " border-2 cursor-pointer hover:bg-violet-600 hover:text-stone-50 bg-white py-3.5 rounded-3xl text-2xl mb-5"
                }
              >
                {item}
              </button>
            ))}
        </div>
      </div>
      {isShow === true ? (
        <div className="fixed inset-0 bg-black w-full flex ">
          <div className="m-[auto] opacity-1 bg-white opacity-100 w-[400px] h-[400px] rounded-xl text-[#000] flex  flex-col ">
            <h2 className="m-[auto] text-5xl">Chắc chưa ?</h2>
            <div className="m-[auto] flex justify-between">
              <button
                className="p-5 text-[24px] bg-green-500 rounded-xl mr-[20px] px-9 "
                onClick={handleCheckdone}
              >
                Oke
              </button>
              <button
                className="p-5 text-[24px] bg-red-600 rounded-xl ml-[20px] px-9"
                onClick={handleChecknone}
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Question;
