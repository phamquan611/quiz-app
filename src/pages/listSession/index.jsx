import React, { useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import {url} from "@services/http";
import { currentDate, getTimeStamp, convertTimeStampToDateTime, 
    convertMillisecondToMinute, sortForDate
    }
from '@utils';

function ListSessions(props) {
    const [sessions, setSessions] = useState([]);
    const {updateSessions} = props;
    useEffect(() => {
        (async() => {
            try{
                const sessions = await axios.get(`${url}/sessions`);
                // console.log(sessions.data)]
                if(!sessions?.data){
                    
                }
                setSessions(sessions.data);
            }catch(err){
                console.log(err)
            }
        })()
    }, []);

    useEffect(() => {
        setSessions(updateSessions);
    },[updateSessions.length])
    

  return (
    <>
        <div className='flex justify-left bg-[#f5f5f5] px-4 py-5 mb-5 font-bold'>
                List Sessions
        </div>
        <div>
        <table className="table-auto border-collapse w-full mx-auto">
            <thead >
                <tr className=''>
                    <th className='text-left border border-slate-300'>No.</th>
                    <th className='text-left border border-slate-300'>ID</th>
                    <th className='text-left border border-slate-300'>Date</th>
                    <th className='text-left border border-slate-300'>Time Start</th>
                    <th className='text-left border border-slate-300'>Time End</th>
                    <th className='text-left border border-slate-300'>Time Challenge</th>
                    <th className='text-left border border-slate-300'>Status</th>
                </tr>
            </thead>
            <tbody>
                {sessions.sort(sortForDate).map((session, index) => {
                    const {date, timeStart, timeEnd, _id, timeChallenge} = session;
                    return (
                        <tr key={session._id}>
                            <td className='cursor-pointer border border-slate-300'>{index+1}</td>
                            <td className='cursor-pointer border border-slate-300'>{_id}</td>
                            <td className='cursor-pointer border border-slate-300'>{moment(date).format("DD-MM-YYYY")}</td>
                            <td className='cursor-pointer border border-slate-300'>{convertTimeStampToDateTime(timeStart)}</td>
                            <td className='cursor-pointer border border-slate-300'>{convertTimeStampToDateTime(timeEnd)}</td>
                            <td className='cursor-pointer border border-slate-300'>{convertMillisecondToMinute(timeChallenge)}</td>
                            <td className={`cursor-pointer border border-slate-300 ${getTimeStamp(timeEnd) < currentDate ? "text-[red]" : 
                                            getTimeStamp(timeStart) < currentDate && getTimeStamp(timeEnd) > currentDate ? "text-[blue]":
                                            "text-[green]"}`
                            }>
                                {getTimeStamp(timeEnd) < currentDate ? "Expires" : 
                                getTimeStamp(timeStart) < currentDate && getTimeStamp(timeEnd) > currentDate ? "Happening":
                                "Waiting" 
                                }
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
    </>
  )
}

export default ListSessions;
