import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {RiDeleteBin6Line, RiAddCircleFill, RiMessage2Line, RiAddLine} from "react-icons/ri";
import {FcCheckmark} from "react-icons/fc";
import {url} from "@services/http";
import { IDEA } from '@utils';
import Error from '@pages/error';

export default function TopicContent() {
     const params = useParams();
     const history = useHistory();
     const [quiz, setQuiz] = useState([]);
     const [questions, setChangeQuestions] = useState([]);
     const [exercise, setExercise] = useState({});
     const [indexQuestion , setGetIndexQuestion] = useState("");
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

     const openPopupQuestion = (exercise, index) => {
          setExercise(exercise);
          setGetIndexQuestion(index);
     }

     const handleChangeExercise = () => {
          // TODO script
     }

     const handleChangeAnswer = () => {
          // TODO script
     }

     const openFormAddExercise = () => {
          // TODO script
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
                                        const {answers} = exercise;
                                        return (
                                             <div key={index} className=" w-full mb-5 cursor-pointer"
                                                  onClick={() => openPopupQuestion(exercise,index)}
                                             >
                                                  <div className='mr-4 flex'>
                                                       {/* <img src="https://quizizz.com/_media/quizzes/eb941239-93b6-42f0-95f7-3e5e896744ee_200_200" 
                                                            alt="img" 
                                                            className='w-[100px] h-auto mr-5'
                                                       /> */}
                                                       
                                                       <div className=''id={`question${index+1}`} >
                                                            <b>{index+1}</b><b className='mr-1'>.</b><b>Question</b> : {exercise.question}
                                                       </div>
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
                                        value={!exercise.question ? "" : exercise.question }
                                        className="border border-slate-300 rounded-md py-2 px-5 shadow-sm focus:outline-none max-w-[100%] w-[80%]"
                                        onChange={handleChangeExercise}/>
                              </div>
                              {
                                   !exercise.answers ? <></> : 
                                   <div className='flex flex-wrap my-5'>
                                        {exercise.answers.length === 0 ? <></>: exercise.answers.map((answer, index) => {
                                             const isCorrect = exercise.correct_answer.includes(answer);
                                                  return (
                                                       <div className='w-full flex justify-between mb-3' key={index}>
                                                            <div className="flex">
                                                                      {IDEA[index]}: {answer}
                                                                      {isCorrect?<FcCheckmark className='cursor-pointer text-[20px] font-bold ml-3 ' /> : <></>}
                                                            </div>
                                                            <div className='flex'>
                                                                 <RiMessage2Line className='cursor-pointer text-[20px] '/>
                                                                 <RiDeleteBin6Line className='cursor-pointer text-[20px] text-[red] ml-2'/>
                                                            </div>
                                                       </div>
                                                  )
                                             }) 
                                        }
                                   </div>
                              }
                              <div className='flex justify-between'>
                                   <p className='text-[#13a7e9] w-fit rounded-[5px] cursor-pointer flex p-2 hover:bg-emerald-400'>Add answer <RiAddLine className='mt-1 ml-1' /></p>
                                   <button className='p-2 w-fit bg-lime-500 rounded-[5px] text-[#f1f1f1]'>
                                        Update question
                                   </button>
                              </div>
                         </div>
                         <div className='mt-5'>
                              <button className='p-2 w-fit bg-lime-500 rounded-[5px] text-[#f1f1f1]'
                              onClick={openFormAddExercise}
                         >
                                   Add Question
                              </button>
                         </div>
                    </div> 
               </div>
               <div className='px-5 mt-5 mb-10 flex justify-center'>
                    <button className='p-2 w-fit bg-lime-500 rounded-[5px] text-[#f1f1f1]'>
                         Synchronous with database server 
                    </button>
               </div>
          </>
     )
}
