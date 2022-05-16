import React from "react";
import { BsLightbulb } from "react-icons/bs";

function CheckQuestion() {
  return (
    // TO DO
    <div className=" w-[49%] h-96 flex flex-col ">
      <div className="flex justify-evenly rounded-lg shadow-2xl  border-sky-500 border-2 bg-white p-[20px]">
        <button className="bg-rose-600 py-5 px-10 rounded-xl text-[20px]">
          Prev
        </button>
        <button className="bg-green-600 py-5 px-10 rounded-xl text-[20px]">
          Next
        </button>
      </div>
      <div className=" rounded-lg shadow-2xl  border-sky-500 border-2 bg-white p-[20px] flex justify-center mt-[30px]">
        <i>
          <BsLightbulb className="ml-[10px] w-[40px] h-[40px] relative" />
          <p className="not-italic absolute bottom-[475px] ml-[25px]">1</p>
        </i>
        <i>
          <BsLightbulb className="ml-[10px] w-[40px] h-[40px]" />
        </i>
        <i>
          <BsLightbulb className="ml-[10px] w-[40px] h-[40px]" />
        </i>
        <i>
          <BsLightbulb className="ml-[10px] w-[40px] h-[40px]" />
        </i>
        <i>
          <BsLightbulb className="ml-[10px] w-[40px] h-[40px]" />
        </i>
        <i>
          <BsLightbulb className="ml-[10px] w-[40px] h-[40px]" />
        </i>
        <i>
          <BsLightbulb className="ml-[10px] w-[40px] h-[40px]" />
        </i>
      </div>
    </div>
  );
}
export default CheckQuestion;
