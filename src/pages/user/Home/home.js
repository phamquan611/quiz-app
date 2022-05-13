import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Home = ({
  name,
  setName,
  getID,
  setGetID,
  checkID,
  setViewAnswer,
  setHandleSelected,
  setCheckViewTime,
  setGetTimeStamp,
  setGetQuizID,
  setQuestions,
}) => {
  const [isError, setIsError] = useState(false);
  const history = useHistory();
  const [isExpired ,  setIsExpired] = useState(false)
  const [checkSessionID ,  setCheckSessionID] = useState(true)
  const handleSubmit = () => {
    const tesst = checkID.filter(function (id) {
      return id._id == getID;
    });
    if (!name) {
      setIsError(true);
    } else if (!getID) {
      setIsError(true);
    }
    if (getID == tesst[0]._id) {
      setIsError(false);
      setViewAnswer(false);
      setHandleSelected(null);
      setCheckViewTime(true);
      setGetTimeStamp(tesst[0].timeChallenge);
      setGetQuizID(tesst[0].quizId);
      axios
      .get(`https://quiz-app-winds.herokuapp.com/quizzes/${tesst[0].quizId}`)
      .then((res) => {
        console.log(res.data[0].questions);
        setHandleSelected(res.data[0].isSelected);
        setQuestions(res.data[0].questions);
      });
      
      var currentDate = +new Date();
      console.log(currentDate);
      console.log(tesst[0].timeStart);
      console.log(tesst[0].timeEnd);
      var date = new Date(tesst[0].timeStart);
      console.log(date)
      console.log(currentDate - tesst[0].timeStart)
      // debugger
      if (tesst[0].timeStart < currentDate  && currentDate < tesst[0].timeEnd) {
        history.push(`/quiz/${tesst[0].quizId}`);
      }
      else{
        setIsExpired(true)
      }
      localStorage.setItem("userName", name);
      localStorage.setItem("sessionID", getID);
    }
    else{
      setCheckSessionID(false)
    }
  };
  const handleCheck = ()=>{
    setIsExpired(false)
  }
  const handleCheckID = ()=>{
    setIsExpired(false)
  }
  return (
    <>
    <div className="min-h-screen bg-indigo-300 flex ">
      <div className="container 2xl m-[auto] flex flex-col">
        <h2 className="text-[30px] m-[auto]">Welcome to my Quiz</h2>
        <div className="flex flex-col">
          {isError ? "Please fill all the fields" : ""}
          <label className="block w-2/4 m-[auto] p-5 ">
            <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Your Username
            </span>
            <input
              type="text"
              name="text"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Your Username"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="block w-2/4 m-[auto] p-5 ">
            <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Your session ID
            </span>
            <input
              type="text"
              name="text"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Your session ID"
              onChange={(e) => setGetID(e.target.value)}
            />
          </label>
          <button
            type="button"
            onClick={handleSubmit}
            className="m-[auto] rounded-full text-xl font-black shadow-lg p-5 bg-green-300"
            to="/quiz"
          >
            Let's Start
          </button>
        </div>
      </div>
    </div>
    {
      isExpired === true ?
    <div className="fixed inset-0 bg-black w-full flex">
      <div className="m-[auto] opacity-1 bg-white opacity-100 w-[500px] h-[400px] rounded-xl text-[#000] flex  flex-col">
        <h2 className="m-[auto] text-5xl">Vào sai giờ rồi !!!</h2>
        <button
                className="m-[auto] p-5 text-[24px] bg-green-500 rounded-xl px-9 "
                onClick={handleCheck}
              >
                OKE NHA !
              </button>
      </div>
    </div>
      : ""
    }
        {
      checkSessionID === false ?
    <div className="fixed inset-0 bg-black w-full flex">
      <div className="m-[auto] opacity-1 bg-white opacity-100 w-[500px] h-[400px] rounded-xl text-[#000] flex  flex-col">
        <h2 className="m-[auto] text-5xl">Wrong sessionID !!!</h2>
        <button
                className="m-[auto] p-5 text-[24px] bg-green-500 rounded-xl px-9 "
                onClick={handleCheckID}
              >
                OKE NHA !
              </button>
      </div>
    </div>
      : ""
    }
    </>
  );
};
export default Home;
