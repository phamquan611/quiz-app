import React, { useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import {AiOutlineClose} from "react-icons/ai"
const CheckQuestions = ({ questions, currentQuestion, setCurrentQuestion, currentPick, setCurrentPick, handleSelected}) => {
  const handleCheck = (event) => {
    setCurrentQuestion(event);
    setCurrentPick(event)
    console.log(questions[event].question);
    debugger
    console.log(questions[currentPick].handleSelected);
  };
//   console.log(questions[currentPick].isSelected);
//   console.log(questions);
  return (
    <>
      <div className="flex justify-center mb-5">
        <div >
          <button className="bg-violet-500 p-3 m-2 m-auto rounded-lg flex items-center"  onClick={() => handleCheck(0)}>Question 1
          {questions[0].isSelected == null ? <AiOutlineClose className="bg-white rounded-full ml-1.5 text-red-500"/> : <FcCheckmark className="bg-white rounded-full ml-1.5"/>}
          </button>
        </div>
        <div >
          <button className="bg-violet-500 p-3 m-2 m-auto rounded-lg flex items-center"  onClick={() => handleCheck(1)}>Question 2
          {questions[1].isSelected == null ? <AiOutlineClose className="bg-white rounded-full ml-1.5 text-red-500"/> : <FcCheckmark className="bg-white rounded-full ml-1.5"/>}
          </button>
        </div>
        <div >
          <button className="bg-violet-500 p-3 m-2 m-auto rounded-lg flex items-center"  onClick={() => handleCheck(2)}>Question 3
          {questions[2].isSelected == null ? <AiOutlineClose className="bg-white rounded-full ml-1.5 text-red-500"/> : <FcCheckmark className="bg-white rounded-full ml-1.5"/>}
          
          </button>
        </div>
        <div >
          <button className="bg-violet-500 p-3 m-2 m-auto rounded-lg flex items-center"  onClick={() => handleCheck(3)}>Question 4
          {questions[3].isSelected == null ? <AiOutlineClose className="bg-white rounded-full ml-1.5 text-red-500"/> : <FcCheckmark className="bg-white rounded-full ml-1.5"/>}
          
          </button>
        </div>
        <div >
          <button className="bg-violet-500 p-3 m-2 m-auto rounded-lg flex items-center"  onClick={() => handleCheck(4)}>Question 5
          {questions[4].isSelected == null ? <AiOutlineClose className="bg-white rounded-full ml-1.5 text-red-500"/> : <FcCheckmark className="bg-white rounded-full ml-1.5"/>}
          
          </button>
        </div>
        <div >
          <button className="bg-violet-500 p-3 m-2 m-auto rounded-lg flex items-center"  onClick={() => handleCheck(5)}>Question 6
          {questions[5].isSelected == null ? <AiOutlineClose className="bg-white rounded-full ml-1.5 text-red-500"/> : <FcCheckmark className="bg-white rounded-full ml-1.5"/>}
          
          </button>
        </div>
        <div >
          <button className="bg-violet-500 p-3 m-2 m-auto rounded-lg flex items-center"  onClick={() => handleCheck(6)}>Question 7
          {questions[6].isSelected == null ? <AiOutlineClose className="bg-white rounded-full ml-1.5 text-red-500"/> : <FcCheckmark className="bg-white rounded-full ml-1.5"/>}
          
          </button>
        </div>
        <div >
          <button className="bg-violet-500 p-3 m-2 m-auto rounded-lg flex items-center"  onClick={() => handleCheck(7)}>Question 8
          {questions[7].isSelected == null ? <AiOutlineClose className="bg-white rounded-full ml-1.5 text-red-500"/> : <FcCheckmark className="bg-white rounded-full ml-1.5"/>}
          
          </button>
        </div>
        <div >
          <button className="bg-violet-500 p-3 m-2 m-auto rounded-lg flex items-center"  onClick={() => handleCheck(8)}>Question 9
          {questions[8].isSelected == null ? <AiOutlineClose className="bg-white rounded-full ml-1.5 text-red-500"/> : <FcCheckmark className="bg-white rounded-full ml-1.5"/>}
          
          </button>
        </div>
        <div >
          <button className="bg-violet-500 p-3 m-2 m-auto rounded-lg flex items-center"  onClick={() => handleCheck(9)}>Question 10
          {questions[9].isSelected == null ? <AiOutlineClose className="bg-white rounded-full ml-1.5 text-red-500"/> : <FcCheckmark className="bg-white rounded-full ml-1.5"/>}
          
          </button>
        </div>
      </div>
    </>
  );
};
export default CheckQuestions;
