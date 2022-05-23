/* eslint-disable max-len */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { url } from "@utils";

function Result({
  quizzesID,
  setIsOptionAvailable,
  setIsCheckTime,
  viewAnswers,
  name,
  quizzID,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmited, setisSubmitted] = useState(true);
  const [result, setResult] = useState();
  const [isDone, setDone] = useState(false);
  const history = useHistory();

  const handleView = () => {
    history.push(`/quiz/${quizzesID}`);
    setIsCheckTime(true);
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (isSubmited === true) {
      setIsOptionAvailable(true);
      const body = viewAnswers.map((quest) => ({
        questionId: quest.id,
        selectedAnswerId: quest.selectedAnswer,
      }));
      const data = await axios
        .post(`${url}/result`, {
          sessionId: quizzID,
          username: name,
          questions: body,
        });
      setResult(data.data.result);
      setDone(true);
    }
  };
  const handleCheckdone = () => {
    setIsSubmitting(false);
    setisSubmitted(true);
  };
  const handleChecknone = () => {
    setIsSubmitting(false);
  };
  const checkSubmit = () => {
    setDone(false);
  };
  return (
    // TO DO : axios post and view answer , disable option answer when choose submit
    <div className="bg-result">
      <div className="container m-[auto]">
        <div className="bg-white w-[30%] rounded-lg shadow-2xl m-[auto] py-5 text-center text-[40px] mb-[20px] border-2  border-sky-500">
          <img
            src="https://thumbs.dreamstime.com/b/completed-rubber-stamp-green-vector-illustration-contains-original-brushes-83716676.jpg"
            alt="done-img"
          />
        </div>
        <div className="flex justify-evenly ">
          <button
            onClick={handleView}
            className="shadow-inner w-[10%] bg-rose-600 py-5 px-10 rounded-xl text-[26px]"
          >
            View
          </button>
          <button
            onClick={handleSubmit}
            className="shadow-inner w-[10%] bg-green-600 py-5 px-10 rounded-xl text-[26px]"
          >
            Submit
          </button>
        </div>
      </div>
      {isSubmitting === true && (
        <div className="fixed inset-0 bg-black w-full flex ">
          <div className="m-[auto] opacity-1 bg-white opacity-100 w-[400px] h-[400px] rounded-xl text-[#000] flex  flex-col ">
            <h2 className="m-[auto] text-5xl text-center">
              Gửi bài của bạn nha ?
            </h2>
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
      )}
      {isDone && (
        <div className="fixed inset-0 bg-black w-full flex">
          <div className="m-[auto] opacity-1 bg-white opacity-100 w-[500px] h-[400px] rounded-xl text-[#000] flex  flex-col">
            <h2 className="m-[auto] text-5xl text-center">
              Câu trả lời của bạn đã được lưu lại !!!
            </h2>
            <h2 className="m-[auto] text-5xl text-center">
              Điểm của bạn là :
              {result}
            </h2>
            <button
              className="m-[auto] p-5 text-[24px] bg-green-500 rounded-xl px-9 "
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
