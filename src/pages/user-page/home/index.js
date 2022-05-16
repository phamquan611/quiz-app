import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

function Home() {
  const [isError, setIsError] = useState(true);
  const [isErrorID, setIsErrorID] = useState(true);
  const [name, setName] = useState("");
  const [quizzID, setQuizzID] = useState("");
  //   const history = useHistory();
  const handleSubmitUser = (e) => {
    setIsError(true);
    setName(e.target.value);
  };
  const handleSubmitQuizId = (e) => {
    setQuizzID(e.target.value);
    setIsErrorID(true);
  };
  const handleSubmit = () => {
    if (!name) {
      setIsError(false);
    } else if (!quizzID) {
      setIsErrorID(false);
    }
  };

  return (
    // TO DO : check id is valid, build form if it's not valid
    <div className="bg-home flex">
      <div className="container 2xl m-[auto] flex flex-col bg-white w-[500px] py-20 shadow-2xl rounded-lg home">
        <h2 className="text-[30px] m-[auto]">Welcome to my Quiz</h2>
        <div className="flex flex-col">
          <label className="block w-4/5 m-[auto] p-5 ">
            <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Your Username
            </span>
            <input
              type="text"
              name="text"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Your Username"
              onChange={handleSubmitUser}
            />
            {!isError && (
              <div className="m-[auto] text-[red]">
                Please fill all the fields
              </div>
            )}
          </label>
          <label className="block w-4/5 m-[auto] p-5 ">
            <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Your session ID
            </span>
            <input
              type="text"
              name="text"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Your session ID"
              onChange={handleSubmitQuizId}
            />
            {!isErrorID && (
              <div className="m-[auto] text-[red]">
                Please fill all the fields
              </div>
            )}
          </label>
          <button
            type="button"
            onClick={handleSubmit}
            className="m-[auto] rounded-full text-xl font-bold shadow-lg p-5 bg-[#93d0de]"
            to="/quiz"
          >
            Let's Start
          </button>
        </div>
      </div>
    </div>
  );
}
export default Home;
