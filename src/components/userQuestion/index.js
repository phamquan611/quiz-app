import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

function Question({ questions, timeStamp }) {
  const [options, setOptions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const Ref = useRef(null);
  const history = useHistory();
  const [timer, setTimer] = useState("00:00:00");

  const handleShuffle = (Options) => {
    return Options.sort();
  };
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    const {
      total, hours, minutes, seconds
    } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        `${hours > 9 ? hours : `0${hours}`
        }:${
          minutes > 9 ? minutes : `0${minutes}`
        }:${
          seconds > 9 ? seconds : `0${seconds}`}`
      );
    }
  };

  const minutes = Math.floor(timeStamp / 60000);
  const seconds = ((timeStamp % 60000) / 1000).toFixed(0);
  const timeCountDown = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const clearTimer = (e) => {
    setTimer(timeCountDown);

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    const deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + timeStamp / 1000);
    return deadline;
  };

  useEffect(() => {
    setOptions(
      questions.length > 0 &&
        handleShuffle([...questions[currentQuestion].answers])
    );
    clearTimer(getDeadTime());
  }, [questions, currentQuestion]);
  return (
  // TO DO : pick question

    <div className="w-[49%] h-96">
      <div className="bg-white rounded-lg shadow-2xl py-5 text-center text-xl mb-[20px] border-2  border-sky-500">
        <h2>{timer}</h2>
        <p className="pb-[10px]">
          Question :
          {currentQuestion + 1}
          /
          {questions.length}
        </p>
        <p className="pb-[10px]">{questions[currentQuestion].content}</p>
      </div>
      <div className="flex justify-between flex-wrap">
        {options &&
          options.map(({ content }) => (
            <button className="bg-white rounded-lg shadow-2xl text-xl mb-[20px] py-[20px] w-[48%] m-[auto] border-2  border-sky-500">
              {content}
            </button>
          ))}
      </div>
    </div>
  );
}
export default Question;
