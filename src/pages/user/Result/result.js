import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
const Result = ({
  setName,
  name,
  viewAnswer,
  setViewAnswer,
  getID,
  setGetID,
  setCheckViewTime,
  getQuizID,
  setGetQuizID,
  setQuestions,
  questions
}) => {
  const history = useHistory();
  const[isSubmit, setIsSubmit]= useState(false)
  const [userPoint, setUserPoint] = useState(false)
  const handleSubmit = async () => {
    // TO DO
    setViewAnswer(true);
    setGetID(getID);
    setName(setName);
    setIsSubmit(true)
    // console.log(name);
    const body = questions.map((quest)=>({question: quest.question, answerChoose: quest.isSelected}))
  console.log(body); 
    const data = await axios.post(
      `https://quiz-app-winds.herokuapp.com/sessions/${getID}`,
      {
        sessionId: getQuizID,
        userName: name,
        questions:
        [
            body
        ],
      }
    );
    setUserPoint(data.data.points)
    console.log(data.data.points);
  }
  const handleView = () => {
    history.push(`/quiz/${getQuizID}`);
    setCheckViewTime(false);
  };
  const checkSubmit =()=>{
    setIsSubmit(false)
  }
  return (
    <div className="min-h-screen bg-indigo-300 flex">
      <div className="container 2xl m-[auto]">
        <h2 className="text-center text-4xl font-black text-white pb-5">
          Your Test is done !
        </h2>
        <div className="flex m-[auto] justify-center w-1/2 ">
          <button
            onClick={handleView}
            className="px-14 font-black w-1/3 py-7 mr-3.5  text-2xl bg-red-600 rounded-full shadow-lg"
          >
            View
          </button>
          <button
            onClick={handleSubmit}
            className="px-14 font-black w-1/3 py-7 ml-3.5  text-2xl bg-green-300 hover:bg-green-900 rounded-full shadow-lg"
          >
            Submit
          </button>
        </div>
      </div>
      {
      isSubmit === true ?
    <div className="fixed inset-0 bg-black w-full flex">
      <div className="m-[auto] opacity-1 bg-white opacity-100 w-[500px] h-[400px] rounded-xl text-[#000] flex  flex-col">
        <h2 className="m-[auto] text-5xl text-center">Câu trả lời của bạn đã được lưu lại !!!</h2>
        <h2 className="m-[auto] text-5xl text-center">Điểm của bạn là {userPoint} </h2>
        <button
                className="m-[auto] p-5 text-[24px] bg-green-500 rounded-xl px-9 "
                onClick={checkSubmit}
              >
                OKE NHA !
              </button>
      </div>
    </div>
      : ""
    }
    </div>
    
  );
};
export default Result;
