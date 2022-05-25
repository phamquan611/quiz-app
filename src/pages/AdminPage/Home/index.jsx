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
      <h1 className="text-3xl px-10">List Category : </h1>
      <div className="flex justify-between flex-wrap w-[1000px] mx-auto ">
        {quizzesStore.length === 0
          ? <Loading />
          : quizzesStore.map((quiz) => {
            return (
              <div className="w-[47%] h-[300px]" key={quiz._id}>
                <button className="py-2 h-full my-5 w-[100%] text-[20px] px-4 bg-[#51ad32] text-white font-semibold opacity-75 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75" onClick={() => clickGetQuizWithId(quiz._id)}>{quiz.category}</button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
