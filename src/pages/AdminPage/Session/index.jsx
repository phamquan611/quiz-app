import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Swal from "sweetalert2";
import { getListSession, postSession } from "@actions/session.action";
import { getQuizzes } from "@actions/quiz.action";
import { Table } from "antd";
import {
  COLUMNS_SESSION_TABLE,
  convertSessionsToView,
  convertHourToTimeStamp,
  getTimeStamp,
  currentTime,
} from "@utils";
import { selectSessions, selectQuizzes } from "@store/slice";

function Session() {
  const sessionsStore = useSelector(selectSessions);
  const [listSession, setListSession] = useState([]);
  const quizzesStore = useSelector(selectQuizzes);
  const [values, setValues] = useState({
    date: moment(new Date()).format("YYYY-MM-DD"),
    timeStart: "14:00",
    timeEnd: "16:00",
  });
  const quizId = useRef({});

  const dispatch = useDispatch();

  const filterListSession = () => {
    const currentDate = moment(new Date()).format("YYYY-MM-DD");
    const cloneSessions = listSession.filter((session) => {
      const { timeStart, timeEnd, date } = session;
      if (getTimeStamp(date) === getTimeStamp(currentDate)) {
        return timeStart <= currentTime && currentTime <= timeEnd;
      }
      return false;
    });
    setListSession(cloneSessions);
  };
  useEffect(() => {
    if (sessionsStore.length === 0) {
      dispatch(getListSession());
    }
    if (quizzesStore.length === 0) {
      dispatch(getQuizzes());
    }
  }, []);

  useEffect(() => {
    setListSession(sessionsStore);
  }, [sessionsStore]);

  const handleChangeInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // validation create session
  const validationCreateSession = (session) => {
    let isValid = true;
    const currentDate = moment(new Date()).format("YYYY-MM-DD");
    if (getTimeStamp(session.date) < getTimeStamp(currentDate)) {
      Swal.fire("The test can not a date in the past time .");
      isValid = false;
    }

    if (session.timeEnd < currentTime) {
      Swal.fire("The test time must the bigger current time . ");
      isValid = false;
    }
    return isValid;
  };
  const clickCreateSession = () => {
    const quizIdSelected = quizId.current?.value;
    const quizWithSelectedId = quizzesStore.filter(
      (quiz) => quiz._id === quizIdSelected,
    );
    const quizSelectedCategory = quizWithSelectedId[0]?.category;
    const { date, timeStart, timeEnd } = values;
    const newSession = {
      ...values,
      timeStart: convertHourToTimeStamp(date, timeStart),
      timeEnd: convertHourToTimeStamp(date, timeEnd),
      category: quizSelectedCategory,
      quizId: quizIdSelected,
      participants: [],
    };
    if (validationCreateSession(newSession)) {
      return dispatch(postSession(newSession));
    }
  };


  return (
    <div className="px-[50px]">
      <div className="text-2xl font-bold mb-[20px]">Create Sessions</div>
      <div>
        <div className="w-[500px] flex mb-[20px]">
          <label htmlFor="time-start" className="mr-[20px]  min-w-[130px]">
            <b className="font-bold">Quiz Category : </b>
          </label>
          <select
            className="appearance-none font-bold px-[10px] py-[7px] flex-1 border border-2 border-[black] rounded-[5px]"
            ref={quizId}
          >
            {quizzesStore.map((quiz) => {
              return (
                <option key={quiz._id} value={quiz._id} className="font-bold">
                  {quiz.category}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-[500px] flex mb-[20px]">
          <label htmlFor="date" className="mr-[20px] min-w-[130px]">
            <b className="font-bold ">Date : </b>
          </label>
          <input
            type="date"
            onChange={handleChangeInput}
            id="date"
            name="date"
            value={values.date}
            className="flex-1 border border-2 border-[black] rounded-[5px] px-[10px] py-[7px]"
          />
        </div>
        <div className="w-[500px] flex mb-[20px]">
          <label htmlFor="timeStart" className="mr-[20px] min-w-[130px]">
            <b className="font-bold ">Time start : </b>
          </label>
          <input
            type="time"
            id="timeStart"
            name="timeStart"
            value={values.timeStart}
            className="flex-1 border border-2 border-[black] rounded-[5px] px-[10px] py-[7px]"
            onChange={handleChangeInput}
          />
        </div>
        <div className="w-[500px] flex mb-[20px]">
          <label htmlFor="timeEnd" className="mr-[20px] min-w-[130px]">
            <b className="font-bold ">Time end : </b>
          </label>
          <input
            type="time"
            id="timeEnd"
            name="timeEnd"
            value={values.timeEnd}
            className="flex-1 border border-2 border-[black] rounded-[5px] px-[10px] py-[7px]"
            onChange={handleChangeInput}
          />
        </div>
      </div>
      <div>
        <button
          className="py-2 px-4 bg-main-color text-white font-semibold opacity-75 rounded-lg hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75"
          type="submit"
          onClick={clickCreateSession}
        >
          Create Session
        </button>
      </div>

      <hr className="w-[80%] my-[30px] mx-auto " />
      <div className="text-center">
        <h1 className="text-2xl">Table Session</h1>
        <h3>( Click id a session to see the list participant )</h3>
      </div>
      <div className="my-[10px]">
        <button
          className="py-2 px-4 bg-main-color text-white font-semibold opacity-75 rounded-lg hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75"
          onClick={filterListSession}
        >
          Happening
        </button>
      </div>
      <Table
        columns={COLUMNS_SESSION_TABLE}
        dataSource={convertSessionsToView(listSession)}
        className="cursor-pointer"
      />
    </div>
  );
}

export default Session;
