import React, { useState } from "react";
import {
  RiDeleteBin6Line,
  RiEdit2Fill,
  RiAddBoxLine,
} from "react-icons/ri";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";
import Answer from "@pages/AdminPage/Quiz/Component/Question/Answer";
import {
  IDEA, checkDuplicateAnswer, isBlank,
  checkElementEmpty, triggerAlert,
} from "@utils";
import {
  DELETE_CORRECT_ANSWER_ALERT_MESSAGE,
  DUPLICATE_ANSWER_ALERT_MESSAGE,
  MIN_ANSWER_PER_QUESTION_ALERT_MESSAGE,
  REQUIRE_CORRECT_ANSWER_ALERT_MESSAGE,
  BLANK_CONTENT_ALERT_MESSAGE,
  MIN_ANSWER_PER_QUESTION,
  MAX_ANSWER_PER_QUESTION,
} from "@utils/constant";

export default function Question(props) {
  const {
    question,
    index,
    newQuestion,
    deleteQuestionWithId,
    updateQuestionToQuiz,
    toggleEditQuestion,
  } = props;

  const [defaultQuestion, setDefaultQuestion] = useState(
    { ...question, answers: [...question.answers] },
  );
  const [isChange, setIsChange] = useState(false);
  const [isEditQuestion, setIsEditQuestion] = useState(false);
  const [isNewQuestion, setNewQuestion] = useState(newQuestion);

  const selectCorrectAnswer = (id) => {
    toggleEditQuestion(question.id, true);
    setIsChange(true);
    setDefaultQuestion({ ...defaultQuestion, correct_answer: id });
  };

  // validate form
  const validationQuestion = (question) => {
    let isValid = true;
    const { content, answers, correct_answer } = question;

    if (isBlank(content) || checkElementEmpty(defaultQuestion.answers)) {
      Swal.fire(BLANK_CONTENT_ALERT_MESSAGE);
      isValid = false;
    }

    if (checkDuplicateAnswer(answers)) {
      isValid = false;
      Swal.fire(DUPLICATE_ANSWER_ALERT_MESSAGE);
    }

    if (!correct_answer) {
      isValid = false;
      Swal.fire(REQUIRE_CORRECT_ANSWER_ALERT_MESSAGE);
    }

    return isValid;
  };

  const updateQuestion = () => {
    if (validationQuestion(defaultQuestion)) {
      const {
        id, answers, correct_answer, content,
      } = defaultQuestion;
      updateQuestionToQuiz({
        id, answers, correct_answer, content,
      });
      toggleEditQuestion(question.id, false);
      setIsChange(null);
      setIsEditQuestion(false);
      setNewQuestion(false);
    }
  };

  const cancelUpdateQuestion = () => {
    if (validationQuestion(defaultQuestion)) {
      setIsChange(null);
      const {
        id, answers, correct_answer, content,
      } = question;
      setDefaultQuestion({
        id, answers, correct_answer, content,
      });
      toggleEditQuestion(question.id, false);
      setIsEditQuestion(false);
      setNewQuestion(false);
    }
  };

  const deleteAnswer = (id, isCorrectAnswer) => {
    const { answers } = defaultQuestion;
    if (isCorrectAnswer) {
      return Swal.fire(DELETE_CORRECT_ANSWER_ALERT_MESSAGE);
    }
    if (answers.length <= MIN_ANSWER_PER_QUESTION) {
      return Swal.fire(MIN_ANSWER_PER_QUESTION_ALERT_MESSAGE);
    }
    // delete success
    toggleEditQuestion(question.id, true);
    triggerAlert("Do you want to delete answer ?").then((result) => {
      if (result.isConfirmed) {
        setIsChange(true);
        const newAnswers = answers.filter((answer) => answer.id !== id);
        setDefaultQuestion({ ...defaultQuestion, answers: newAnswers });
      }
    });
  };

  const editQuestion = () => {
    toggleEditQuestion(question.id, true);
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
      content: "",
    };

    const { answers } = defaultQuestion;
    answers.push(newAnswer);
    setDefaultQuestion({ ...defaultQuestion, answers });
  };

  return (
    <div className="mb-[20px] px-5 bg-[white] p-4">
      <div className="flex">
        <div className="font-bold text-[20px]">{`Q.${index + 1}`}</div>
        <RiDeleteBin6Line className="mt-[8px] text-[16px] mx-2 text-danger-color cursor-pointer" onClick={() => deleteQuestionWithId(question.id, index)} />
        <RiEdit2Fill className="mt-[8px] text-[16px] text-main-color cursor-pointer" onClick={editQuestion} />
        {defaultQuestion.answers.length < MAX_ANSWER_PER_QUESTION && <RiAddBoxLine className="mt-[8px] mx-2 text-[16px] text-[#6dbfb8] cursor-pointer" onClick={addNewAnswer} />}
      </div>
      <div className="mx-5 px-5 text-left">
        <div className="mb-[10px]">
          {!isEditQuestion && !isNewQuestion ? defaultQuestion.content
            : <textarea value={defaultQuestion.content} rows={1} placeholder="Question ..." className="px-3 w-full p-1 border border-1 border-[#111111]" onChange={handleQuestion} />}
        </div>
        <div className="max-w-1/2 w-1/2 flex justify-between flex-wrap ">
          {(defaultQuestion && defaultQuestion.answers)
            .map((answer, index) => {
              const { id } = answer;
              const isCorrectAnswer = defaultQuestion.correct_answer === id;
              return (
                <Answer
                  key={id}
                  question={defaultQuestion}
                  answer={answer}
                  index={index}
                  IDEA={IDEA}
                  isCorrectAnswer={isCorrectAnswer}
                  isEditQuestion={isEditQuestion}
                  isNewQuestion={isNewQuestion}
                  deleteAnswer={deleteAnswer}
                  handleAnswer={handleAnswer}
                  selectCorrectAnswer={selectCorrectAnswer}
                />
              );
            })}
        </div>
        {(isChange || isNewQuestion) && (
        <div className="text-right text-[14px] bg-[#f5f5f5] mt-4 px-2 py-[5px]">
          <button className="mx-3 border border-1 px-3  border-[2px] hover:text-danger-color" onClick={cancelUpdateQuestion}>
            Cancel
          </button>
          <button className="border border-1 px-3 border-[2px] hover:text-main-color" onClick={updateQuestion}>
            Update
          </button>
        </div>
        )}
      </div>
    </div>
  );
}

