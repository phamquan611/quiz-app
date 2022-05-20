import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  RiDeleteBin6Line,
  // RiAddCircleFill,
  RiMessage2Line,
  // RiAddLine,
} from "react-icons/ri";
import { FcCheckmark } from "react-icons/fc";

// import Swal from "sweetalert2";
import { selectQuizzes } from "@store/slice";
import { getQuizzes } from "@actions/quiz.action";
import { IDEA } from "@utils";

export default function QuizWithId() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const quizzesStore = useSelector(selectQuizzes);
  const [quizWithId, setQuizWithId] = useState(null);
  // state edit question
  const [questionEdit, setQuestionEdit] = useState({});
  // const [newQuestion, setNewQuestion] = useState({});
  const [indexQuestionEdit, setIndexQuestionEdit] = useState(null);

  useEffect(() => {
    if (quizzesStore.length === 0) {
      dispatch(getQuizzes());
    } else {
      const quizMatchId = quizzesStore.filter(
        (quiz) => quiz._id === params.quizId,
      );
      if (quizMatchId.length === 0) {
        history.push("/admin");
      } else {
        setQuizWithId(quizMatchId[0]);
      }
    }
  }, [quizzesStore.length]);

  const openEditQuestion = (question, index) => {
    setQuestionEdit(question);
    setIndexQuestionEdit(index + 1);
  };

  return (
    <div className="p-[50px]">
      {quizWithId ? (
        <>
          <div className="text-2xl font-bold">
            Category :
            {" "}
            {quizWithId.category}
          </div>
          <div className="flex pt-[30px] justify-between">
            <div className="side-bar-question">
              {quizWithId.questions.map((question, index) => {
                return (
                  <div className="w-[120px] mb-[10px]" key={question.id}>
                    <button
                      className="font-bold text-[#f1f1f1] w-full p-[10px] bg-indigo-500"
                      onClick={() => openEditQuestion(question, index)}
                    >
                      Q.
                      {index + 1}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="list-question pl-[20px] text-[18px]">
              {quizWithId.questions.map((question, index) => {
                const correctAnswerId = question.correct_answer;
                return (
                  <div className="mb-[30px]" key={question.id}>
                    <div className="mb-[10px]">
                      <b className="font-bold">{index + 1}</b>
                      {" "}
                      :
                      {" "}
                      {question.content}
                    </div>
                    <div className="w-1/2 flex justify-between flex-wrap ">
                      {question.answers.map((answer, index) => {
                        const isCorrectAnswer = correctAnswerId === answer.id;
                        return (
                          <div
                            className={`${
                              isCorrectAnswer ? "text-[red] font-bold" : ""
                            } w-1/2`}
                            key={answer.id}
                          >
                            {IDEA[index]}
                            {" "}
                            .
                            {" "}
                            {answer.content}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="edit-add-question w-[40%]">
              <div className="font-bold text-[24px]">Edit Popup</div>
              {Object.keys(questionEdit).length === 0 ? (
                <div className="empty-edit-question" />
              ) : (
                <div className="question-edit-form bg-[#f5f5f5] p-[20px]">
                  <div className="question-edit-index text-[20px]">
                    {"Question "}
                    {indexQuestionEdit}
                    {" "}
                    :
                    {" "}
                    {questionEdit.content}
                  </div>
                  <div>
                    {questionEdit.answers.map((answer, index) => {
                      const isCorrectAnswer = answer.id === questionEdit.correct_answer;
                      return (
                        <div
                          className="flex justify-between text-[18px]"
                          key={answer.id}
                        >
                          <div className="flex answer-default">
                            <b>{`${IDEA[index]} .`}</b>
                            {" "}
                            {answer.content}
                            {isCorrectAnswer ? (
                              <FcCheckmark className="ml-[10px] mt-[5px]" />
                            ) : (
                              <div />
                            )}
                          </div>
                          <div className="flex answer-edit pt-[5px] pr-[20px]">
                            <RiMessage2Line className="text-[blue] mr-[10px]" />
                            <RiDeleteBin6Line className="text-[red]" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <button
                      className="mt-[20px] py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75"
                      type="submit"
                    >
                      Update question
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="text-3xl font-bold text-center">QUIZ NOT FOUND</div>
      )}
    </div>
  );
}
