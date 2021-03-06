/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-tag-location */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllDataSessions, checkNameExist } from "@actions/user.action";
import { selectSessionsID, quizId } from "@store/slice";
import { IoIosCloseCircle } from "react-icons/io";
import { WRONG_TIME_MSG, WRONG_ID_MSG } from "@utils/constant";

function Home({
  name, setName, isUserBack,
}) {
  const [sessionID, setSessionID] = useState("");
  const [quizzesID, setQuizzesID] = useState("");
  const [isError, setIsError] = useState(false);
  const [checkID, setCheckID] = useState();
  const [mesWrong, setMesWrong] = useState(false);
  const [toastMes, setToastMes] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionsStore = useSelector(selectSessionsID);
  const quizID = useSelector(quizId);
  useEffect(() => {
    dispatch(getAllDataSessions());
  }, []);

  useEffect(() => {
    setCheckID(sessionsStore);
  }, [sessionsStore]);
  const handleSubmitUser = (e) => {
    setName(e.target.value);
    setIsError(false);
  };
  const handleSubmitQuizId = (e) => {
    setSessionID(e.target.value);
    setIsError(false);
  };
  const handleSubmit = async () => {
    const currentDate = +new Date();
    const test = checkID.filter((id) => id._id === sessionID);
    if (!name || !sessionID) {
      setIsError(true);
    } else if (test.length === 0) {
      setMesWrong(true);
      setToastMes(WRONG_ID_MSG);
    } else if (sessionID === test[0]._id) {
      // test to check if id user use is value or not
      const { timeStart } = test[0];
      const { timeEnd } = test[0];
      setQuizzesID(test[0].quizId);
      const loginDetails = {
        id: sessionID,
        username: name,
      };

      if (timeStart > currentDate || currentDate > timeEnd) {
        setMesWrong(true);
        setToastMes(WRONG_TIME_MSG);
      } else {
        dispatch(checkNameExist(loginDetails));
      }
    }
  };
  useEffect(() => {
    if (typeof quizID !== "object" && quizID && !isUserBack) {
      history.push(`/quiz/${quizID}`);
    }
  }, [quizID]);

  const handleCheckID = () => {
    setMesWrong(false);
  };

  return (
    // TO DO : check id is valid, build form if it's not valid
    <div className="bg-home flex">
      <div className="container 2xl m-auto flex flex-col bg-white w-[500px] py-20 shadow-2xl rounded-lg home">
        <h2 className="text-[30px] m-auto">Welcome to my Quiz</h2>
        <div className="flex flex-col ">
          <label className="block w-4/5 m-auto p-5 ">
            <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Your Username
            </span>
            <input
              type="text"
              name="text"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Your Username"
              onChange={handleSubmitUser}
            />
            {isError && (
              <div className="m-auto text-[red]">
                Please fill all the fields
              </div>
            )}
          </label>
          <label className="block w-4/5 m-auto p-5 ">
            <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Your session ID
            </span>
            <input
              type="text"
              name="text"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Your session ID"
              onChange={handleSubmitQuizId}
            />
            {isError && (
              <div className="m-auto text-[red]">
                Please fill all the fields
              </div>
            )}
          </label>
          <button
            type="button"
            onClick={handleSubmit}
            className="m-auto rounded-2xl text-base font-bold shadow-lg px-5 py-3 bg-[#93d0de]"
            to="/quiz"
          >
            Let's Start
          </button>
        </div>
      </div>
      {mesWrong && (
      <div className="fixed inset-0 bg-black w-full flex bg-[#779eca]">
        <div className="m-auto opacity-1 bg-white opacity-100 w-[350px] h-[300px] rounded-xl text-[#000] flex  flex-col modal-container">
          <IoIosCloseCircle className="text-6xl m-auto mb-6 mt-9 text-rose-700" />
          {toastMes === WRONG_ID_MSG && (
          <h2 className="m-auto my-0 text-xl px-5 text-center">
            Your Sessions ID is not exist. Please try different Sessions ID!!!
            </h2>
          ) }
          {toastMes === WRONG_TIME_MSG && (
          <h2 className="m-auto my-0 text-xl px-2.5 text-center">
            You are connected wrong time. Please try different time !!!
            </h2>
          ) }

          <button
            className="m-auto mt-6 text-white py-2.5 px-5 text-[16px] bg-green-500 rounded-lg "
            onClick={handleCheckID}
          >
            OK
          </button>
        </div>
      </div>
      )}
    </div>
  );
}
export default Home;
