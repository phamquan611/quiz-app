import React from "react";

function Result() {
  return (
    // TO DO
    <div className="bg-result">
      <div className="container m-[auto]">
        <div className="bg-white w-[30%] rounded-lg shadow-2xl m-[auto] py-5 text-center text-[40px] mb-[20px] border-2  border-sky-500">
          <p className="pb-[10px]">
            Your Test Is Done !!!
          </p>
        </div>
        <div className="flex justify-evenly ">
          <button className="shadow-inner w-[10%] bg-rose-600 py-5 px-10 rounded-xl text-[26px]">
            View
          </button>
          <button className="shadow-inner w-[10%] bg-green-600 py-5 px-10 rounded-xl text-[26px]">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
export default Result;
