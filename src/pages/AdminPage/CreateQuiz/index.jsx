import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Loading from "@pages/AdminPage/Loading";
import Question from "@pages/AdminPage/Quiz/Component/Question";
import { postQuiz } from "@actions/quiz.action";
import {
  NUM_MIN_QUESTION_A_QUIZ,
} from "@utils/constant";
import { formTimeChallenge } from "@utils";

import { nanoid } from "nanoid";

export default function CreateQuiz() {
  const dispatch = useDispatch();
  const [totalQuestionEditing, setTotalQuestionEditing] = useState(0);
  const [quiz, setQuiz] = useState({ category: "", questions: [], timeChangllenge: 0 });
  const timeChallenge = useRef();

  // function delete question
  const deleteQuestionWithId = (idQuestion, indexQuestion) => {
    let { questions } = quiz;
    if (questions.length <= NUM_MIN_QUESTION_A_QUIZ) {
      return Swal.fire("Can't delete question, A quiz have a minimum 10 question");
    }
    Swal.fire({
      title: `Are you sure delete question ${indexQuestion + 1}`,
      showDenyButton: true,
      confirmButtonText: "YES",
      denyButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        questions = questions.filter((question) => question.id !== idQuestion);
        return setQuiz({ ...quiz, questions });
      }
    });
  };

  // function update quiz
  const createQuiz = () => {
    Swal.fire({
      title: "Are you sure create quiz ?",
      showDenyButton: true,
      confirmButtonText: "YES",
      denyButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(postQuiz(quiz));
      }
    });
  };

  const updateQuestionToQuiz = (questionUpdated) => {
    const { id } = questionUpdated;
    const { questions } = quiz;
    const newListQuestion = questions.map((question) => {
      if (question.id === id) {
        return questionUpdated;
      }
      return question;
    });
    setQuiz({ ...quiz, questions: newListQuestion });
  };

  const addQuestion = () => {
    const id = nanoid();

    const newQuestion = {
      id,
      content: "",
      answers: [
        {
          id: nanoid(),
          content: "",
        },
        {
          id: nanoid(),
          content: "",
        },
      ],
      correct_answer: null,
      isNewQuestion: true,
    };
    setTotalQuestionEditing(totalQuestionEditing + 1);
    const { questions } = quiz;
    questions.push(newQuestion);
    setQuiz({ ...quiz, questions });
  };
  const handleChangeQuizName = (e) => {
    setQuiz({ ...quiz, category: e.target.value });
  };

  const handleChangeTimeChallenge = () => {
    const currentTimeChallenge = timeChallenge.current;
    setQuiz({ ...quiz, timeChangllenge: currentTimeChallenge.value });
  };
  console.log(totalQuestionEditing);
  return (
    <div className="p-[50px]">
      {quiz ? (
        <>
          <div>
            <div className="text-left mx-auto container w-1/2">
              <div className="font-bold flex">
                <label htmlFor="quizName" className="w-label mt-2 ">Quiz name : </label>
                <input type="text" name="quizName" id="quizName" value={quiz.category} onChange={handleChangeQuizName} className="font-bold rounded-[5px] p-2 flex-1 border border border-2 border-[black]" />
              </div>
              <div className="my-5 flex">
                <label htmlFor="timeChallenge" className="w-label mt-2">
                  <b className="font-bold">Time challenge : </b>
                </label>
                <select
                  name="timeChallenge"
                  id="timeChallenge"
                  className="flex-1 border border-2 border-[black] rounded-[5px] p-2 appearance-none"
                  ref={timeChallenge}
                  onChange={handleChangeTimeChallenge}
                  value={quiz.timeChangllenge}
                >
                  {formTimeChallenge.map((option) => {
                    return (
                      <option
                        value={option.value}
                        key={option.value}
                      >
                        {option.text}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex pt-[30px] justify-center">
              <div className="list-question text-center px-[20px] text-[18px] py-10 bg-main-white w-1/2">
                {quiz.questions.map((question, index) => {
                  return (
                    <Question
                      question={question}
                      index={index}
                      key={question.id}
                      deleteQuestionWithId={deleteQuestionWithId}
                      updateQuestionToQuiz={updateQuestionToQuiz}
                      newQuestion={question.isNewQuestion}
                      setTotalQuestionEditing={setTotalQuestionEditing}
                      totalQuestionEditing={totalQuestionEditing}
                    />
                  );
                })}
                <div className="text-left">
                  <button className="bg-main-color p-2 text-[17px] text-main-white rounded-[4px]" onClick={addQuestion}>
                    Add question
                  </button>
                </div>
              </div>
            </div>
          </div>
          {quiz.questions.length >= NUM_MIN_QUESTION_A_QUIZ && (
          <div className="text-center my-7">
            <button className={`bg-main-color p-2 text-[17px] text-main-white rounded-[4px] ${totalQuestionEditing !== 0 && "bg-danger-color"}`} onClick={createQuiz}>
              Create Quiz
            </button>
          </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
