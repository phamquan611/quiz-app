import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@pages/AdminPage/Loading";
import Question from "@pages/AdminPage/Quiz/Component/Question";
import { postQuiz, getQuizzes } from "@actions/quiz.action";
import { selectQuizzes } from "@store/slice";
import {
  MIN_QUESTION_PER_QUIZ,
} from "@utils/constant";
import {
  formTimeChallenge, createNewQuestion,
  triggerAlertConfirm, isExistQuestionEditing, isBlank, triggerAlertOnlyMessage,
} from "@utils";
import { nanoid } from "nanoid";


export default function Quiz() {
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState({ category: "", questions: [], timeChangllenge: 0 });
  const listQuiz = useSelector(selectQuizzes);
  const timeChallenge = useRef();

  useEffect(() => {
    dispatch(getQuizzes());
  }, []);

  // function delete question
  const validateCreateQuiz = () => {
    let isValid = true;
    const { category } = quiz;
    debugger;
    if (isBlank(category)) {
      isValid = false;
      triggerAlertOnlyMessage("You cannot blank quiz name.");
    }
    if (listQuiz.filter((quizz) => quizz.category === category).length !== 0) {
      isValid = false;
      triggerAlertOnlyMessage(`Quiz name : ${category} has been existed`);
    }
    return isValid;
  };
  const deleteQuestionWithId = (idQuestion, indexQuestion) => {
    let { questions } = quiz;
    if (questions.length <= MIN_QUESTION_PER_QUIZ) {
      return triggerAlertOnlyMessage("Can't delete question, A quiz have a minimum 10 question");
    }
    triggerAlertConfirm(`Are you sure delete question ${indexQuestion + 1}`).then((result) => {
      if (result.isConfirmed) {
        questions = questions.filter((question) => question.id !== idQuestion);
        return setQuiz({ ...quiz, questions });
      }
    });
  };

  // function update quiz
  const createQuiz = () => {
    if (validateCreateQuiz()) {
      triggerAlertConfirm("Are you sure, you want create quiz ?").then((result) => {
        if (result.isConfirmed) {
          dispatch(postQuiz(quiz));
        }
      });
    }
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

  const toggleEditQuestion = (id, options) => {
    const { questions } = quiz;
    const newQuestions = questions.map((question) => {
      let { isQuestionEditing } = question;
      if (question.id === id) {
        isQuestionEditing = options;
      }
      return { ...question, isQuestionEditing };
    });

    setQuiz({ ...quiz, questions: newQuestions });
  };

  return (
    <div className="p-[50px]">
      {quiz ? (
        <>
          <div>
            <div className="text-left mx-auto container w-1/2">
              <div className="font-bold flex">
                <label htmlFor="quizName" className="w-label mt-2 ">Quiz name : </label>
                <input type="text" name="quizName" id="quizName" value={quiz.category} onChange={handleChangeQuizName} className="rounded-[5px] p-2 flex-1 border border border-2 border-[black]" />
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
                  const cloneQuestion = { ...question, isQuestionEditing: false };
                  return (
                    <Question
                      question={cloneQuestion}
                      index={index}
                      key={question.id}
                      newQuestion={question.isNewQuestion}
                      deleteQuestionWithId={deleteQuestionWithId}
                      updateQuestionToQuiz={updateQuestionToQuiz}
                      toggleEditQuestion={toggleEditQuestion}
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
          {quiz.questions.length >= MIN_QUESTION_PER_QUIZ && (
          <div className="text-center my-7">
            <button className={`bg-main-color p-2 text-[17px] text-main-white rounded-[4px] ${isExistQuestionEditing(quiz?.questions) && "bg-danger-color"}`} onClick={createQuiz} disabled={isExistQuestionEditing(quiz?.questions)}>
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
