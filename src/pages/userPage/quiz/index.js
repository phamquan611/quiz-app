import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "@components/userQuestion";
import CheckQuestion from "@components/userQuestionCheck";
import { url } from "@services/http";

function Quiz({ quizzesID, setQuizzesID }) {
  const [questions, setQuestions] = useState([]);
  const [timeStamp, setTimeStamp] = useState();
  useEffect(() => {
    setTimeStamp(timeStamp);
    axios.get(`${url}/quizzes/${quizzesID}`).then((res) => {
      setQuestions(res.data?.questions);
      setTimeStamp(res.data?.timeChangllenge);
    });
  }, []);
  return (
    // TO DO : prev and next btn
    <div className="bg-quiz">
      <div className="container m-[auto]">
        <div className="flex justify-between">
          {questions.length > 0 ? (
            <CheckQuestion questions={questions} />
          ) : (
            ""
          )}
          {questions.length > 0 ? (
            <Question questions={questions} timeStamp={timeStamp} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
