import React from "react";
import {
  RiDeleteBin6Line,
  RiMessage2Line,
} from "react-icons/ri";
import { IDEA } from "@utils";

export default function Question(props) {
  const {
    question,
    correctAnswerId,
    index,
    deleteQuestionWithId,
  } = props;

  const selectCorrectAnswer = () => {

  };

  return (
    <div className="mb-[20px] bg-[white] p-4">
      <div className="flex">
        <div className="font-bold">{`Q.${index + 1}`}</div>
        <RiDeleteBin6Line className="mt-[5px] mx-2 text-[red] cursor-pointer" onClick={() => deleteQuestionWithId(question.id, index)} />
      </div>
      <div className="mx-3">
        <div className="mb-[10px]">
          {question.content}
        </div>
        <div className="w-1/2 flex justify-between flex-wrap ">
          {question.answers.map((answer, index) => {
            const isCorrectAnswer = correctAnswerId === answer.id;
            return (
              <div
                className="w-full flex justify-between"
                key={answer.id}
              >
                <div className={`${
                  isCorrectAnswer && "text-[red] font-bold"
                } `}
                >
                  {`${IDEA[index]} . ${answer.content}`}
                </div>
                <div className="flex mt-2">
                  <input
                    type="radio"
                    name="checkCorrectAnswer"
                    onChange={selectCorrectAnswer}
                    className="mt-[2px] mr-2"
                    checked={isCorrectAnswer}
                  />
                  <RiMessage2Line className="text-[#13a7e9] cursor-pointer mr-3" />
                  <RiDeleteBin6Line className=" text-[red] cursor-pointer" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

