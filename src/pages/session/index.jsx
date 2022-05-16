import React , {useState, useEffect, useRef}from 'react';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { INITIAL_VALUES ,
        convertMinuteToMilliseconds,
        getTimeStamp,
        currentDate
        }
from '@utils';
import ListSessions from "@pages/listSession";
import {url} from "@services/http";


function SessionTable() {
    const history = useHistory();
    const [quizzes, setQuizzes] = useState([]);
    const [listSessions, setSessions] = useState([]);
    const [values, setValues] = useState(INITIAL_VALUES);
    const timeChallenge = useRef({});
    const dateChoose = useRef(null)
    const quizId = useRef({});
    useEffect(() => {
        (async() => {
            try{
                const resQuizzes = await axios.get(url + "/quizzes");

                if(resQuizzes?.data){
                    return setQuizzes(resQuizzes.data)
                }
            }catch(err){
                console.log(err)
            }
        })();
    },[]);

    useEffect(() => {
    },[quizzes.length]);

    const submitSession = async() => {
        // const 
        const dateTest  = dateChoose.current.value;

        const timeStartToTimeStamp = getTimeStamp(`${dateTest} ${values.timeStart}`);
        const timeEndToTimeStamp = getTimeStamp(`${dateTest} ${values.timeEnd}`);
        
        if(timeEndToTimeStamp < currentDate){
            return Swal.fire("The test date cannot be a time in the past");
        }

        if(timeStartToTimeStamp >= timeEndToTimeStamp ) {
            return Swal.fire("The start time must be less than the end time")
        };
        
        
        const newValues = {...values, date : dateTest};
        const newSession = {...newValues, 
                            quizId : quizId.current.value, 
                            timeChallenge : timeChallenge.current.value , 
                            timeStart : timeStartToTimeStamp,
                            timeEnd : timeEndToTimeStamp
                        };
        const postSession = await axios.post(`${url}/post-sessions`, newSession);
        console.log(postSession);
        if(postSession.data.success){
            Swal.fire({
                title: 'Add session successfully',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            }).then(async(result) => {
                if(result.isConfirmed){
                    const resSessions = await axios.get(`${url}/sessions`);

                    if(resSessions?.data){
                        setSessions(resSessions.data)
                    }
                }
            })
        }

    }

    

    const handleChangeInput = (e) => {
        return setValues({...values, [e.target.name] : e.target.value} )
    }

    return (
        <div className='flex px-[15px] py-[20px] justify-between mb-[50px]'>
            <div className='w-[30%]'>
                <div className="text-2xl font-bold mb-[20px]">
                    Create Sessions
                </div>
                <div> 
                    <div className='w-full flex mb-[20px]'>
                        <label htmlFor="time-start" className='mr-[20px]  min-w-[130px]'><b className='font-bold'>Quiz : </b> 
                        </label>
                            <select className='appearance-none font-bold px-[10px] py-[7px] flex-1 border border-2 border-[black] rounded-[5px]'ref={quizId}> 
                                {quizzes.map((quiz, index) => {
                                    return (
                                        <option key={index} value={quiz._id} className='font-bold'>
                                            {quiz.category}
                                        </option>
                                    )
                                })}
                            </select>
                    </div>
                    <div className='w-full flex mb-[20px]'>
                        <label htmlFor="date" className='mr-[20px] min-w-[130px]'>
                            <b className='font-bold '>Date : </b>
                        </label>
                        <input type="date" onChange={handleChangeInput} id='date' name='date' ref = {dateChoose}
                        value={values.date?values.date:moment(currentDate).format("YYYY-MM-DD")}
                            className='flex-1 border border-2 border-[black] rounded-[5px] px-[10px] py-[7px]'
                        />
                    </div>
                    <div className='w-full flex mb-[20px]'>
                        <label htmlFor="timeStart" className='mr-[20px] min-w-[130px]'>
                            <b className='font-bold '>Time start : </b>
                        </label>
                            <input type="time" id='timeStart' name='timeStart' value={values.timeStart}
                            className='flex-1 border border-2 border-[black] rounded-[5px] px-[10px] py-[7px]'
                            onChange={handleChangeInput}/>
                    </div>
                    <div className='w-full flex mb-[20px]'>
                        <label htmlFor="timeEnd" className='mr-[20px] min-w-[130px]'>
                            <b className='font-bold '>Time end : </b>
                        </label>
                            <input type="time" id='timeEnd' name='timeEnd' value={values.timeEnd} 
                            className='flex-1 border border-2 border-[black] rounded-[5px] px-[10px] py-[7px]'
                            onChange={handleChangeInput}/>
                    </div>
                    <div className='w-full flex mb-[20px]'>
                        <label htmlFor="timeChallenge" className='mr-[20px] min-w-[130px]'>
                            <b className='font-bold '>Time challenge : </b>
                        </label>
                            <select name="timeChallenge" id="timeChallenge"
                            className='flex-1 border border-2 border-[black] rounded-[5px] px-[10px] py-[7px] appearance-none' 
                            onChange={handleChangeInput} ref={timeChallenge}>
                                <option value= {convertMinuteToMilliseconds(5)}>05:00</option>
                                <option value={convertMinuteToMilliseconds(10)}>10:00</option>
                                <option value={convertMinuteToMilliseconds(15)}>15:00</option>
                            </select>
                    </div>
                </div>
                <div>
                <button 
                        className='py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 rounded-lg hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75'
                        type='submit'
                        onClick={submitSession}
                    >
                        Create Session
                    </button>
                </div>
            </div>
            <div className='w-[58%]'>
                <ListSessions updateSessions={listSessions} />
            </div>
        </div>
    )
}

export default SessionTable;
