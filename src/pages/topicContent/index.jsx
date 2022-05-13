import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {RiDeleteBin6Line, RiAddCircleFill, RiMessage2Line, RiAddLine} from "react-icons/ri";
import {FcCheckmark} from "react-icons/fc";
import Swal from "sweetalert2";
import {url} from "@services/http";
import { IDEA , isBlank} from '@utils'; 

function TopicContent() {
     const params = useParams();
     const history = useHistory();
     const [quiz, setQuiz] = useState([]);
     const [questions, setChangeQuestions] = useState([]);
     const [exercise, setExercise] = useState({});
     const [indexQuestion , setGetIndexQuestion] = useState("");
     const [editAnswerToIndex, setEditAnswer] = useState(null);
     const [answerToChoice, setAnswerToChoice] = useState(null);
     const [isAddQuestion, setIsAddQuestion] = useState(false);
     const [dataNewExercise, setDataNewExercise] = useState({answers : [], correct_answer : [], question: ""});
     const [isAddAnswerToNewQuestion, setIsAddAnswerToNewQuestion] = useState(false);
     const [newAnswerQuestion, setNewAnswerQuestion] = useState("");
     const inputCheckCorrectAnswer = useRef(null);
     const checkboxForIndexRef = useRef(null);
     
     const topicId = params.topicId;

     useEffect(() => {
          (async() => {
               try{
                    if(!topicId){
                         return history.push("/error");
                    }
                    const resQuiz = await axios.get(`${url}/quizzes/${topicId}`, { headers: {"Authorization" : `Bearer kaka`} });

                    if(!resQuiz){
                         history.push("/error")
                    }
                    if(!resQuiz.data.error){
                         setQuiz(resQuiz.data[0]);
                         setChangeQuestions(resQuiz.data[0].questions);
                    };
               }catch(err){
                    history.push("/error");
               }
          })()
     },[]);
     console.log(questions)
     const openPopupQuestion = (exercise, index) => {
          setEditAnswer(null);
          setExercise({...exercise, answers: [...exercise.answers]});
          setGetIndexQuestion(index);
     }

     const changeQUestionInExercise = (e) => {
          setExercise({...exercise, question : e.target.value}) 
     }

     const openFormAddQuestion = () => {
          setIsAddQuestion(!isAddQuestion);
     }

     const editAnswer = ( indexAnswer, answer) => {
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
                    const {answers, correct_answer} = exercise;
                    const filterAnswers = [...answers].filter((answer, index) => index !== indexAnswer);
                    let newCorrectAnswers = correct_answer;
                    if(isCorrect){
                         const answerPick = answers[indexAnswer];
                         newCorrectAnswers = correct_answer.filter((answer) => answer === answerPick);
                    }
                    setExercise({...exercise,answers : filterAnswers, correct_answer : newCorrectAnswers});
                    
               }
             })
     }

     const changeAnswer = (e,indexAnswer) => {
          const newValue = e.target.value;
          const {answers, correct_answer} = exercise;
          let newCorrectAnswer = correct_answer;
          answers[indexAnswer] = newValue;
          // display value input
          setAnswerToChoice(newValue);
          const oldExercise = {...questions[indexQuestion]};
          const isCorrect = checkboxForIndexRef.current.checked;

          if(isCorrect){
               const oldCorrectAnswer = oldExercise[indexAnswer];
               newCorrectAnswer = correct_answer.filter((answer) => answer !== oldCorrectAnswer);
               newCorrectAnswer.push(newValue);
          }

          setExercise({...exercise, correct_answer : newCorrectAnswer});
     }

     const upDateQuestion = () => {
          let {correct_answer, answers} = exercise;
          
          correct_answer = correct_answer.filter((answer) => {
               return answers.indexOf(answer) !== -1;
          })

          if(correct_answer.length > 1 ){
               return Swal.fire("Only 1 correct answer can be given to a exercise")
          }

          if(correct_answer.length === 0){
               return Swal.fire("A exercise need at 1 correct answer")
          }

          
          questions[indexQuestion] = {...exercise, correct_answer : correct_answer};
          setChangeQuestions([...questions])
          setExercise({});
          setEditAnswer(null);
     }

     const addAnswer = () => {
          const newExercise = exercise.answers.push("Please edit me <3");
          setEditAnswer(newExercise)
     }

     const handleChangeNewQuestion = (e) => {
          setDataNewExercise({...dataNewExercise, question : e.target.value});
     }

     const addAnswerToNewQuestion = () => {
          const {answers, correct_answer} = dataNewExercise;
          if(isBlank(newAnswerQuestion) && isAddAnswerToNewQuestion){
               return Swal.fire("Answer is not blank .")
          }
          if(isAddAnswerToNewQuestion){
               answers.push(newAnswerQuestion) ;
               if(inputCheckCorrectAnswer.current.checked){
                    correct_answer.push(newAnswerQuestion);
               }

               setDataNewExercise({...dataNewExercise});
          }
          
          setNewAnswerQuestion("");
          setIsAddAnswerToNewQuestion(!isAddAnswerToNewQuestion);
          // dataNewQuestion
     }

     const confirmAddQuestion = () => {
          const {question, answers, correct_answer} = dataNewExercise;
          if(isBlank(question)){
               return Swal.fire("You can not blank question input.");
          }

          if(answers.length < 2){
               return Swal.fire("the answer must be more than 2 values;");
          }

          if(correct_answer.length === 0){
               return Swal.fire("You need to choose the correct answer");
          }

          setChangeQuestions([...questions, dataNewExercise]);
          setDataNewExercise({answers : [], correct_answer : [], question: ""});
          return setIsAddQuestion(false);
     }

     const chooseCorrectAnswer = (indexAnswerCorrect) => {
          const {correct_answer, answers} = exercise;
          const answerChoose = answers[indexAnswerCorrect];

          if(checkboxForIndexRef.current.checked){
               return setExercise({...exercise, correct_answer : [...correct_answer,answerChoose]})
          }

          return setExercise({...exercise, correct_answer : correct_answer.filter((answer) => answer !== answerChoose)})
     }

     const handleChangeNewAnswerOfNewQuestion = (e) => {
          setNewAnswerQuestion(e.target.value)
     }

     const putDataUpdateQuiz = () => {
          if(questions.length < 10){
               return Swal.fire("A quiz has more 10 question .")
          }

          const errorQuestions = questions.filter((question) => question.correct_answer.length > 1).length
          if(errorQuestions > 0){
               return Swal.fire("Only 1 correct answer can be given to a exercise.")
          }


          try{
               (async() => {
                    Swal.fire({
                         title: 'Do you want to save the changes?',
                         showCancelButton: true,
                         confirmButtonText: 'Save',
                         denyButtonText: `Don't save`,
                    }).then((result) => {
                         /* Read more about isConfirmed, isDenied below */
                         if (result.isConfirmed) {
                              axios.put(`${url}/quizzes/${topicId}`, questions).then((res) =>{
                                   if(res.data.success){
                                        Swal.fire("You update quiz successfully <3.");
                                        return history.push(`/admin/topic/${topicId}`)
                                   }
                              }
                              
                              )
                         } else if (result.isDenied) {
                         }
                    })
               })()
          }catch(err){
               console.log(err)
          }
     }

     const deleteQuestionInQuiz = (indexQuestion) => {
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
                         setChangeQuestions(questions.filter((question, index) => index!==indexQuestion))
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
               <div className='w-auto mx-10 mb-5'>
                    <div className='w-full flex'>
                         <img src="https://png.pngtree.com/thumb_back/fh260/background/20211031/pngtree-abstract-bg-image_914283.png" 
                              alt="category" 
                              className='w-full h-[250px] cursor-pointer'
                              />
                         <div className='pl-5'>
                              <div className='text-2xl font-bold'>
                                   {quiz.category}
                              </div>
                              <div>
                              {quiz.description }
                              </div>
                         </div>
                    </div>
               </div>
               <div className='flex px-10'>
                    <div className="flex w-1/2">
                         <div className='mb-10'>
                              <div className="mb-2 font-bold ">
                                  <b className='text-[red]'> *_* </b>Questions 
                              </div>
                              {questions.map((question, index) => {
                                   return (
                                        <div className='w-[auto] mb-2' key={index} 
                                             onClick={() => openPopupQuestion(question,index)}
                                        >
                                             <div className='flex py-1 px-3 bg-[#605aaf] cursor-pointer rounded-sm '>
                                                  <div className='font-bold text-[#f1f1f1]'
                                                  >
                                                  <p className='flex w-[auto]'> Question {index + 1 < 10 ? "0" + (index + 1) : index + 1}</p>
                                                  </div>
                                                  <input type="hidden" name="" />
                                             </div>
                              </div>
                                   )
                              })}
                         </div>
                         <div className='h-full px-4 bg-[#f5f5f5]]'>
                              <div>
                                   <div className='text-2xl font-bold mb-5'>Question 1 of {questions.length}</div>
                                   {questions.map((exercise, index) => {
                                        const {answers, correct_answer} = exercise;
                                        const isNeedEdit = correct_answer?.length > 1 ;
                                        return (
                                             <div key={index} className=" w-full mb-5 cursor-pointer"
                                                  onClick={() => openPopupQuestion(exercise,index)}
                                             >
                                                  <div className='mr-4 flex'>
                                                       <div className={`${isNeedEdit ? "text-[red]" : ""} flex justify-between`} id={`question${index+1}`} >
                                                            <div>{index+1}<b className='mr-1'>.</b> : {exercise.question} </div>
                                                            
                                                            <div className='text-[20px]'>
                                                                 <RiDeleteBin6Line  className='text-[red] mt-[3px] mx-[10px]'
                                                                      onClick={() => deleteQuestionInQuiz(index)}/>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  <div className=''>
                                                            <div className='flex flex-wrap mt-5'>
                                                                 {answers.map((answer, index) => {
                                                                      return (
                                                                           <>
                                                                           <p className='w-1/2' key={index}>
                                                                                <b className={exercise.correct_answer.includes(answer) ? "text-red-500" : "font-thin"}>{IDEA[index]}</b> : {answer}
                                                                           </p>
                                                                           </>
                                                                      )
                                                                 })}
                                                            </div>
                                                  </div>
                                             </div>
                                        )
                                   })}
                              </div>
                         </div>
                    </div>
                    <div className='w-1/2 h-full '>
                         <div className='w-full h-full p-5 bg-[#f5f5f5]'>
                              <h2 className='font-bold mb-5 text-2xl'> Question {indexQuestion=== "" ? "" :  indexQuestion+ 1}</h2>
                              <div>
                                   <input type="text" name="question" 
                                        id="question" 
                                        value={exercise.question?exercise.question:""}
                                        className="border border-slate-300 rounded-md py-2 px-5 shadow-sm focus:outline-none max-w-[100%] w-[80%]"
                                        onChange={changeQUestionInExercise}/>
                              </div>
                              {
                                   !exercise.answers ? <></> : 
                                   <div className='flex flex-wrap my-5'>
                                        {exercise.answers.length === 0 ? <></>: exercise.answers.map((answer, index) => {
                                             const isCorrect = exercise.correct_answer.includes(answer);
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
                              {Object.keys(exercise).length > 0 ? <div className='flex justify-between'>
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
                         <div className='mt-5'>
                              <button className={`p-2 w-fit rounded-[5px] text-[#f1f1f1] ${!isAddQuestion ? "bg-lime-500" : "bg-[red]"}`}
                              onClick={openFormAddQuestion}
                         >
                                   {!isAddQuestion?"Add Question":"Close Popup"}
                              </button>
                         </div>
                         <div>
                              {isAddQuestion? 
                              <div className='w-full h-full p-5 bg-[#f5f5f5] mt-5'>
                                  <h2 className='font-bold mb-5 text-2xl'>New Question</h2>
                                   <div>
                                        <input type="text"
                                             id="question" 
                                             value={dataNewExercise.question}
                                             name="newQuestions"
                                             className="border border-slate-300 rounded-md py-2 px-5 shadow-sm focus:outline-none max-w-[100%] w-[80%]"
                                             onChange={handleChangeNewQuestion}/>
                                   </div>
                                   {dataNewExercise.answers.map((answer, index) => {
                                        const isCorrect = dataNewExercise.correct_answer.indexOf(answer) !== -1;
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
                                        <div className='mt-3'>
                                             <label htmlFor="checkCorrect" className='font-bold'>is Correct ?</label> <br/>
                                             <input type="checkbox" name="checkCorrect" id="checkCorrect" ref={inputCheckCorrectAnswer} />
                                        </div>
                                   </div>:
                                   <></>
                                   }
                              </div> 
                              : <></>
                              }
                         </div>
                    </div> 
               </div>
               <div className='px-5 mt-5 mb-10 flex justify-center'>
                    <button className='p-2 w-fit bg-lime-500 rounded-[5px] text-[#f1f1f1]'
                         onClick={putDataUpdateQuiz}
                    >
                         Update Quiz
                    </button>
               </div>
          </>
     )
}

export default  TopicContent;