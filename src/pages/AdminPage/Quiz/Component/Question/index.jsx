import React, { useState } from "react";
import {
  RiDeleteBin6Line,
  RiEdit2Fill,
  RiAddBoxLine,
} from "react-icons/ri";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";
import { IDEA, checkDuplicateAnswer } from "@utils";
import {
  DELETE_CORRECT_ANSWER_ALERT,
  MIN_ANSWER_PER_QUESTION,
  MIN_ANSWER_PER_QUESTION_ALERT,
  MAX_ANSWER_PER_QUESTION,
  DUPLICATE_ANSWER_ALERT,
} from "@utils/constant";

export default function Question(props) {
  const {
    question,
    index,
    deleteQuestionWithId,
    updateQuestionToQuiz,
    newQuestion,
  } = props;

  const [defaultQuestion, setDefaultQuestion] = useState(
    { ...question, answers: [...question.answers] },
  );
  const [isChange, setIsChange] = useState(false);
  const [isEditQuestion, setIsEditQuestion] = useState(false);
  const [isNewQuestion, setNewQuestion] = useState(newQuestion);

  const selectCorrectAnswer = (id) => {
    setIsChange(true);
    setDefaultQuestion({ ...defaultQuestion, correct_answer: id });
  };

  const updateQuestion = () => {
    const {
      id, answers, correct_answer, content,
    } = defaultQuestion;
    if (checkDuplicateAnswer(answers)) {
      return Swal.fire(DUPLICATE_ANSWER_ALERT);
    }
    updateQuestionToQuiz({
      id, answers, correct_answer, content,
    });
    setIsChange(null);
    setIsEditQuestion(false);
    setNewQuestion(false);
  };

  const cancelUpdateQuestion = () => {
    setIsChange(null);
    const {
      id, answers, correct_answer, content,
    } = defaultQuestion;
    setDefaultQuestion({
      id, answers, correct_answer, content,
    });
    setIsEditQuestion(false);
    setNewQuestion(false);
  };

  const deleteAnswer = (id, isCorrectAnswer) => {
    const { answers } = defaultQuestion;
    if (isCorrectAnswer) {
      return Swal.fire(DELETE_CORRECT_ANSWER_ALERT);
    }
    if (answers.length <= MIN_ANSWER_PER_QUESTION) {
      return Swal.fire(MIN_ANSWER_PER_QUESTION_ALERT);
    }
    // delete success
    Swal.fire({
      title: "Do you want to delete answer ?",
      showDenyButton: true,
      confirmButtonText: "YES",
      denyButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsChange(true);
        const newAnswers = answers.filter((answer) => answer.id !== id);
        setDefaultQuestion({ ...defaultQuestion, answers: newAnswers });
      }
    });
  };

  const editQuestion = () => {
    setIsChange(true);
    setIsEditQuestion(true);
  };

  const handleQuestion = (e) => {
    defaultQuestion.content = e.target.value;
    setDefaultQuestion({ ...defaultQuestion });
  };
  const handleAnswer = (e, id) => {
    const { answers } = defaultQuestion;
    const newAnswers = answers.map((answer) => {
      if (answer.id === id) {
        return { ...answer, content: e.target.value };
      }
      return answer;
    });

    setDefaultQuestion({ ...defaultQuestion, answers: newAnswers });
  };

  const addNewAnswer = () => {
    const id = nanoid();
    const newAnswer = {
      id,
      content: "Edit me",
    };

    const { answers } = defaultQuestion;
    answers.push(newAnswer);
    setDefaultQuestion({ ...defaultQuestion, answers });
  };

  return (
    <div className="mb-[20px] px-5 bg-[white] p-4">
      <div className="flex">
        <div className="font-bold text-[20px]">{`Q.${index + 1}`}</div>
        <RiDeleteBin6Line className="mt-[8px] text-[16px] mx-2 text-[red] cursor-pointer" onClick={() => deleteQuestionWithId(question.id, index)} />
        <RiEdit2Fill className="mt-[8px] text-[16px] text-[blue] cursor-pointer" onClick={editQuestion} />
        {defaultQuestion.answers.length < MAX_ANSWER_PER_QUESTION && <RiAddBoxLine className="mt-[8px] mx-2 text-[16px] text-[#6dbfb8] cursor-pointer" onClick={addNewAnswer} />}
      </div>
      <div className="mx-5 px-5 text-left">
        <div className="mb-[10px]">
          {!isEditQuestion && !isNewQuestion ? defaultQuestion.content
            : <textarea value={defaultQuestion.content} rows={1} className="w-full p-1 border border-1 border-[#111111]" onChange={handleQuestion} />}
        </div>
        <div className="max-w-1/2 w-1/2 flex justify-between flex-wrap ">
          {(defaultQuestion && defaultQuestion.answers)
            .map((answer, index) => {
              const { id } = answer;
              const isCorrectAnswer = defaultQuestion.correct_answer === id;
              return (
                <div
                  className="w-3/4 flex justify-between mt-2"
                  key={id}
                >
                  <div className={`${
                    isCorrectAnswer && "text-[red] font-bold"
                  } `}
                  >
                    {`${IDEA[index]} . `}
                    {isEditQuestion || isNewQuestion ? (
                      <input
                        value={answer.content}
                        onChange={(e) => handleAnswer(e, id)}
                        className="px-1 border border-[2px] border-[#111111] rounded-[5px] w-auto"
                      />
                    ) : answer.content}
                  </div>
                  <div className="flex mt-2">
                    <input
                      type="radio"
                      name={`${question.id}checkBox`}
                      onChange={() => selectCorrectAnswer(id)}
                      className="mt-[2px] mr-2 cursor-pointer"
                      value={id}
                      checked={isCorrectAnswer}
                    />
                    <RiDeleteBin6Line className=" text-[red] cursor-pointer" onClick={() => deleteAnswer(id, isCorrectAnswer)} />
                  </div>
                </div>
              );
            })}
        </div>
        {(isChange || isNewQuestion) && (
        <div className="text-right text-[14px] bg-[#f5f5f5] mt-4 px-2 py-[5px]">
          <button className="mx-3 border border-1 px-3  border-[2px] hover:text-[red]" onClick={cancelUpdateQuestion}>
            Cancel
          </button>
          <button className="border border-1 px-3 border-[2px] hover:text-[green]" onClick={updateQuestion}>
            Update
          </button>
        </div>
        )}
      </div>
    </div>
  );
}

