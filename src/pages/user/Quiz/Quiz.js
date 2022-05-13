import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Question from "../../../components/Questions/question";
import CheckQuestions from "../../../components/checkQuestions/checkQuestions";
// import { TimeCountDown } from "../../../components/timeCountDown/timeCountdown";
const Quiz = ({
  questions,
  setQuestions,
  handleSelected,
  setHandleSelected,
  name,
  viewAnswer,
  setViewAnswer,
  checkViewTime,
  setCheckViewTime,
  setGetTimeStamp,
  getTimeStamp,
}) => {
  const [options, setOptions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentPick, setCurrentPick] = useState(0);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [isSubmit, setIsSubmit] = useState(false);

  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00:00");
  const history = useHistory();
  const [isCheckTime, setIsCheckTime] = useState(false);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);
    if (total === 0) {
      history.push("/result");
    }
    return {
      total,
      hours,
      seconds,
      minutes,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  var minutes = Math.floor(getTimeStamp / 60000);
  var seconds = ((getTimeStamp % 60000) / 1000).toFixed(0);
  const timeCountDown = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

  const clearTimer = (e) => {
    if (isCheckTime === false) {
      setTimer(timeCountDown);
      if (checkViewTime === true) {
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
          startTimer(e);
        }, 1000);
        Ref.current = id;
      }
    }
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + getTimeStamp / 1000);
    return deadline;
  };

  const handleShuffle = (options) => {
    return options.sort();
  };

  const userPick = questions[currentPick].isSelected;
  // localStorage.setItem("user_answer" , JSON.stringify(userPick))
  useEffect(()=>{
    setHandleSelected(userPick);
  })
  useEffect(() => {
    clearTimer(getDeadTime());
    // setTimer (timer)
    setOptions(
      questions && handleShuffle([...questions[currentQuestion]?.answers])
    );
  }, [questions, currentQuestion, selectedOption, currentPick]);
  // console.log(currentQuestion);
  // console.log(options);

  return (
    <div className="min-h-screen bg-indigo-300 flex">
      <div className="container 2xl m-[auto] flex flex-col ">
        <h2 className="m-[auto] p-[30px] my-[20px] text-[26px] text-[red] bg-white rounded-full">
          {timer}
        </h2>
        <CheckQuestions
          questions={questions}
          setQuestions={setQuestions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          currentPick={currentPick}
          setCurrentPick={setCurrentPick}
          handleSelected={handleSelected}
          isCheckTime={isCheckTime}
          setIsCheckTime={setIsCheckTime}
        />
        <Question
          setIsSubmit={setIsSubmit}
          isSubmit={isSubmit}
          name={name}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          options={options}
          questions={questions}
          setQuestions={setQuestions}
          handleSelected={handleSelected}
          setHandleSelected={setHandleSelected}
          currentPick={currentPick}
          setCurrentPick={setCurrentPick}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          viewAnswer={viewAnswer}
          setViewAnswer={setViewAnswer}
          isCheckTime={isCheckTime}
          setIsCheckTime={setIsCheckTime}
        />
      </div>
    </div>
  );
};
export default Quiz;
