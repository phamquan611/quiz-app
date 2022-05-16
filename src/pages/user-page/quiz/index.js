/* eslint-disable import/no-unresolved */
import React from "react";
import Question from "@components/user_question";
import CheckQuestion from "@components/user_question_check";

function Quiz() {
  return (
    <div className="bg-quiz">
      <div className="container m-[auto]">
        <div className="flex justify-between">
          <CheckQuestion />
          <Question />
        </div>
      </div>
    </div>
  );
}

export default Quiz;
