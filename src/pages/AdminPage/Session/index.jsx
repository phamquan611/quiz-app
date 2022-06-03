import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListSession } from "@actions/session.action";
import { getQuizzes } from "@actions/quiz.action";
import { Table } from "antd";
import FormCreateSession from "@pages/AdminPage/Session/CreateSession";
import Quiz from "@pages/AdminPage/Session/Quiz";
import {
  COLUMNS_SESSION_TABLE,
  convertSessionsToView,
  convertSession,
} from "@utils";
import { selectSessions, selectQuizzes } from "@store/slice";

function Session() {
  const sessionsStore = useSelector(selectSessions);
  const [listSession, setListSession] = useState([]);
  const quizzesStore = useSelector(selectQuizzes);
  const dispatch = useDispatch();

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



  return (
    <div className="px-[50px]">
      <div className="flex justify-between flex-wrap mx-auto">
        <FormCreateSession />
        <Quiz />
      </div>
      <hr className="w-[80%] my-[30px] mx-auto " />
      <div className="text-center">
        <h1 className="text-2xl">Table Session</h1>
      </div>
      <Table
        columns={COLUMNS_SESSION_TABLE}
        dataSource={convertSessionsToView(convertSession(listSession))}
        className="cursor-pointer"
      />
    </div>
  );
}

export default Session;
