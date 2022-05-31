/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getPointQuizz } from "@actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { getPointUser } from "@store/slice";

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
  const [result, setResult] = useState();
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

  const handleCheckdone = async () => {
    setIsSubmitting(false);
    setisSubmitted(true);
    const body = viewAnswers.map((quest) => ({
      questionId: quest.id,
      selectedAnswerId: quest.selectedAnswer,
    }));
    const userPoint = {
      sessionId: quizzID,
      username: name,
      questions: body,
    };
    dispatch(getPointQuizz(userPoint));
    // const data = await axios
    //   .post(`${url}/result`, {
    //     sessionId: quizzID,
    //     username: name,
    //     questions: body,
    //   });
    // setResult(data.data.result);
    setDone(true);
    setHadbeenSubmited(true);
  };
  useEffect(() => {
    setResult(userResult);
  }, [userResult]);
  const handleChecknone = () => {
    setIsSubmitting(false);
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
            className="shadow-inner text-white mr-[40px] lg:w-[10%] 2xl:w-[8%] bg-rose-600 py-4 rounded-xl text-[20px] xl:w-[9%]"
          >
            View
          </button>
          {hadbeenSubmited === false && (
          <button
            onClick={handleSubmit}
            className="shadow-inner text-white ml-[40px] lg:w-[10%] 2xl:w-[8%] bg-green-600 py-4 rounded-xl text-[20px] xl:w-[9%]"
          >
            Submit
          </button>
          )}
        </div>
      </div>
      {isSubmitting === true && (
        <div className="fixed inset-0 bg-black w-full flex">
          <div className="m-auto opacity-1 bg-white opacity-100 w-[400px] h-[400px] rounded-xl text-[#000] flex  flex-col modal-container">
            <h2 className="m-auto text-4xl text-center">
              Gửi bài của bạn nha ?
            </h2>
            <div className="m-auto flex justify-between">
              <button
                className="p-4 text-white text-[20px] bg-green-500 rounded-xl mr-[20px] px-9 "
                onClick={handleCheckdone}
              >
                Oke
              </button>
              <button
                className="p-4 text-white text-[20px] bg-red-600 rounded-xl ml-[20px] px-9"
                onClick={handleChecknone}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {isDone && (
        <div className="fixed inset-0 bg-black w-full flex">
          <div className="m-auto opacity-1 bg-white opacity-100 w-[600px] h-[400px] rounded-xl text-[#000] flex flex-col modal-container">
            <h2 className="m-auto text-5xl text-center px-[20px]">
              Câu trả lời của bạn đã được lưu lại !!!
            </h2>
            <h2 className="m-auto text-5xl text-center">
              Điểm của bạn là : 
              {result}
              /100
            </h2>
            <button
              className="m-auto text-white p-4 text-[20px] bg-green-500 rounded-xl px-4 "
              onClick={checkSubmit}
            >
              OKE NHA !
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Result;
