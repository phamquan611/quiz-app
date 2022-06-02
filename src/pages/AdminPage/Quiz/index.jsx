import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "@pages/AdminPage/Loading";
import Question from "@pages/AdminPage/Quiz/Component/Question";
import { selectQuizzes } from "@store/slice";
import { getQuizzes, putQuiz } from "@actions/quiz.action";
import {
  MIN_QUESTION_PER_QUIZ,
} from "@utils/constant";
import { formTimeChallenge, createNewQuestion, triggerAlert } from "@utils";

import { nanoid } from "nanoid";

export default function Quiz() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const listQuiz = useSelector(selectQuizzes);
  const [quiz, setQuiz] = useState(null);
  const timeChallenge = useRef();

  useEffect(() => {
    const quizMatchId = listQuiz.filter(
      (quiz) => quiz._id === params.quizId,
    );
    if (quizMatchId.length === 0) {
      history.push("/admin");
    } else {
      setQuiz(quizMatchId[0]);
    }
  }, [listQuiz]);

  useEffect(() => {
    if (listQuiz.length === 0) {
      dispatch(getQuizzes());
    }
  }, []);

  // function delete question
  const deleteQuestionWithId = (idQuestion, indexQuestion) => {
    let { questions } = quiz;
    if (questions.length <= MIN_QUESTION_PER_QUIZ) {
      return Swal.fire("Can't delete question, A quiz have a minimum 10 question");
    }
    triggerAlert(`Are you sure delete question ${indexQuestion + 1}`).then((result) => {
      if (result.isConfirmed) {
        questions = questions.filter((question) => question.id !== idQuestion);
        return setQuiz({ ...quiz, questions });
      }
    });
  };

  // function update quiz
  const upDateQUiz = () => {
    const payload = {
      id: params.quizId,
      data: quiz,
    };

    triggerAlert("Are you sure update quiz ?").then((result) => {
      if (result.isConfirmed) {
        dispatch(putQuiz(payload));
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
    const { questions } = quiz;
    questions.push(createNewQuestion(nanoid()));
    setQuiz({ ...quiz, questions });
  };

  const handleChangeQuizName = (e) => {
    setQuiz({ ...quiz, category: e.target.value });
  };

  const handleChangeTimeChallenge = () => {
    const currentTimeChallenge = timeChallenge.current;
    setQuiz({ ...quiz, timeChangllenge: currentTimeChallenge.value });
  };

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
                  <span className="font-bold">Time challenge : </span>
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
          <div className="text-center my-7">
            <button className={`bg-main-color p-2 text-[17px] text-main-white rounded-[4px] ${false !== 0 && "bg-danger-color"}`} onClick={upDateQUiz} disabled={false}>
              Update Quiz
            </button>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
