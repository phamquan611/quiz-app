import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Table } from "antd";
import Loading from "@pages/AdminPage/Loading";
import Page404 from "@pages/AdminPage/404";
import { getListSession } from "@actions/session.action";
import { selectSessions } from "@store/slice";
import {
  convertTimeStampToDateTime,
  COLUMNS_PARTICIPANTS_TABLE,
} from "@utils";

export default function Participants() {
  const dispatch = useDispatch();
  const sessionsStore = useSelector(selectSessions);
  const params = useParams();
  const { sessionId } = params;
  const [participants, setParticipants] = useState([]);
  const [session, setSession] = useState({});
  useEffect(() => {
    if (sessionsStore.length === 0) {
      dispatch(getListSession());
    } else {
      const matchSession = sessionsStore.filter((session) => session._id === sessionId);
      if (matchSession.length !== 0) {
        // add unique key to map with antd
        const configDataParticipants = matchSession[0].participants.map((participant) => {
          const { username } = participant;
          return { ...participant, key: username };
        });
        setParticipants(configDataParticipants);
        setSession(matchSession[0]);
      } else {
        setParticipants(null);
      }
    }
  }, []);

  useEffect(() => {
    const matchSession = sessionsStore.filter((session) => session._id === sessionId);
    if (matchSession.length !== 0) {
      const configDataParticipants = matchSession[0].participants.map((participant) => {
        const { username } = participant;
        return { ...participant, key: username };
      });
      setParticipants(configDataParticipants);
      setSession(matchSession[0]);
    } else {
      setParticipants(null);
    }
  }, [sessionsStore[0]]);

  const filterAsc = () => {
    const participantsAsc = participants.sort((parA, parB) => parA.result - parB.result);
    setParticipants([...participantsAsc]);
  };

  const filterDesc = () => {
    const participantsDesc = participants.sort((parA, parB) => parB.result - parA.result);
    setParticipants([...participantsDesc]);
  };

  return (
    <div>
      {sessionsStore.length === 0 ? <Loading /> : !participants ? <Page404 />
        : (
          <div>
            <div className="px-[30px] pb-[20px]">
              <h1 className="font-bold text-[20px]">
                {"Category : "}
                {session.category}
              </h1>
              <div className="font-bold text-[17px]">
                Date :
                {` ${moment(session.date).format("DD-MM-YYYY")}`}
              </div>
              <div className="font-bold text-[17px]">
                Time start :
                {` ${convertTimeStampToDateTime(session.timeStart)}`}
              </div>
              <div className="font-bold text-[17px]">
                Time end :
                {` ${convertTimeStampToDateTime(session.timeEnd)}`}
              </div>
            </div>
            <div className="flex mx-[20px] py-5">
              <button
                onClick={filterAsc}
                className="py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 rounded-lg hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75"
              >
                Ascending
              </button>
              <button
                onClick={filterDesc}
                className="py-2 ml-5 px-4 bg-[red] text-white font-semibold opacity-75 rounded-lg hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75"
              >
                decrease
              </button>
            </div>
            <Table columns={COLUMNS_PARTICIPANTS_TABLE} dataSource={participants} />
          </div>
        )}
    </div>
  );
}
