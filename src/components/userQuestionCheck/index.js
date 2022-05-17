import React from "react";
import { BsLightbulb } from "react-icons/bs";

function CheckQuestion(props) {
  const { questions } = props;
  return (
    // TO DO :  choose question when click and do prev and next btn question
    <div className=" w-[49%] h-96 flex flex-col ">
      <div className="flex justify-evenly rounded-lg shadow-2xl  border-sky-500 border-2 bg-white p-[20px]">
        <button className="bg-rose-600 py-5 px-10 rounded-xl text-[20px]">
          Prev
        </button>
        <button className="bg-green-600 py-5 px-10 rounded-xl text-[20px]">
          Next
        </button>
      </div>
      <div className=" rounded-lg shadow-2xl  border-sky-500 border-2 bg-white py-[20px] px-[200px] flex justify-center mt-[30px] flex-wrap">
        {questions
          && questions.map((item, index) => (
            <i>
              <BsLightbulb className="ml-[10px] w-[50px] h-[50px] relative mb-[10px]" />
              <p className="ques-item not-italic absolute  ml-[28px]">
                {index + 1}
              </p>
            </i>
          ))}
      </div>
    </div>
  );
}
export default CheckQuestion;
