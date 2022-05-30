import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "@pages/AdminPage/Loading";
import QuestionToEdit from "@pages/AdminPage/Quiz/Component/QuestionEditing";
import NewQuestion from "@pages/AdminPage/Quiz/Component/NewQuestion";
import Question from "@pages/AdminPage/Quiz/Component/Question";
import { selectQuizzes } from "@store/slice";
import { getQuizzes, putQuiz } from "@actions/quiz.action";
import {
  NUM_MIN_QUESTION_A_QUIZ,
} from "@utils/constant";

export default function QuizWithId() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const listQuiz = useSelector(selectQuizzes);
  const [quiz, setQuiz] = useState(null);
  // state question to edit
  const [questionEditing, setQuestionEditing] = useState([]);
  const [indexQuestionEditing, setIndexQuestionEditing] = useState(null);
  // state create newQuestion
  const [toggleNewQuestionPopup, setToggleNewQuestionPopup] = useState(false);

  useEffect(() => {
    const quizMatchId = listQuiz.filter(
      (quiz) => quiz._id === params.quizId,
    );
    if (quizMatchId.length === 0) {
      history.push("/admin");
    } else {
      setQuiz(quizMatchId[0]);
    }
  }, [listQuiz]);

  useEffect(() => {
    if (listQuiz.length === 0) {
      dispatch(getQuizzes());
    }
  }, []);

  // function edit question
  const openEditQuestion = (question, index) => {
    setQuestionEditing({ ...question, answers: question.answers });
    setIndexQuestionEditing(index + 1);
  };

  const changeCorrectAnswer = (newCorrectAnswer) => {
    const newCorrectAnswerId = newCorrectAnswer.id;
    setQuestionEditing({ ...questionEditing, correct_answer: newCorrectAnswerId });
  };

  const addNewAnswerToQuestion = (newAnswer) => {
    const { answers } = questionEditing;
    answers.push(newAnswer);
    return setQuestionEditing({ ...questionEditing, answers });
  };

  const deleteAnswerToQuestion = (id) => {
    const { answers } = questionEditing;
    const newAnswers = answers.filter((answer) => answer.id !== id);
    setQuestionEditing({ ...questionEditing, answers: newAnswers });
  };

  const handleContentToQuestionEditing = (content) => {
    setQuestionEditing({ ...questionEditing, content });
  };

  const updateQuestion = (questionUpdated) => {
    const { id } = questionUpdated;
    const { questions } = quiz;
    const newListQuestion = questions.map((question) => {
      if (question.id === id) {
        return questionUpdated;
      }
      return question;
    });
    setQuiz({ ...quiz, questions: newListQuestion });
    return setQuestionEditing([]);
  };

  const clickOpenPopupNewQuestion = () => {
    setToggleNewQuestionPopup(!toggleNewQuestionPopup);
  };

  const changeAnswerQuestionEditing = (idAnswer, newContent) => {
    const { answers } = questionEditing;
    const newAnswers = answers.map((answer) => {
      let { content } = answer;
      if (answer.id === idAnswer) {
        content = newContent;
      }
      return { ...answer, content };
    });

    setQuestionEditing({ ...questionEditing, answers: newAnswers });
  };

  const closeQuestionEditing = () => {
    return setQuestionEditing([]);
  };


  // function insert question
  const insertQuestion = (newQuestion) => {
    const { questions } = quiz;
    questions.push(newQuestion);
    setQuiz({ ...quiz, questions });
  };

  // function delete question
  const deleteQuestionWithId = (idQuestion, indexQuestion) => {
    let { questions } = quiz;
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
        return setQuiz({ ...quiz, questions });
      }
    });
  };

  // function update quiz
  const upDateQUiz = () => {
    const payload = {
      id: params.quizId,
      data: quiz,
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
      {quiz ? (
        <>
          <div className="text-2xl font-bold">
            {`Quiz Name : ${quiz.category}`}
          </div>
          <div className="flex pt-[30px] justify-between">
            <div className="side-bar-question">
              {quiz.questions.map((question, index) => {
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
            <div className="list-question px-[20px] text-[18px] py-10 bg-[#f1f1f1]">
              {quiz.questions.map((question, index) => {
                const correctAnswerId = question.correct_answer;
                return (
                  <Question
                    question={question}
                    correctAnswerId={correctAnswerId}
                    index={index}
                    key={question.id}
                    deleteQuestionWithId={deleteQuestionWithId}
                  />
                );
              })}
            </div>
            <div className="edit-add-form w-[30%]">
              <QuestionToEdit
                questionEditing={questionEditing}
                indexQuestionEditing={indexQuestionEditing}
                updateQuestion={updateQuestion}
                changeCorrectAnswer={changeCorrectAnswer}
                deleteAnswerToQuestion={deleteAnswerToQuestion}
                addNewAnswerToQuestion={addNewAnswerToQuestion}
                handleContentToQuestionEditing={handleContentToQuestionEditing}
                closeQuestionEditing={closeQuestionEditing}
                changeAnswerQuestionEditing={changeAnswerQuestionEditing}
              />
              <div className="text-right">
                <button
                  onClick={clickOpenPopupNewQuestion}
                  className={`my-10 py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 rounded-[5px] hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${toggleNewQuestionPopup && "bg-[red]"}`}
                >
                  {toggleNewQuestionPopup ? "Close" : "Add question"}
                </button>
              </div>
              { toggleNewQuestionPopup
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
