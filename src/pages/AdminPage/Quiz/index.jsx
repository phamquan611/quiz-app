import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "@pages/AdminPage/Loading";
import Question from "@pages/AdminPage/Quiz/Component/Question";
import { selectQuizzes } from "@store/slice";
import { getQuizzes, putQuiz } from "@actions/quiz.action";
import {
  NUM_MIN_QUESTION_A_QUIZ,
} from "@utils/constant";
import { nanoid } from "nanoid";

export default function QuizWithId() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const listQuiz = useSelector(selectQuizzes);
  const [quiz, setQuiz] = useState(null);
  // state question to edit
  // state create newQuestion

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
  const upDateQUiz = () => {
    const payload = {
      id: params.quizId,
      data: quiz,
    };
    Swal.fire({
      title: "Are you sure update quiz ?",
      showDenyButton: true,
      confirmButtonText: "YES",
      denyButtonText: "NO",
    }).then((result) => {
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
    const id = nanoid();

    const newQuestion = {
      id,
      content: "I'm question, please edit me .",
      answers: [
        {
          id: nanoid(),
          content: "Edit me.",
        },
        {
          id: nanoid(),
          content: "Edit me.",
        },
      ],
      correct_answer: null,
      isNewQuestion: true,
    };
    const { questions } = quiz;
    questions.push(newQuestion);
    setQuiz({ ...quiz, questions });
  };

  return (
    <div className="p-[50px]">
      {quiz ? (
        <>
          <div className="text-2xl font-bold text-center">
            {`Quiz Name : ${quiz.category}`}
          </div>
          <div className="flex pt-[30px] justify-center">
            <div className="list-question text-center px-[20px] text-[18px] py-10 bg-[#f1f1f1]">
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
                <button className="bg-[#13a7e9] p-2 text-[17px] text-[#f1f1f1] rounded-[4px]" onClick={addQuestion}>
                  Add question
                </button>
              </div>
            </div>
          </div>
          <div className="text-center my-7">
            <button className="bg-[#13a7e9] p-2 text-[17px] text-[#f1f1f1] rounded-[4px]" onClick={upDateQUiz}>
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
