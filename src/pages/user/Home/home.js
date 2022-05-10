
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import axios from "axios";

const Home = ({name, setName , getID, setGetID, checkID ,setCheckID , viewAnswer, setViewAnswer, handleSelected,setHandleSelected}) => {

    const [isError, setIsError] = useState(false)
    const history = useHistory()
    const handleSubmit =()=>{
      var tesst = checkID.filter(function(id){
        return id._id == getID
      })
      // console.log(tesst[0]._id);
      if (!name) {
          setIsError(true)
      }
      else if (!getID){
        setIsError(true)
      }
      else if (getID == tesst[0]._id){
        console.log("hi");
        history.push(`/quiz/${getID}`)
          setIsError(false);  
          setViewAnswer(false)
          setHandleSelected(null)
      }
    }
  return (
    <div className="min-h-screen bg-indigo-300 flex ">
      <div className="container 2xl m-[auto] flex flex-col">
        <h2 className="text-[30px] m-[auto]">Welcome to my Quiz</h2>
      <div className='flex flex-col'>
        {isError ? "Please fill all the fields" : ""}
        <label className="block w-2/4 m-[auto] p-5 ">
          <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Your Username
          </span>
          <input
            type="text"
            name="text"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Your Username"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block w-2/4 m-[auto] p-5 ">
          <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Your ID
          </span>
          <input
            type="text"
            name="text"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Your ID"
            onChange={(e) => setGetID(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleSubmit} className='m-[auto] rounded-full text-xl font-black shadow-lg p-5 bg-green-300' to="/quiz">Let's Start</button>
      </div>
      </div>
    </div>
  );
};
export default Home;
