import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListSession } from "@actions/session.action";
import { getQuizzes } from "@actions/quiz.action";
import { Table } from "antd";
import { COLUMNS_SESSION_TABLE, convertSessionsToView } from "@utils";
import { selectSessions, selectQuizzes } from "@store/slice";

function Session() {
  const sessionsStore = useSelector(selectSessions);
  const [listSession, setListSession] = useState([]);
  const quizzesStore = useSelector(selectQuizzes);
  const dispatch = useDispatch();

  const filterListSession = () => {
    setListSession(listSession);
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
  }, [sessionsStore.length]);
  return (
    <div>
      <hr className="w-[80%] my-[30px] mx-auto" />
      <div className="">
        <button
          className="py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 rounded-lg hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75"
          onClick={filterListSession}
        >
          Happening
        </button>
      </div>
      <Table
        columns={COLUMNS_SESSION_TABLE}
        dataSource={convertSessionsToView(listSession)}
      />
    </div>
  );
}

export default Session;
