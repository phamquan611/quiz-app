import React, { useState } from "react";
import { nanoid } from "nanoid";
import {
  RiDeleteBin6Line,
  RiMessage2Line,
  RiAddLine,
} from "react-icons/ri";
import Swal from "sweetalert2";
import { IDEA } from "@utils";
import {
  MAX_ANSWER_PER_QUESTION,
  ALERT_MAX_ANSWER_PER_QUESTION,
  ALERT_DELETE_CORRECT_ANSWER,
  MIN_ANSWER_PER_QUESTION,
  ALERT_MIN_ANSWER_PER_QUESTION,
  CHOOSE_CORRECT_ANSWER_INDEX,
} from "@utils/constant";

export default function questionEditing(props) {
  const [idEditAnswer, setIdEditAnswer] = useState(null);
  const [newContentAnswer, setNewContentAnswer] = useState(null);
  const {
    questionEditing,
    updateQuestion,
    indexQuestionEditing,
    changeCorrectAnswer,
    addNewAnswerToQuestion,
    deleteAnswerToQuestion,
    handleContentToQuestionEditing,
    changeAnswerQuestionEditing,
  } = props;


  const chooseCorrectAnswerToEditQuestion = (e) => {
    const idCorrectAnswer = e.target.id;
    const indexNewCorrectAnswer = parseInt(idCorrectAnswer.replace(CHOOSE_CORRECT_ANSWER_INDEX, ""), 10);
    // const
    const { answers } = questionEditing;
    const newCorrectAnswer = answers[indexNewCorrectAnswer];
    return changeCorrectAnswer(newCorrectAnswer);
  };

  const addNewAnswer = () => {
    const { answers } = questionEditing;
    const totalAnswer = answers.length;
    if (totalAnswer >= MAX_ANSWER_PER_QUESTION) {
      return Swal.fire(ALERT_MAX_ANSWER_PER_QUESTION);
    }
    const id = nanoid();
    const newAnswer = {
      content: "Edit me",
      id,
    };
    return addNewAnswerToQuestion(newAnswer);
  };

  const deleteAnswer = (id, isCorrectAnswer) => {
    const { answers } = questionEditing;
    if (isCorrectAnswer) {
      return Swal.fire(ALERT_DELETE_CORRECT_ANSWER);
    }
    if (answers.length <= MIN_ANSWER_PER_QUESTION) {
      return Swal.fire(ALERT_MIN_ANSWER_PER_QUESTION);
    }
    // delete success
    Swal.fire({
      title: "Do you want to delete answer ?",
      showDenyButton: true,
      confirmButtonText: "YES",
      denyButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        return deleteAnswerToQuestion(id);
      }
    });
  };

  const handleContentQuestion = (e) => {
    return handleContentToQuestionEditing(e.target.value);
  };

  const editAnswerAQuestion = (idAnswer) => {
    if (idEditAnswer) return;
    setIdEditAnswer(idAnswer);
  };

  const updateToQuiz = () => {
    Swal.fire({
      title: "Do you want to update to quiz ?",
      showDenyButton: true,
      confirmButtonText: "YES",
      denyButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        return updateQuestion(questionEditing);
      }
    });
  };
  // change content answer
  const handleContentAnswer = (e) => {
    setNewContentAnswer(e.target.value);
  };

  const updateAnswer = () => {
    // const
    changeAnswerQuestionEditing(idEditAnswer, newContentAnswer);
    setIdEditAnswer(null);
    setNewContentAnswer(null);
  };

  return (
    <div>
      {Object.keys(questionEditing).length === 0 ? (
        <div className="empty-edit-question" />
      ) : (
        <div className="question-edit-form bg-[#f5f5f5] p-[20px]">
          <div className="text-right">
            <button
              className="py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75"
              type="submit"
              onClick={updateToQuiz}
            >
              Update question
            </button>
          </div>
          <div className="question-edit-index text-[20px]">
            <label htmlFor="questionEdit">{`Question ${indexQuestionEditing} :`}</label>
            <input
              type="text"
              id="questionEdit"
              name="questionEdit"
              value={questionEditing.content}
              onChange={handleContentQuestion}
              className="my-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </div>
          <div>
            {questionEditing.answers.map((answer, index) => {
              const { id } = answer;
              const isCorrectAnswer = id === questionEditing.correct_answer;
              return (
                <div
                  className="flex justify-between text-[18px]"
                  key={answer.id}
                >
                  {idEditAnswer !== id ? (
                    <div className={`flex answer-default ${isCorrectAnswer && "text-[red]"}`}>
                      <b>{`${IDEA[index]} .`}</b>
                      {` ${answer.content}`}
                    </div>
                  )
                    : (
                      <div>
                        <label htmlFor=""><b>{`${IDEA[index]} .`}</b></label>
                        <input
                          type="text"
                          value={newContentAnswer || answer.content}
                          onChange={handleContentAnswer}
                          className="border p-1 border-[black] rounded-[3px]"
                        />
                      </div>
                    )}
                  <div className="flex answer-edit pt-[5px] pr-[20px]">
                    <input
                      type="radio"
                      name="checkCorrectAnswerForIndex"
                      id={`${CHOOSE_CORRECT_ANSWER_INDEX}${index}`}
                      className="mt-2 mr-2"
                      onChange={chooseCorrectAnswerToEditQuestion}
                    />
                    <RiMessage2Line
                      className="text-[blue] mr-[10px] cursor-pointer mt-1"
                      onClick={() => editAnswerAQuestion(id)}
                    />
                    <RiDeleteBin6Line
                      className="text-[red] cursor-pointer mt-1"
                      onClick={() => deleteAnswer(id, isCorrectAnswer)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between font-bold cursor-pointer pt-[20px] text-[#f1f1f1]">
            {questionEditing.answers.length < MAX_ANSWER_PER_QUESTION && (
            <div
              onClick={addNewAnswer}
              className="flex bg-[blue]  py-2 px-[10px]"
            >
              {" Add answer "}
              <RiAddLine className="mt-1 ml-1" />
            </div>
            )}
            {newContentAnswer && (
            <div>
              <button className="bg-[red] p-2 text-[12px] text-[#f1f1f1]" onClick={updateAnswer}>
                Save Change
              </button>
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
