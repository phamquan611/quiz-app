import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListSession } from "@actions/session.action";
import { getQuizzes } from "@actions/quiz.action";
import { selectQuizzes } from "@store/slice";
import Loading from "@pages/AdminPage/Loading";

export default function HomeAdmin() {
  const quizzesStore = useSelector(selectQuizzes);
  const dispatch = useDispatch();
  const history = useHistory();
  const quizId = useRef();

  useEffect(() => {
    dispatch(getQuizzes());
    getListSession(getListSession());
  }, []);

  const clickGetQuizWithId = () => {
    history.push(`admin/quiz/${quizId.current.value}`);
  };
  return (
    <div>
      <div className="w-1/2 px-5 ">
        {quizzesStore.length === 0
          ? <Loading />
          : (
            <div className="w-[500px] mb-[20px]">
              <div className="flex">
                <label htmlFor="time-start" className="mr-[20px] mt-2">
                  <span className="font-bold">Quiz Name : </span>
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
              <div>
                <button className="mt-5 py-2 px-4 bg-main-color text-white font-semibold opacity-75 rounded-lg hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75" onClick={clickGetQuizWithId}>
                  View Quiz
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
