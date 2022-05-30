import React, { useState, useRef } from "react";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
import { IDEA, checkEmptyString } from "@utils";
import {
  RiDeleteBin6Line,
  // RiAddCircleFill,
  RiMessage2Line,
  // RiAddLine,
} from "react-icons/ri";
import {
// NUM_MIN_QUESTION_A_QUIZ,
  MAX_ANSWER_PER_QUESTION,
  MAX_ANSWER_PER_QUESTION_ALERT,
  DELETE_CORRECT_ANSWER_ALERT,
  MIN_ANSWER_PER_QUESTION,
  MIN_ANSWER_PER_QUESTION_ALERT,
  // NUM_CORRECT_ANSWER_A_QUESTION,
  CHOOSE_CORRECT_ANSWER_INDEX,
} from "@utils/constant";

export default function NewQuestion(props) {
  const { insertQuestion, clickOpenPopupNewQuestion } = props;
  const [newQuestionContent, setNewQuestionContent] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isOpenFormNewAnswer, setIsOpenPopupNewQuestion] = useState(false);
  const [newAnswer, setNewAnswer] = useState({ content: undefined, id: null });
  const chooseCorrectAnswer = useRef();
  const [correctAnswerId, setCorrectAnswerId] = useState(undefined);
  const [editContentAnswerId, setEditContentAnswerId] = useState(null);// change content
  const [newContentAnswer, setNewContentAnswer] = useState(null);
  const [disableBtn, setDisableBtn] = useState(false);
  const handelNewQuestionContent = (e) => {
    return setNewQuestionContent(e.target.value);
  };

  // const addAnswers = () => {
  // };
  const clickOpenFormNewAnswer = () => {
    const totalAnswer = answers.length;
    if (totalAnswer >= MAX_ANSWER_PER_QUESTION) {
      return Swal.fire(MAX_ANSWER_PER_QUESTION_ALERT);
    }
    setDisableBtn(true);
    return setIsOpenPopupNewQuestion(true);
  };

  const handleNewAnswer = (e) => {
    let { id } = newAnswer;
    if (!id) {
      id = nanoid();
    }
    setNewAnswer({ ...newAnswer, content: e.target.value, id });
  };

  const clickConfirmAddAnswer = () => {
    const isCorrectAnswer = chooseCorrectAnswer?.current?.checked;
    if (isCorrectAnswer) {
      const id = nanoid();
      setNewAnswer({ ...newAnswer, id });
    }
    const { content } = newAnswer;
    if (!content && checkEmptyString(content)) {
      return Swal.fire("You can not blank content answer.");
    }
    if (!correctAnswerId) {
      const isChooseCorrectAnswer = chooseCorrectAnswer.current.checked;
      if (isChooseCorrectAnswer) {
        setCorrectAnswerId(newAnswer.id);
      }
    }
    setAnswers([...answers, newAnswer]);
    setNewAnswer({ content: "", id: null });
    setIsOpenPopupNewQuestion(false);
    setDisableBtn(false);
  };

  // function edit question

  const chooseCorrectAnswerToNewQuestion = (e) => {
    const idCorrectAnswer = e.target.id;
    const indexNewCorrectAnswer = parseInt(idCorrectAnswer.replace(CHOOSE_CORRECT_ANSWER_INDEX, ""), 10);
    const newCorrectAnswer = answers[indexNewCorrectAnswer];
    const { id } = newCorrectAnswer;
    setCorrectAnswerId(id);
  };

  const deleteAnswerToNewQuestion = (idAnswer, isCorrectAnswer) => {
    if (isCorrectAnswer) {
      return Swal.fire(DELETE_CORRECT_ANSWER_ALERT);
    }
    if (answers.length <= MIN_ANSWER_PER_QUESTION) {
      return Swal.fire(MIN_ANSWER_PER_QUESTION_ALERT);
    }

    // start delete
    const newAnswers = answers.filter((answer) => answer.id !== idAnswer);
    return Swal.fire({
      title: "Do you want to delete answer ?",
      showDenyButton: true,
      confirmButtonText: "YES",
      denyButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        return setAnswers(newAnswers);
      }
    });
  };

  const editContentAnswer = (idAnswer) => {
    if (newContentAnswer) return;
    setEditContentAnswerId(idAnswer);
  };

  const changeAnswer = (e) => {
    setNewContentAnswer(e.target.value);
  };

  const clickChangeContent = () => {
    const newAnswers = answers.map((answer) => {
      const { id } = answer;
      let { content } = answer;
      if (id === editContentAnswerId) {
        content = newContentAnswer;
      }
      return { ...answer, content };
    });
    setAnswers(newAnswers);
    setNewContentAnswer(null);
    setEditContentAnswerId(null);
  };

  // update quiz
  const insertQuestionToQuiz = () => {
    if (newQuestionContent === "" && checkEmptyString(newQuestionContent)) return Swal.fire("Yoy don't have question text . ");
    if (!correctAnswerId) return Swal.fire("A question must have a minimum 1 correct answer .");
    const id = nanoid();
    const newQuestion = {
      id,
      content: newQuestionContent,
      answers,
      correct_answer: correctAnswerId,
    };
    return Swal.fire({
      title: "Do you want insert question ?",
      showDenyButton: true,
      confirmButtonText: "YES",
      denyButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        insertQuestion(newQuestion);
        return clickOpenPopupNewQuestion(false);
      }
    });
  };
  // const checkClosePopup = (answers, newQuestionContent) => {
  //   return checkClosePopup(answers, newQuestionContent);
  // };

  return (
    <div className="w-full bg-[#f5f5f5] pb-10 pt-5 px-5">
      {answers.length >= MIN_ANSWER_PER_QUESTION && (
      <div className="text-right">
        <button className="my-5 p-3 text-[12px] font-bold bg-[red] rounded-[3px] text-[white]" onClick={insertQuestionToQuiz}>
          Insert question
        </button>
      </div>
      )}
      <div>
        <label htmlFor="newQuestionContent" className="font-bold">Question content : </label>
        <input type="text" id="newQuestionContent" name="newQuestionContent" value={newQuestionContent} onChange={handelNewQuestionContent} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
      </div>
      <div>
        {answers.length > 0 && answers.map((answer, index) => {
          const { id } = answer;
          const isCorrectAnswer = id === correctAnswerId;
          return (
            <div
              className="flex justify-between text-[18px]"
              key={answer.id}
            >
              {editContentAnswerId !== answer.id ? (
                <div className={`flex answer-default ${isCorrectAnswer && "text-[red]"}`}>
                  <b>{`${IDEA[index]} : ${answer.content}`}</b>
                </div>
              )
                : (
                  <div className="flex w-auto">
                    <label htmlFor="" className={`flex answer-default ${isCorrectAnswer && "text-[red]"}`}>{`${IDEA[index]} : `}</label>
                    <input type="text" value={newContentAnswer || answer.content} className="w-[90%] border rounded-[5px]" onChange={changeAnswer} />
                  </div>
                )}
              <div className="flex answer-edit pt-[5px] pr-[20px]">
                <input
                  type="radio"
                  name="checkCorrectAnswerForIndex"
                  id={`${CHOOSE_CORRECT_ANSWER_INDEX}${index}`}
                  className="mt-2 mr-2"
                  onChange={chooseCorrectAnswerToNewQuestion}
                />
                <RiMessage2Line
                  onClick={() => editContentAnswer(id)}
                  className="text-[blue] mr-[10px] cursor-pointer mt-1"
                />
                <RiDeleteBin6Line
                  className="text-[red] cursor-pointer mt-1"
                  onClick={() => deleteAnswerToNewQuestion(id, isCorrectAnswer)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between">
        {answers.length < MAX_ANSWER_PER_QUESTION && (
        <button className={`my-5 text-[12px] p-2 font-bold bg-[blue] rounded-[3px] text-[white] ${disableBtn && "opacity-20"}`} onClick={clickOpenFormNewAnswer} disabled={disableBtn}>
          Add new answer
        </button>
        )}
        {newContentAnswer && (
        <button className="my-5 text-[12px] p-2 font-bold bg-[red] rounded-[3px] text-[white]" onClick={clickChangeContent}>
          Save Change
        </button>
        )}
      </div>
      {isOpenFormNewAnswer && (
        <div>
          <div className="form-new-answer flex justify-between">
            <div className="">
              <label htmlFor="newAnswer">Answer content :</label>
              <input type="text" value={newAnswer.content || ""} onChange={handleNewAnswer} className="flex-1 w-full mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500" />
            </div>
            {!correctAnswerId && (
            <div className="flex">
              <input type="checkbox" ref={chooseCorrectAnswer} name="chooseCorrectAnswer" className="mt-1 mr-2" />
              <label htmlFor="chooseCorrectAnswer" className="font-bold">correct</label>
            </div>
            )}
          </div>
          <div className="div-btn-add-answer " onClick={clickConfirmAddAnswer}>
            <button className="my-5 p-3 text-[12px] font-bold bg-[brown] rounded-[3px] text-[white]">
              Confirm add answer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
