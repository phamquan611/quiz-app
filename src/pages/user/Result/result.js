import axios from "axios";
import { useHistory } from "react-router-dom";
const Result = ({
  viewAnswer,
  setViewAnswer,
  getID,
  setGetID,
  setCheckViewTime,
  getQuizID, 
  setGetQuizID
}) => {
  const history = useHistory();
  const handleSubmit = () => {
    // TO DO
    setViewAnswer(true)
  axios.post(`https://quiz-app-winds.herokuapp.com/sessions/${getID}`)
  
  };
  const handleView = () => {
    history.push(`/quiz/${getQuizID}`);
    setCheckViewTime(false);
  };
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
    </div>
  );
};
export default Result;
