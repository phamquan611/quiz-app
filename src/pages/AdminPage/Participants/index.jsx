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
          let { result } = participant;
          if (!result) {
            result = 0;
          }
          return { ...participant, key: username, result };
        });
        setParticipants(configDataParticipants);
        setSession(matchSession[0]);
      }
    }
  }, []);

  return (
    <div>
      {sessionsStore.length === 0 ? <Loading /> : !participants ? <Page404 />
        : (
          <div>
            <div className="px-[30px] pb-[20px]">
              <div className="font-bold">
                {`Quiz name : ${session.category}`}
              </div>
              <div className="font-bold">
                Test date :
                {` ${moment(session.date).format("DD-MM-YYYY")}`}
              </div>
              <div className="font-bold">
                Time start :
                {` ${convertTimeStampToDateTime(session.timeStart)}`}
              </div>
              <div className="font-bold">
                Time end :
                {` ${convertTimeStampToDateTime(session.timeEnd)}`}
              </div>
            </div>
            <Table columns={COLUMNS_PARTICIPANTS_TABLE} dataSource={participants} />
          </div>
        )}
    </div>
  );
}
