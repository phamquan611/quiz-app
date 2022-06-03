import React from "react";
import {
  RiDeleteBin6Line,
} from "react-icons/ri";

export default function Answer(props) {
  const {
    isEditQuestion, isNewQuestion, IDEA, index,
    answer, handleAnswer, question, selectCorrectAnswer, deleteAnswer,
  } = props;
  const isCorrectAnswer = question.correct_answer === answer.id;
  return (
    <div
      className="w-full flex justify-between mt-2"
    >
      <div className={`${
        isCorrectAnswer && "text-danger-color font-bold"
      } `}
      >
        {`${IDEA[index]} . `}
        {isEditQuestion || isNewQuestion ? (
          <input
            value={answer.content}
            onChange={(e) => handleAnswer(e, answer.id)}
            className="px-1 border border-[2px] border-[#111111] rounded-[5px] w-auto"
            placeholder="Answer ..."
          />
        ) : answer.content}
      </div>
      <div className="flex mt-2">
        <input
          type="radio"
          name={`${question.id}checkBox`}
          onChange={() => selectCorrectAnswer(answer.id)}
          className="mt-[2px] mr-2 cursor-pointer"
          value={answer.id}
          checked={isCorrectAnswer}
        />
        <RiDeleteBin6Line className=" text-danger-color cursor-pointer" onClick={() => deleteAnswer(answer.id, isCorrectAnswer)} />
      </div>
    </div>
  );
}
