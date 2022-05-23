import React from "react";
import {
  RiDeleteBin6Line,
  // RiAddCircleFill,
  RiMessage2Line,
  RiAddLine,
} from "react-icons/ri";
// import { FcCheckmark } from "react-icons/fc";
// import Loading from "@pages/AdminPage/Loading";
// import Swal from "sweetalert2";
// import QuestionToEdit from "@pages/AdminPage/QuizWithId/QuestionToEdit";
// import { selectQuizzes } from "@store/slice";
// import { getQuizzes } from "@actions/quiz.action";
import { IDEA } from "@utils";
import {
// NUM_MIN_QUESTION_A_QUIZ,
// MAX_ANSWER_A_QUESTION,
// ALERT_MAX_ANSWER_A_QUESTION,
// ALERT_DELETE_CORRECT_ANSWER,
// MIN_ANSWER_A_QUESTION,
// ALERT_MIN_ANSWER_A_QUESTION,
// NUM_CORRECT_ANSWER_A_QUESTION
} from "@utils/constant";

export default function QuestionToEdit(props) {
  const { questionToEdit } = props;
  return (
    <div>
      <div className="font-bold text-[24px]">Edit Popup</div>
      {/* <QuestionToEdit
                questionEdit={questionEdit}
                IDEA={IDEA}
                indexQuestionEdit={indexQuestionEdit}
              /> */}
      {Object.keys(questionToEdit).length === 0 ? (
        <div className="empty-edit-question" />
      ) : (
        <div className="question-edit-form bg-[#f5f5f5] p-[20px]">
          <div className="question-edit-index text-[20px]">
            {/* <label htmlFor="questionEdit">{`Question ${indexQuestionEdit} :`}</label> */}
            <input
              type="text"
              id="questionEdit"
              name="questionEdit"
              // value={questionEdit.content}
              // onChange={handleContentQuestion}
              className="my-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </div>
          <div>
            {questionToEdit.answers.map((answer, index) => {
              const isCorrectAnswer = answer.id === questionToEdit.correct_answer;
              return (
                <div
                  className="flex justify-between text-[18px]"
                  key={answer.id}
                >
                  <div className="flex answer-default">
                    <b>{`${IDEA[index]} .`}</b>
                    {` ${answer.content}`}
                  </div>
                  <div className="flex answer-edit pt-[5px] pr-[20px]">
                    {isCorrectAnswer ? (
                      <input
                        type="radio"
                        name="checkCorrectAnswerForIndex"
                        id="checkCorrectAnswerForIndex"
                        // ref={checkboxForIndexRef}
                        className="mt-2 mr-2"
                        defaultChecked
                        // onChange={() => chooseCorrectAnswerToEditQuestion(answer)}
                      />
                    ) : (
                      <input
                        type="radio"
                        name="checkCorrectAnswerForIndex"
                        id="checkCorrectAnswerForIndex"
                        // ref={checkboxForIndexRef}
                        className="mt-2 mr-2"
                        // onChange={() => chooseCorrectAnswerToEditQuestion(answer)}
                      />
                    )}
                    <RiMessage2Line
                      className="text-[blue] mr-[10px] cursor-pointer mt-1"
                      // onClick={() => editAnswerAQuestion(answer, isCorrectAnswer)}
                    />
                    <RiDeleteBin6Line
                      className="text-[red] cursor-pointer mt-1"
                      // onClick={() => deleteAnswerAQuestion(answer, isCorrectAnswer)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between font-bold cursor-pointer pt-[20px]">
            <div
              // onClick={addAnswerToEditQuestion}
              className="flex bg-[blue]  py-2 px-[10px]"
            >
              {" Add answer "}
              <RiAddLine className="mt-1 ml-1" />
            </div>
            <div>
              <button
                className="py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75"
                type="submit"
                // onClick={updateQuestion}
              >
                Update question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
