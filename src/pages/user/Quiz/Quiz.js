import { useEffect, useState } from "react";
import Question from "../../../components/Questions/question";
import CheckQuestions from "../../../components/checkQuestions/checkQuestions";
import { useHistory , Redirect} from "react-router-dom";
const Quiz = ({
  questions,
  setQuestions,
  handleSelected,
  setHandleSelected,
  name,
  viewAnswer,
  setViewAnswer,
}) => {
  const [options, setOptions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentPick, setCurrentPick] = useState(0);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [value, setValue] =useState()
  
  // const history = useHistory();

  const handleShuffle = (options) => {
    return options.sort();
  };
  
  // console.log(questions[currentPick].isSelected);
  const userPick = questions[currentPick].isSelected;
  setHandleSelected(userPick);
  useEffect(() => {
    // console.log(userPick);
    setOptions(
      questions && handleShuffle([...questions[currentQuestion]?.answers])
    );
  }, [questions, currentQuestion, selectedOption, currentPick]);
  // console.log(currentQuestion);
  // console.log(options);

  return (
    <div className="min-h-screen bg-indigo-300 flex">
      <div className="container 2xl m-[auto] flex flex-col ">
        <CheckQuestions
          questions={questions}
          setQuestions={setQuestions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          currentPick={currentPick}
          setCurrentPick={setCurrentPick}
          handleSelected={handleSelected}
        />
        <Question
          name={name}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          options={options}
          questions={questions}
          setQuestions={setQuestions}
          handleSelected={handleSelected}
          setHandleSelected={setHandleSelected}
          currentPick={currentPick}
          setCurrentPick={setCurrentPick}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          viewAnswer={viewAnswer}
          setViewAnswer={setViewAnswer}
        />
      </div>
    </div>
  );
};
export default Quiz;
