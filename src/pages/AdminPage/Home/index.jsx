import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListSession } from "@actions/session.action";
import { getQuizzes } from "@actions/quiz.action";
import { selectQuizzes } from "@store/slice";

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
    <div className="flex flex-wrap justify-between 2xl:mx-[50px]">
      {quizzesStore.length === 0
        ? "No data"
        : quizzesStore.map((quiz) => {
          return (
            <div className="w-[200px]" key={quiz._id}>
              <button className="py-2 w-[100%] text-[20px] px-4 bg-[#51ad32] text-white font-semibold opacity-75 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75" onClick={() => clickGetQuizWithId(quiz._id)}>{quiz.category}</button>
            </div>
          );
        })}
    </div>
  );
}