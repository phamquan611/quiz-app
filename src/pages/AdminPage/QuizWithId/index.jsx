import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "@pages/AdminPage/Loading";
import QuestionToEdit from "@pages/AdminPage/QuizWithId/QuestionToEdit";
import NewQuestion from "@pages/AdminPage/QuizWithId/NewQuestion";
import { selectQuizzes } from "@store/slice";
import { getQuizzes, putQuiz } from "@actions/quiz.action";
import { IDEA } from "@utils";
import {
  NUM_MIN_QUESTION_A_QUIZ,
} from "@utils/constant";

export default function QuizWithId() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const quizzesStore = useSelector(selectQuizzes);
  const [quizWithId, setQuizWithId] = useState(null);
  // state question to edit
  const [questionToEdit, setQuestionToEdit] = useState([]);
  const [indexQuestionToEdit, setIndexQuestionToEdit] = useState(null);
  // state create newQuestion
  const [openPopupNewQuestion, setOpenPopupNewQuestion] = useState(false);

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

  // function edit question
  const openEditQuestion = (question, index) => {
    setQuestionToEdit({ ...question, answers: question.answers });
    setIndexQuestionToEdit(index + 1);
  };

  const changeCorrectAnswer = (newCorrectAnswer) => {
    const newCorrectAnswerId = newCorrectAnswer.id;
    setQuestionToEdit({ ...questionToEdit, correct_answer: newCorrectAnswerId });
  };

  const addNewAnswerToEditQuestion = (newAnswer) => {
    const { answers } = questionToEdit;
    answers.push(newAnswer);
    return setQuestionToEdit({ ...questionToEdit, answers });
  };

  const deleteAnswerToEditQuestion = (idDeleteAnswer) => {
    const { answers } = questionToEdit;
    const newAnswers = answers.filter((answer) => answer.id !== idDeleteAnswer);
    setQuestionToEdit({ ...questionToEdit, answers: newAnswers });
  };

  const handleContentToEditQuestion = (content) => {
    setQuestionToEdit({ ...questionToEdit, content });
  };

  const updateQuestion = (questionUpdated) => {
    const { id } = questionUpdated;
    const { questions } = quizWithId;
    const newListQuestion = questions.map((question) => {
      if (question.id === id) {
        return questionUpdated;
      }
      return question;
    });
    setQuizWithId({ ...quizWithId, questions: newListQuestion });
    return setQuestionToEdit([]);
  };

  const clickOpenPopupNewQuestion = () => {
    setOpenPopupNewQuestion(!openPopupNewQuestion);
  };

  const changeContentAnswerToEditQuestion = (idAnswer, newContent) => {
    const { answers } = questionToEdit;
    const newAnswers = answers.map((answer) => {
      let { content } = answer;
      if (answer.id === idAnswer) {
        content = newContent;
      }
      return { ...answer, content };
    });

    setQuestionToEdit({ ...questionToEdit, answers: newAnswers });
  };

  const closeEditToQuestion = () => {
    return setQuestionToEdit([]);
  };


  // function insert question
  const insertQuestion = (newQuestion) => {
    const { questions } = quizWithId;
    questions.push(newQuestion);
    setQuizWithId({ ...quizWithId, questions });
  };

  // function delete question
  const deleteQuestionWithId = (idQuestion, indexQuestion) => {
    let { questions } = quizWithId;
    if (questions.length <= NUM_MIN_QUESTION_A_QUIZ) {
      return Swal.fire("Can't delete question, A quiz have a minimum 10 question");
    }
    Swal.fire({
      title: `Are you sure delete question ${indexQuestion + 1}`,
      showDenyButton: true,
      confirmButtonText: "YES",
      denyButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        questions = questions.filter((question) => question.id !== idQuestion);
        return setQuizWithId({ ...quizWithId, questions });
      }
    });
  };

  // function update quiz
  const upDateQUiz = () => {
    const payload = {
      id: params.quizId,
      data: quizWithId,
    };
    Swal.fire({
      title: "Are you sure update quiz ?",
      showDenyButton: true,
      confirmButtonText: "YES",
      denyButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(putQuiz(payload));
      }
    });
  };

  return (
    <div className="p-[50px]">
      {quizWithId ? (
        <>
          <div className="text-2xl font-bold">
            {`Category : ${quizWithId.category}`}
          </div>
          <div className="text-[red]">
            Click to edit question.
          </div>
          <div className="flex pt-[30px] justify-between">
            <div className="side-bar-question">
              {quizWithId.questions.map((question, index) => {
                return (
                  <div className="w-[150px] mb-[10px] flex justify-between" key={question.id}>
                    <button
                      className="font-bold text-[#f1f1f1] rounded-[3px] w-[47%] p-[10px] bg-indigo-500"
                      onClick={() => openEditQuestion(question, index)}
                    >
                      {`Q. ${index + 1}`}
                    </button>
                    <button
                      className="font-bold text-[#f1f1f1] rounded-[3px] w-[47%] p-[10px] bg-[red]"
                      onClick={() => deleteQuestionWithId(question.id, index)}
                    >
                      Delete
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
            <div className="edit-add-form w-[30%]">
              <QuestionToEdit
                questionToEdit={questionToEdit}
                indexQuestionToEdit={indexQuestionToEdit}
                updateQuestion={updateQuestion}
                changeCorrectAnswer={changeCorrectAnswer}
                addNewAnswerToEditQuestion={addNewAnswerToEditQuestion}
                deleteAnswerToEditQuestion={deleteAnswerToEditQuestion}
                handleContentToEditQuestion={handleContentToEditQuestion}
                closeEditToQuestion={closeEditToQuestion}
                changeContentAnswerToEditQuestion={changeContentAnswerToEditQuestion}
              />
              <div className="text-right">
                <button
                  onClick={clickOpenPopupNewQuestion}
                  className={`my-10 py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 rounded-[5px] hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${openPopupNewQuestion ? "bg-[red]" : ""}`}
                >
                  {openPopupNewQuestion && "Close"}
                </button>
              </div>
              { openPopupNewQuestion
              && (
              <NewQuestion
                insertQuestion={insertQuestion}
                clickOpenPopupNewQuestion={clickOpenPopupNewQuestion}
              />
              )}
            </div>
          </div>
          <div className="text-center">
            <button className="bg-[red] p-2 text-[17px] text-[#f1f1f1] rounded-[4px]" onClick={upDateQUiz}>
              Update Quiz
            </button>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
