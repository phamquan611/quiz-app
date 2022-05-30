import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import QuestionToEdit from "@pages/AdminPage/Quiz/Component/QuestionEditing";
import NewQuestion from "@pages/AdminPage/Quiz/Component/NewQuestion";
import { postQuiz } from "@actions/quiz.action";
import { IDEA, formTimeChallenge, convertMinuteToMilliseconds } from "@utils";
import {
  NUM_MIN_QUESTION_A_QUIZ,
// MAX_ANSWER_A_QUESTION,
// ALERT_MAX_ANSWER_A_QUESTION,
// ALERT_DELETE_CORRECT_ANSWER,
// MIN_ANSWER_A_QUESTION,
// ALERT_MIN_ANSWER_A_QUESTION,
// NUM_CORRECT_ANSWER_A_QUESTION,
// CHOOSE_CORRECT_ANSWER_INDEX,
} from "@utils/constant";

export default function CreateQuiz() {
  const dispatch = useDispatch();
  const [newQuiz, setNewQuiz] = useState({ category: "", questions: [] });
  const [questionToEdit, setQuestionToEdit] = useState([]);
  const [indexQuestionToEdit, setIndexQuestionToEdit] = useState(null);
  const [openPopupNewQuestion, setOpenPopupNewQuestion] = useState(false);
  const timeChallenge = useRef();

  // useEffect(() => {
  //   Swal.fire("Add quiz success .").then((result) => {
  //     if (result.isConfirmed) {
  //       history.push("/admin");
  //     }
  //   });
  // }, [listQuiz.length]);

  // function edit question
  const openEditQuestion = (question, index) => {
    setQuestionToEdit({ ...question, answers: question.answers });
    setIndexQuestionToEdit(index + 1);
  };

  const changeCorrectAnswer = (newCorrectAnswer) => {
    const newCorrectAnswerId = newCorrectAnswer.id;
    setQuestionToEdit({ ...questionToEdit, correct_answer: newCorrectAnswerId });
  };

  const handleChangeTimeChallenge = () => {

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
    const { questions } = newQuiz;
    const newListQuestion = questions.map((question) => {
      if (question.id === id) {
        return questionUpdated;
      }
      return question;
    });
    setNewQuiz({ ...newQuiz, questions: newListQuestion });
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
    const { questions } = newQuiz;
    questions.push(newQuestion);
    setNewQuiz({ ...newQuiz, questions });
  };

  // function delete question
  const deleteQuestionWithId = (idQuestion, indexQuestion) => {
    let { questions } = newQuiz;
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
        return setNewQuiz({ ...newQuiz, questions });
      }
    });
  };

  const handleCategory = (e) => {
    setNewQuiz({ ...newQuiz, category: e.target.value });
  };
  // function update quiz
  const clickPostQuiz = () => {
    if (!newQuiz.category) {
      return Swal.fire("You must add quiz category .");
    }
    const timeChallengeChoose = timeChallenge.current.value;
    return dispatch(postQuiz({ ...newQuiz, timeChallenge: timeChallengeChoose }));
  };

  return (
    <div className="p-[50px]">
      <div>
        <div>
          <div className="text-2xl w-1/4  font-bold flex ">
            <label htmlFor="category" className="mr-[20px]">Category :</label>
            <input type="text" placeholder="Category" value={newQuiz.category} onChange={handleCategory} className="mt-1 flex-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" />
          </div>
          <div className=" w-1/4 my-[20px] flex">
            <label htmlFor="timeChallenge" className="mr-[20px]">
              <b className="font-bold ">Time challenge : </b>
            </label>
            <select
              name="timeChallenge"
              id="timeChallenge"
              className="flex-1 border border-2 border-[black] rounded-[5px] px-[10px] py-[7px] appearance-none"
              onChange={handleChangeTimeChallenge}
              ref={timeChallenge}
            >
              {formTimeChallenge.map((option) => {
                return (
                  <option
                    value={convertMinuteToMilliseconds(option.value)}
                    key={option.value}
                  >
                    {option.text}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div>
          {!openPopupNewQuestion && (
          <button
            onClick={clickOpenPopupNewQuestion}
            className={`my-5 py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 rounded-[5px] hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${openPopupNewQuestion ? "bg-[red]" : ""}`}
          >
            Create Question
          </button>
          )}
        </div>
      </div>

      {newQuiz.questions.length > 0 && (
      <div className="text-[red]">
        Click to edit question.
      </div>
      )}
      <div className="flex pt-[30px] justify-between">
        <div className="side-bar-question">
          {newQuiz.questions.map((question, index) => {
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
        <div className="list-question w-[60%] pl-[20px] text-[18px]">
          {newQuiz.questions.map((question, index) => {
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
          {openPopupNewQuestion && (
          <div className="text-right">
            <button
              onClick={clickOpenPopupNewQuestion}
              className={`my-10 py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 rounded-[5px] hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${openPopupNewQuestion ? "bg-[red]" : ""}`}
            >
              Close
            </button>
          </div>
          )}
          { openPopupNewQuestion
              && (
              <NewQuestion
                insertQuestion={insertQuestion}
                clickOpenPopupNewQuestion={clickOpenPopupNewQuestion}
              />
              )}
        </div>
      </div>
      {newQuiz.questions.length >= NUM_MIN_QUESTION_A_QUIZ && (
      <div className="text-center">
        <button className="bg-[red] p-2 text-[17px] text-[#f1f1f1] rounded-[4px]" onClick={clickPostQuiz}>
          Create Quiz
        </button>
      </div>
      )}
    </div>
  );
}
