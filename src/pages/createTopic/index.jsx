import React, { useState, useRef } from 'react';
import {RiDeleteBin6Line, RiEdit2Line,RiMessage2Line, RiAddLine} from "react-icons/ri";
import {FcCheckmark} from "react-icons/fc";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {url} from "@services/http";
import { IDEA , isBlank} from '@utils';


export default function CreateTopic() {
    const history = useHistory();
    const [quizTitle, setQuizTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [newExercise, setNewExercise] = useState({question:"", correct_answer:[], answers : []});
    const [isCreateQuestion, setIsCreateQuestion] = useState(false);
    const [isAddAnswerToNewQuestion, setIsAddAnswerToNewQuestion] = useState(false);
    const [newAnswerQuestion, setNewAnswerQuestion] = useState("");
    const [exerciseEdit, setExerciseEdit] = useState({});
    const [indexExerciseEdit, setIndexExerciseEdit] = useState("");
    const [answerToChoice, setAnswerToChoice] = useState(null);
    const [editAnswerToIndex, setEditAnswer] = useState(null);
    const checkboxForIndexRef = useRef(null);
    const inputCheckCorrectAnswer = useRef(null);

    const {question, correct_answer, answers} = newExercise;

    const handleChangeQuizTitle = (e) => {
        setQuizTitle(e.target.value)
    }

    const clickCreateQuestion = () => {
        setIsCreateQuestion(!isCreateQuestion);
    }

    const handleChangeNewQuestion = (e) => {
        setNewExercise({...newExercise, question : e.target.value})
    }

    const createQuiz = async() => {
        if(questions.length < 10){
            return Swal.fire("Total question can't less than 10.")
        }

        if(isBlank(quizTitle)){
            return Swal.fire("Quiz category is not blank.")
        }

        const errorExercises = questions.filter((question) => {
            return question.correct_answer.length > 1;
        });

        if(errorExercises.length > 0){
            return Swal.fire("Exercise of your Quiz cannot contain 2 correct answer.")
        }

        const newQuiz = {category : quizTitle, questions : questions};
        try{
            const postQuiz = await axios.post(`${url}/quizzes/create`, newQuiz)
            if(!postQuiz?.data){
                return Swal.fire("Create quiz fail.")
            }

            if(postQuiz?.data.success){
                Swal.fire("Create quiz successfully").then((result) => {
                    if(result.isConfirmed){
                        history.push("/admin")
                    }
                })
            }
        }catch(err){

        }


        console.log(newQuiz);
    }

    const addAnswerToNewQuestion = () => {
        if(isBlank(newAnswerQuestion) && isAddAnswerToNewQuestion){
            return Swal.fire({
                title: 'Answer is not blank .',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
        }

        if(isAddAnswerToNewQuestion){
            answers.push(newAnswerQuestion) ;
            if(inputCheckCorrectAnswer.current.checked){
                 correct_answer.push(newAnswerQuestion);
            }

            setNewExercise({...newExercise});
       }

        setIsAddAnswerToNewQuestion(!isAddAnswerToNewQuestion);
        setNewAnswerQuestion("")
    }

    const confirmAddQuestion = () => {
        const {question, answers, correct_answer} = newExercise;
          if(isBlank(question)){
               return Swal.fire("You can not blank question input.");
          }

          if(answers.length < 2){
               return Swal.fire("the answer must be more than 2 values;");
          }

          if(correct_answer.length === 0){
               return Swal.fire("You need to choose the correct answer");
          }

          setQuestions([...questions, newExercise]);
          setNewExercise({answers : [], correct_answer : [], question: ""});
          return setIsCreateQuestion(false);
    }

    const handleChangeNewAnswerOfNewQuestion = (e) => {
        setNewAnswerQuestion(e.target.value)
    }

    const openPopupQuestion =(exercise, index) => {
        setExerciseEdit({...exercise, answers : [...exercise.answers]});
        setIndexExerciseEdit(index);
    }

    const changeQUestionInExercise = (e) =>{
        setExerciseEdit({...exerciseEdit, question : e.target.value}) 
    }


    const changeAnswer = (e,indexAnswer) => {
        const newValue = e.target.value;
        const {answers, correct_answer} = {...exerciseEdit, answers : exerciseEdit.answers};
        let newCorrectAnswer = correct_answer;
        answers[indexAnswer] = newValue;
        // display value input
        setAnswerToChoice(newValue);
        const oldExercise = {...questions[indexExerciseEdit]};
        const isCorrect = checkboxForIndexRef.current.checked;

        if(isCorrect){
             const oldCorrectAnswer = oldExercise[indexAnswer];
             newCorrectAnswer = correct_answer.filter((answer) => answer !== oldCorrectAnswer);
             newCorrectAnswer.push(newValue);
        }

        setExerciseEdit({...exerciseEdit, correct_answer : newCorrectAnswer});
    }

    const chooseCorrectAnswer = (indexAnswerCorrect) => {
        const {correct_answer, answers} = exerciseEdit;
        const answerChoose = answers[indexAnswerCorrect];

        if(checkboxForIndexRef.current.checked){
                return setExerciseEdit({...exerciseEdit, correct_answer : [...correct_answer,answerChoose]})
        }

        return setExerciseEdit({...exerciseEdit, correct_answer : correct_answer.filter((answer) => answer !== answerChoose)});
    }

    const editAnswer = (indexAnswer, answer) => {
        setEditAnswer(indexAnswer);
        setAnswerToChoice(answer);
    }

    const deleteAnswer = (indexAnswer, isCorrect) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                 const {answers, correct_answer} = exerciseEdit;
                 const filterAnswers = [...answers].filter((answer, index) => index !== indexAnswer);
                 let newCorrectAnswers = correct_answer;
                 if(isCorrect){
                      const answerPick = answers[indexAnswer];
                      newCorrectAnswers = correct_answer.filter((answer) => answer === answerPick);
                 }
                 setExerciseEdit({...exerciseEdit,answers : filterAnswers, correct_answer : newCorrectAnswers});
                 
            }
          })
    }

    const addAnswer = () => {
        const newExercise = exerciseEdit.answers.push("Please edit me <3");
        setEditAnswer(newExercise)
    }

    const upDateQuestion = () => {
        let {correct_answer, answers} = exerciseEdit;
        
        correct_answer = correct_answer.filter((answer) => {
             return answers.indexOf(answer) !== -1;
        })

        if(correct_answer.length > 1 ){
             return Swal.fire("Only 1 correct answer can be given to a exercise")
        }

        if(correct_answer.length === 0){
             return Swal.fire("A exercise need at 1 correct answer")
        }
        
        questions[indexExerciseEdit] = {...exerciseEdit, correct_answer : [...correct_answer]};

        setQuestions([...questions])
        setExerciseEdit({});
        setEditAnswer(null);
    }

    const deleteQuestionInQuiz = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want delete question!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    setQuestions(questions.filter((questions, index) => index!==index))
                    return Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                }
          })
    }

    return (
        <>
            <div className='px-5 my-5 flex justify-left'>
                    <button className='p-2 w-fit bg-lime-500 rounded-[5px] text-[#f1f1f1]'
                        onClick={createQuiz}
                    >
                        Create Quiz 
                    </button>
            </div>
            <div className='w-full px-5 flex justify-between mb-[50px]'>
                <div className='py-5 px-3 max-w-full bg-[#f5f5f5] w-[60%]'>
                    <div className='flex w-full'>
                        <label htmlFor="quizTitle" className='text-2xl font-bold mr-2 mt-3 w-[150px]'>Category:</label>
                        <input type="text" value={quizTitle} onChange={handleChangeQuizTitle}
                            className="p-2 border-2 w-full border-solid border-black mt-2 rounded-[7px]"
                            placeholder='QUIZ Category'
                            id='quizTitle'
                        />
                    </div>
                    <p className='text-[#111111] mt-5 w-fit rounded-[5px] cursor-pointer flex p-2 bg-indigo-400'
                        onClick={clickCreateQuestion}
                    >
                        Question <RiAddLine className='mt-1 ml-1'/>
                    </p>
                    <div className='mt-5'>
                        <div className='text-2xl font-bold mb-5'>Question 1 of {questions.length}</div>
                            {
                                questions.map((exercise, index) => {
                                    const {answers, correct_answer} = exercise;
                                    const isNeedEdit = correct_answer?.length > 1 ;
                                    return (
                                            <div key={index} className=" w-full mb-5 cursor-pointer"
                                            >
                                                <div className='mr-4 flex'>
                                                    <div className={`${isNeedEdit ? "text-[red]" : ""}`} id={`question${index+1}`} >
                                                        <b>{index+1}</b><b className='mr-1'>.</b> : {exercise.question}
                                                    </div>
                                                    <RiEdit2Line className='text-[20px] text-[green] mt-[3px] mx-[15px]'
                                                        onClick={() => openPopupQuestion(exercise,index)}
                                                    />
                                                    <RiDeleteBin6Line  className='text-[20px] text-[red] mt-[3px] mx-[15px]'
                                                        onClick={() => deleteQuestionInQuiz(index)}/>
                                                </div>
                                                <div className=''>
                                                        <div className='flex flex-wrap mt-5'>
                                                                {answers.map((answer, index) => {
                                                                    return (
                                                                        <p className='w-1/2' key={index}>
                                                                            <b className={exercise.correct_answer.includes(answer) ? "text-red-500" : "font-thin"}>{IDEA[index]}</b> : {answer}
                                                                        </p>
                                                                    )
                                                                })}
                                                        </div>
                                                </div>
                                            </div>
                                    )
                                })
                            }
                        </div>
                </div>
                <div className='w-[39%]'>
                    {isCreateQuestion? 
                        <div className='mx-auto max-w-full px-5 bg-[#f5f5f5] py-5'>
                            <h2 className='font-bold mb-5'>New Question</h2>
                            <div>
                                <input type="text"
                                        id="question" 
                                        value={newExercise.question}
                                        name="newQuestions"
                                        className="border border-slate-300 rounded-md py-2 px-5 shadow-sm focus:outline-none max-w-[100%] w-[80%]"
                                        onChange={handleChangeNewQuestion}/>
                            </div>
                            {newExercise.answers.map((answer, index) => {
                                const isCorrect = newExercise.correct_answer.indexOf(answer) !== -1;
                                return (
                                        <div className='w-full flex justify-between mb-3 mt-3' key={index}>
                                                    {
                                                            <div className="flex">
                                                                {`${IDEA[index]} : ${answer}`}
                                                                {isCorrect?<FcCheckmark className='cursor-pointer text-[20px] font-bold ml-3 ' /> : <></>}
                                                            </div>
                                                    }
                                                </div>
                                )
                            })}
                            <div className="flex justify-between w-full mt-5">
                                <p className='text-[#13a7e9] w-fit rounded-[5px]  cursor-pointer flex p-2 hover:bg-emerald-400'
                                        onClick={addAnswerToNewQuestion}
                                >
                                        Add answer <RiAddLine className='mt-1 ml-1' />
                                </p>
                                <button className='p-2 w-fit bg-lime-500 rounded-[5px] text-[#f1f1f1]' onClick={confirmAddQuestion}>
                                        Add New question
                                </button>
                            </div>
                            
                            {isAddAnswerToNewQuestion?
                            <div className='flex mt-4 justify-between'>
                                <div className='mt-4 w-[80%]'>
                                        <input type="text" 
                                        value={newAnswerQuestion} 
                                        onChange={handleChangeNewAnswerOfNewQuestion} 
                                        placeholder="Answer"
                                        className='border px-[5px] py-2 border-2 w-full border-[#111111] rounded-[5px]'
                                        />
                                </div>
                                <div className='mt-5 flex'>
                                        <label htmlFor="checkCorrect" className='font-bold'> exact</label> <br/>
                                        <input type="checkbox" name="checkCorrect" 
                                            id="checkCorrect" 
                                            className='mt-2 mx-2'
                                            ref={inputCheckCorrectAnswer} 
                                        />
                                </div>
                            </div>:
                            <></>
                            }
                        </div> 
                        : <></>
                    }
                    {isCreateQuestion?<hr className='w-full my-10 bg-[black]'/>:<></>}
                    <div className='w-full '>
                         <div className='w-full p-5 bg-[#f5f5f5]'>
                              <h2 className='font-bold mb-5 text-2xl'> Edit Question {indexExerciseEdit=== "" ? "" :  indexExerciseEdit+ 1}</h2>
                              <div>
                                   <input type="text" name="question" 
                                        id="question" 
                                        value={exerciseEdit.question?exerciseEdit.question:""}
                                        className="border border-slate-300 rounded-md py-2 px-5 shadow-sm focus:outline-none max-w-[100%] w-[80%]"
                                        onChange={changeQUestionInExercise}/>
                              </div>
                              {
                                   !exerciseEdit.answers ? <></> : 
                                   <div className='flex flex-wrap my-5'>
                                        {exerciseEdit.answers.length === 0 ? <></>: exerciseEdit.answers.map((answer, index) => {
                                             const isCorrect = exerciseEdit.correct_answer.includes(answer);
                                                  return (
                                                       <div className='w-full flex justify-between mb-3' key={index}>
                                                           {editAnswerToIndex === index ? 
                                                                 <div className='flex'>
                                                                      <label htmlFor="answerChoice" className='mr-[9px]'>{`${IDEA[index]}`}</label>
                                                                      <input type="text" name='answer' id='answerChoice' value={answerToChoice} 
                                                                      className="border rounded-[4px] border-1 border-[black] px-[5px] w-full h-[30px]"
                                                                      onChange={(e) => changeAnswer(e,index)}     
                                                                      />
                                                                      <div className="flex">
                                                                           <label htmlFor='checkCorrectAnswerForIndex' className='mx-2 font-bold '>exact</label>
                                                                           {isCorrect?
                                                                           <input type="checkbox" name="checkCorrectAnswerForIndex" 
                                                                                id="checkCorrectAnswerForIndex" 
                                                                                ref={checkboxForIndexRef} 
                                                                                className='mt-2'
                                                                                defaultChecked={true}
                                                                                onChange={() => chooseCorrectAnswer(index)}
                                                                           />:
                                                                                <input type="checkbox" name="checkCorrectAnswerForIndex" 
                                                                                id="checkCorrectAnswerForIndex" 
                                                                                ref={checkboxForIndexRef} 
                                                                                className='mt-2'
                                                                                onChange={() => chooseCorrectAnswer(index)}
                                                                           />}
                                                                      </div>
                                                                 </div>
                                                                  :
                                                                 <div className="flex">
                                                                      {`${IDEA[index]} : ${answer}`}
                                                                      {isCorrect?<FcCheckmark className='cursor-pointer text-[20px] font-bold ml-3 ' /> : <></>}
                                                                 </div>
                                                            }
                                                            <div className='flex'>
                                                                 <RiMessage2Line className='cursor-pointer text-[20px]' onClick={() => editAnswer(index, answer)}/>
                                                                 <RiDeleteBin6Line className='cursor-pointer text-[20px] text-[red] ml-2' onClick={() =>deleteAnswer(index, isCorrect)}/>
                                                            </div>
                                                       </div>
                                                  )
                                             }) 
                                        }
                                   </div>
                              }
                              {Object.keys(exerciseEdit).length > 0 ? <div className='flex justify-between'>
                                   <p className='text-[#13a7e9] w-fit rounded-[5px] cursor-pointer flex p-2 hover:bg-emerald-400'
                                        onClick={addAnswer}
                                   >
                                        Add answer <RiAddLine className='mt-1 ml-1' />
                                   </p>
                                   <button className='p-2 w-fit bg-lime-500 rounded-[5px] text-[#f1f1f1]' onClick={upDateQuestion}>
                                        Update question
                                   </button>
                              </div> : <></>}
                         </div>
                    </div> 
                </div>
            </div>
        </>
    )
}
