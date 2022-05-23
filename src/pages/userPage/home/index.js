import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { url } from "@utils";
import { getAllDataSessions } from "@actions/user.action";
import { selectSessionsID } from "@store/slice";

function Home({
  quizzesID, setQuizzesID, name, setName, quizzID, setQuizzID
}) {
  const [isError, setIsError] = useState(true);
  const [isErrorID, setIsErrorID] = useState(true);
  const [checkID, setCheckID] = useState();
  const [mesWrongID, setMesWrongID] = useState(false);
  const [mesWrongTime, setMesWrongTime] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionsStore = useSelector(selectSessionsID);

  useEffect(() => {
    dispatch(getAllDataSessions());
  }, []);

  useEffect(() => {
    setCheckID(sessionsStore);
  }, [sessionsStore]);
  const handleSubmitUser = (e) => {
    setIsError(true);
    setName(e.target.value);
  };
  const handleSubmitQuizId = (e) => {
    setQuizzID(e.target.value);
    setIsErrorID(true);
  };
  const handleSubmit = async () => {
    const test = checkID.filter((id) => id._id === quizzID);
    const currentDate = +new Date();
    if (!name || !quizzID) {
      setIsError(true);
    } else if (test.length === 0) {
      setMesWrongID(true);
    } else if (quizzID === test[0]._id) {
      const { timeStart } = test[0];
      const { timeEnd } = test[0];
      const getQuizID = test[0].quizId;
      setQuizzesID(test[0].quizId);
      const data = await axios.post(
        `${url}/sessions/${quizzID}`,
        {
          username: name,
        }
      );
      if (data.data.error === "Username duplicate.") {
        setDuplicate(true);
      } else if (timeStart < currentDate && currentDate < timeEnd) {
        history.push(`/quiz/${getQuizID}`);
      } else {
        setMesWrongTime(true);
        history.push(`/quiz/${getQuizID}`);
      }
    }
  };

  const handleCheckID = () => {
    setMesWrongID(false);
    setMesWrongTime(false);
    setDuplicate(false);
  };

  return (
    // TO DO : check id is valid, build form if it's not valid
    <div className="bg-home flex">
      <div className="container 2xl m-[auto] flex flex-col bg-white w-[500px] py-20 shadow-2xl rounded-lg home">
        <h2 className="text-[30px] m-[auto]">Welcome to my Quiz</h2>
        <div className="flex flex-col">
          <label className="block w-4/5 m-[auto] p-5 ">
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
            {!isError && (
              <div className="m-[auto] text-[red]">
                Please fill all the fields
              </div>
            )}
          </label>
          <label className="block w-4/5 m-[auto] p-5 ">
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
            {!isErrorID && (
              <div className="m-[auto] text-[red]">
                Please fill all the fields
              </div>
            )}
          </label>
          <button
            type="button"
            onClick={handleSubmit}
            className="m-[auto] rounded-full text-xl font-bold shadow-lg p-5 bg-[#93d0de]"
            to="/quiz"
          >
            Let's Start
          </button>
        </div>
      </div>
      {mesWrongID && (
        <div className="fixed inset-0 bg-black w-full flex">
          <div className="m-[auto] opacity-1 bg-white opacity-100 w-[500px] h-[400px] rounded-xl text-[#000] flex  flex-col">
            <h2 className="m-[auto] text-5xl text-center">
              SessionID bạn điền không tồn tại !!!
            </h2>
            <button
              className="m-[auto] p-5 text-[24px] bg-green-500 rounded-xl px-9 "
              onClick={handleCheckID}
            >
              OKE NHA !
            </button>
          </div>
        </div>
      )}
      {mesWrongTime && (
        <div className="fixed inset-0 bg-black w-full flex">
          <div className="m-[auto] opacity-1 bg-white opacity-100 w-[500px] h-[400px] rounded-xl text-[#000] flex  flex-col">
            <h2 className="m-[auto] text-5xl text-center">
              Bạn đang vào sai giờ , kiểm tra lại nha !!!
            </h2>
            <button
              className="m-[auto] p-5 text-[24px] bg-green-500 rounded-xl px-9 "
              onClick={handleCheckID}
            >
              OKE NHA !
            </button>
          </div>
        </div>
      )}
      {duplicate && (
      <div className="fixed inset-0 bg-black w-full flex">
        <div className="m-[auto] opacity-1 bg-white opacity-100 w-[500px] h-[400px] rounded-xl text-[#000] flex  flex-col">
          <h2 className="m-[auto] text-5xl text-center">
            Tên của bạn đã có, nhập tên khác nhé !!!
          </h2>
          <button
            className="m-[auto] p-5 text-[24px] bg-green-500 rounded-xl px-9 "
            onClick={handleCheckID}
          >
            OKE NHA !
          </button>
        </div>
      </div>
      )}
    </div>
  );
}
export default Home;
