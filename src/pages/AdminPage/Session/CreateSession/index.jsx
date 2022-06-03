import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { postSession } from "@actions/session.action";
import {
  convertHourToTimeStamp,
  getTimeStamp,
  currentTime,
  listTeacher,
  triggerAlertOnlyMessage,
} from "@utils";
import { selectQuizzes } from "@store/slice";

function FormCreateSession() {
  const quizzesStore = useSelector(selectQuizzes);
  const [values, setValues] = useState({
    date: moment(new Date()).format("YYYY-MM-DD"),
    timeStart: "14:00",
    timeEnd: "16:00",
  });
  const quizId = useRef({});
  const teacher = useRef();

  const dispatch = useDispatch();

  // const getDefaultSession = () => {

  // };

  const handleChangeInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // validation create session
  const validationCreateSession = (session) => {
    let isValid = true;
    const currentDate = moment(new Date()).format("YYYY-MM-DD");
    const { timeStart, timeEnd, date } = session;
    if (getTimeStamp(date) < getTimeStamp(currentDate)) {
      triggerAlertOnlyMessage("The test can not a date in the past time .");
      isValid = false;
    }

    if (timeEnd < currentTime) {
      triggerAlertOnlyMessage("The test time must the bigger current time . ");
      isValid = false;
    }

    if (timeEnd < timeStart) {
      triggerAlertOnlyMessage("Time start of session must less than time end .");
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
      teacher: teacher.current.value,
      participants: [],
    };
    if (validationCreateSession(newSession)) {
      return dispatch(postSession(newSession));
    }
  };


  return (
    <div>
      <div className="text-2xl font-bold mb-[20px]">Create Sessions Form</div>
      <div>
        <div className="w-[500px] flex mb-[20px]">
          <label htmlFor="time-start" className="mr-[20px]  min-w-[130px]">
            <b className="font-bold">Quiz Name : </b>
          </label>
          <select
            className="appearance-none px-[10px] py-[7px] flex-1 border border-2 border-[black] rounded-[5px]"
            ref={quizId}
          >
            {quizzesStore.map((quiz) => {
              return (
                <option key={quiz._id} value={quiz._id} className="p-2">
                  {quiz.category}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-[500px] flex mb-[20px]">
          <label htmlFor="time-start" className="mr-[20px]  min-w-[130px]">
            <b className="font-bold">Teacher : </b>
          </label>
          <select
            className="appearance-none px-[10px] py-[7px] flex-1 border border-2 border-[black] rounded-[5px]"
            ref={teacher}
          >
            {listTeacher.map((teacher) => {
              return (
                <option key={teacher} value={teacher} className="p-2">
                  {teacher}
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
          className="py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 rounded-lg hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75"
          type="submit"
          onClick={clickCreateSession}
        >
          Create Session
        </button>
      </div>

    </div>
  );
}

export default FormCreateSession;
