import React from "react";
import Question from "@components/userQuestion";
import CheckQuestion from "@components/userQuestionCheck";

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
