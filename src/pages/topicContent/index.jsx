import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {url} from "@services/http";

export default function TopicContent() {
     const [questions, setGetQuestions] = useState([]);
     const [titleTopic, setGetTitleTopic] = useState("Title");
     const params = useParams();
     const topicId = params.topicId;
     const watchDetailQuestion = () => {

     }
     useEffect(() => {
          (async() => {
               const resQuiz = await axios.get(url + "/quizzes/" + topicId);
               if(resQuiz.data){
                    setGetQuestions(resQuiz.data[0].questions);
                    setGetTitleTopic(resQuiz.data[0].category)
               };
          })()
     },[])
  return (
       <>
          <div className='w-full mx-10 mb-5'>
               <div className='w-[100px] flex'>
                    <img src="https://png.pngtree.com/thumb_back/fh260/background/20211031/pngtree-abstract-bg-image_914283.png" 
                         alt="category" 
                         className='w-full h-[100px] cursor-pointer'
                         />
                    <div className='pl-5'>
                         <div className='text-2xl font-bold'>
                              {titleTopic}
                         </div>
                         <div>
                              description...
                         </div>
                    </div>

               </div>
          </div>
          <div className="flex">
               <div className='mx-10 mb-10'>
                    {questions.map((question, index) => {
                         return (
                              <div className='w-[160px] mb-1' key={question.question}>
                                   <div className='flex py-1 px-3 bg-indigo-500 cursor-pointer rounded-sm'>
                                        <div className='font-bold text-[#f1f1f1]'
                                             onClick={watchDetailQuestion}
                                        >
                                            <a href={`#question${index + 1}`}> Question {index + 1} <b className='text-[yellow]'>*_*</b></a>
                                        </div>
                                        <input type="hidden" name="" />
                                   </div>
                    </div>
                         )
                    })}
               </div>
               <div className='h-full p-4 bg-[#f5f5f5]]'>
                    <div>
                         <div className='text-2xl font-bold'>
                         Question 1 of {questions.length}
                         </div>
                         {questions.map((question, index) => {
                              const {answers} = question;
                              return (
                                   < >
                                        <div className='font-bold mt-3' key={question.question}>
                                        <b>{index+1}</b><b className='text-[red] mr-2'>.</b>Question 
                                        </div>
                                        <div id={`question${index+1}`}>
                                             How many times did Martina Navratilova win the Wimbledon Singles Championship?
                                        </div>
                                        {answers.length === 2 ? 
                                             <>
                                                   <div className='flex flex-wrap mt-5'>
                                                       <div className='w-1/2'><b className='font-bold'>A</b>. {answers[0]}</div>
                                                       <div className='w-1/2'><b className='font-bold'>B</b>. {answers[1]}</div>
                                                  </div>
                                             </> :
                                             <>
                                                  <div className='flex flex-wrap mt-5'>
                                                       <div className='w-1/4'><b className='font-bold'>A</b>. {answers[0]}</div>
                                                       <div className='w-1/4'><b className='font-bold'>B</b>. {answers[1]}</div>
                                                       <div className='w-1/4'><b className='font-bold'>C</b>. {answers[2]}</div>
                                                       <div className='w-1/4'><b className='font-bold'>D</b>. {answers[3]}</div>
                                                  </div>
                                             </>}
                                   </>
                              )
                         })}
                    </div>
               </div>
          </div>
       </>
  )
}
