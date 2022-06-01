/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getPointQuizz } from "@actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { getPointUser } from "@store/slice";
import { BsCheckCircle } from "react-icons/bs";

function Result({
  quizzesID,
  setIsOptionAvailable,
  setIsCheckTime,
  viewAnswers,
  name,
  quizzID,
  setView,
  hadbeenSubmited, 
  setHadbeenSubmited,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmited, setisSubmitted] = useState(true);
  const [isDone, setDone] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const userResult = useSelector(getPointUser);
  
  const handleView = () => {
    history.push(`/quiz/${quizzesID}`);
    setView(true);
    setIsCheckTime(true);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    if (isSubmited === true) {
      setIsOptionAvailable(true);
    }
  };

  const handleCheckdone = () => {
    setIsSubmitting(false);
    setisSubmitted(true);
    const body = viewAnswers.map((quest) => ({
      questionId: quest.id,
      selectedAnswerId: quest.selectedAnswer,
    }));
    const userAnswers = {
      sessionId: quizzID,
      username: name,
      questions: body,
    };
    dispatch(getPointQuizz(userAnswers));
    setHadbeenSubmited(true);
    setDone(true);
  };

  const handleChecknone = () => {
    setIsSubmitting(false);
    setIsOptionAvailable(false);
  };
  const checkSubmit = () => {
    setDone(false);
  };
  return (
    // TO DO : axios post and view answer , disable option answer when choose submit
    <div className="bg-result">
      <div className="container m-auto">
        <div className=" w-[30%] rounded-lg  m-auto py-4 text-center text-[25px] mb-[20px]  ">
          <h2>Your test is done !!!</h2>
        </div>
        <div className="flex justify-center ">
          <button
            onClick={handleView}
            className="shadow-inner text-white mr-[20px] lg:w-[9%] 2xl:w-[6%] bg-rose-600 py-3 rounded-xl text-[18px] xl:w-[9%]"
          >
            View
          </button>
          {hadbeenSubmited === false && (
          <button
            onClick={handleSubmit}
            className="shadow-inner text-white ml-[20px] lg:w-[9%] 2xl:w-[6%] bg-green-600 py-3 rounded-xl text-[18px] xl:w-[9%]"
          >
            Submit
          </button>
          )}
        </div>
      </div>
      {isSubmitting === true && (
        <div className="fixed inset-0 bg-black w-full flex">
          <div className="m-auto opacity-1 bg-white opacity-100 w-[300px] h-[300px] rounded-xl text-[#000] flex  flex-col modal-container">
            <h2 className="m-auto mb-0 text-3xl text-center">
              Send your answer ?
            </h2>
            <div className="m-auto flex justify-between">
              <button
                className="p-3 text-white text-[18px] bg-green-500 rounded-xl mr-[20px] px-7 "
                onClick={handleCheckdone}
              >
                Oke
              </button>
              <button
                className="p-3 text-white text-[18px] bg-red-600 rounded-xl ml-[20px] px-7"
                onClick={handleChecknone}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {isDone && userResult !== undefined && (
        <div className="fixed inset-0 bg-black w-full flex">
          <div className="m-auto opacity-1 bg-white opacity-100 w-[450px] h-[350px] rounded-xl text-[#000] flex flex-col modal-container">
            <BsCheckCircle className="text-6xl m-auto mb-0 text-green-500" />
            <h2 className="text-3xl text-center mt-4 mb-0 ">
              Success !
            </h2>
            <h2 className="text-xl text-center mt-4 mb-0">
              Your answer have been save. 
            </h2>
            <h2 className="mt-4 mb-0 text-2xl text-center">
              Your result is : 
              {userResult}
              /100
            </h2>
            <button
              className="m-auto mt-6 text-white py-3.5 text-[16px] bg-green-500 rounded-xl px-2.5 "
              onClick={checkSubmit}
            >
              OKE THANKS!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Result;
