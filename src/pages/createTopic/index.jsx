import React, { useState } from 'react';
import {RiDeleteBin6Line, RiAddCircleFill, RiMessage2Line, RiAddLine,RiCloseCircleFill} from "react-icons/ri";
import {FcCheckmark} from "react-icons/fc";

export default function CreateTopic() {
    const [quizTitle, setGetQuizTitle] = useState("");
    const [questions, setGetQuestions] = useState([]);
    const [isToggleOpenForm, setHandleToggleForm] = useState(false);

    const handleChangeQuizTitle = (e) => {
        setGetQuizTitle(e.target.value)
    }

    const handleChangeQuestion = () => {
        // TODO
    }

    const openFormCreateQuiz = () => {
        if(!quizTitle){
            return ;
        }
        
        setHandleToggleForm(!isToggleOpenForm)
    }

    const clickCreateQuestion = () => {
        // TODO
    }

    return (
        <div className='w-full px-5'>
            <div className='w-[800px] p-5 max-w-full mx-auto bg-[#f5f5f5]'>
                {
                    !isToggleOpenForm ? 
                    <div>
                        <label htmlFor="quizTitle" className='cursor-pointer'>
                            <span className='text-2xl'>
                                Quiz Title
                            </span>
                            <br />
                            <input type="text" value={quizTitle} onChange={handleChangeQuizTitle}
                                className="p-2 w-full border-2 border-solid border-black mt-2 rounded-[7px]"
                                id='quizTitle'
                            />
                        </label>
                        <button className='w-fit bg-[#13a7e9] p-3 my-4 rounded-[7px]' onClick={openFormCreateQuiz}>
                            Add New Quiz
                        </button>
                    </div> :
                    <div>
                        <div className='flex justify-between'>
                            <h2 className='text-2xl align-center'>
                                QUIZ TITLE : {quizTitle}
                            </h2>
                            <RiCloseCircleFill className='text-2xl mt-1 text-[red] cursor-pointer' onClick={openFormCreateQuiz}/>
                        </div>
                        <div className='mt-5'>
                              <button className='p-2 w-fit bg-lime-500 rounded-[5px] text-[#f1f1f1]'
                              onClick={clickCreateQuestion}
                         >
                                   Add Question
                              </button>
                         </div>
                    </div>
                }
                {/* <div className='text-[10px] mt-4 mx-5'>
                    question choice
                </div>
                <div className='max-w-full bg-[black] px-10 h-[2px] mb-3 mx-5'>
                </div>
                <div className='flex'>
                    <label htmlFor="question" className='cursor-pointer pt-4'>
                        <span className='w-fit p-2'>
                            New question : 
                        </span>
                    </label>
                        <input type="text" value={quizTitle} onChange={handleChangeQuestion}
                            className="p-2 max-w-full border-2 border-solid border-black mt-2 flex-1"
                            id='quizId'
                        />
                </div> */}
            </div>
            <div>
                <ul>
                    {questions.map((question) => {
                            return(
                                <div>

                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
