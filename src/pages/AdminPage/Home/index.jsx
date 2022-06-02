import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(getQuizzes());
    getListSession(getListSession());
  }, []);

  const clickGetQuizWithId = (quizId) => {
    history.push(`admin/quiz/${quizId}`);
  };
  return (
    <div>
      <h1 className="text-3xl px-10">List Quiz : </h1>
      <div className="flex justify-between flex-wrap mx-auto container">
        {quizzesStore.length === 0
          ? <Loading />
          : quizzesStore.map((quiz) => {
            return (
              <div className="w-[47%] p-5 my-5" key={quiz._id}>
                <button className="py-2 h-full my-5 w-full text-[20px] px-4 bg-main-color text-white font-semibold opacity-75 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75" onClick={() => clickGetQuizWithId(quiz._id)}>{quiz.category}</button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
