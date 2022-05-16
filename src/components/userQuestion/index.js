import React from "react";

function Question() {
  return (
    // TO DO : map questions and option answer
    <div className="w-[49%] h-96">
      <div className="bg-white rounded-lg shadow-2xl py-5 text-center text-xl mb-[20px] border-2  border-sky-500">
        <p className="pb-[10px]">Question 1/10 </p>
        <p className="pb-[10px]">Why not check out our top projects and curated galleries?</p>
      </div>
      <div className="flex justify-between flex-wrap">
        <button className="bg-white rounded-lg shadow-2xl text-xl mb-[20px] py-[20px] w-[48%] m-[auto] border-2  border-sky-500">Option1</button>
        <button className="bg-white rounded-lg shadow-2xl text-xl mb-[20px] py-[20px] w-[48%] m-[auto] border-2  border-sky-500">Option2</button>
        <button className="bg-white rounded-lg shadow-2xl text-xl mb-[20px] py-[20px] w-[48%] m-[auto] border-2  border-sky-500">Option3</button>
        <button className="bg-white rounded-lg shadow-2xl text-xl mb-[20px] py-[20px] w-[48%] m-[auto] border-2  border-sky-500">Option4</button>
      </div>
    </div>
  );
}
export default Question;
