import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Loading from "@pages/AdminPage/Loading";
import QuestionToEdit from "@pages/AdminPage/QuizWithId/QuestionToEdit";
import NewQuestion from "@pages/AdminPage/QuizWithId/NewQuestion";
import { selectQuizzes } from "@store/slice";
import { getQuizzes } from "@actions/quiz.action";
import { IDEA } from "@utils";

export default function QuizWithId() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const quizzesStore = useSelector(selectQuizzes);
  const [quizWithId, setQuizWithId] = useState(null);
  // state question to edit
  const [questionToEdit, setQuestionToEdit] = useState([]);
  const [indexQuestionToEdit, setIndexQuestionToEdit] = useState(null);

  useEffect(() => {
    const quizMatchId = quizzesStore.filter(
      (quiz) => quiz._id === params.quizId,
    );
    if (quizMatchId.length === 0) {
      history.push("/admin");
    } else {
      setQuizWithId(quizMatchId[0]);
    }
  }, [quizzesStore]);

  useEffect(() => {
    if (quizzesStore.length === 0) {
      dispatch(getQuizzes());
    }
  }, []);

  const openEditQuestion = (question, index) => {
    setQuestionToEdit({ ...question, answers: question.answers });
    setIndexQuestionToEdit(index + 1);
  };
  return (
    <div className="p-[50px]">
      {quizWithId ? (
        <>
          <div className="text-2xl font-bold">
            {`Category ${quizWithId.category}`}
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
                      {`Q. ${index + 1}`}
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
                      {` : ${question.content}`}
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
                            {`${IDEA[index]} . ${answer.content}`}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="edit-add-form">
              <QuestionToEdit
                questionToEdit={questionToEdit}
                indexQuestionToEdit={indexQuestionToEdit}
              />
              <NewQuestion />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
