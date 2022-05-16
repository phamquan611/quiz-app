import React, { useEffect, useState } from 'react';
import { useLocation , NavLink, Switch , Route, Link, withRouter ,useHistory} from 'react-router-dom';
import Swal from "sweetalert2";
import ProfilePage from '@pages/profile';
import CategoryPage from '@pages/category';
import ActivityPage from '@pages/activity';
import CreateTopic from '@pages/createTopic';
import TopicContent from '@pages/topicContent';
import SessionTable from '@pages/session';
import withAdmin from "@middleware/withAdmin";

function AdminPage() {
  const history = useHistory();
  const location = useLocation();

  const clickLogout = () => {
      Swal.fire({
        title: 'Do you want logout page ?',
        showCancelButton: true,
        confirmButtonText: 'Logout',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
        localStorage.setItem("sessionId", "");
          history.push("/signin");
        } else if (result.isDenied) {
          Swal.fire('Do you want logout page.', '', 'info')
        }
      })
  }
  
  return (
    <>
        <div className='text-center bg-indigo-500 p-4  flex justify-between'>
            <div className='flex justify-left'>
            <div className='text-3xl font-bold text-[#50d71e] cursor-pointer w-[180px]'>PQ Quizz!!!</div>
            </div>
            <div className='flex'>
            <Link to={"/admin/profile"}>
            <div className='mr-2 cursor-pointer'>
                <img src="https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="img" className='w-[30px] h-[30px] rounded-full' />
            </div>
            </Link>
            <div className='font-bold pt-1 text-[white] cursor-pointer' onClick={clickLogout}>
                Logout 
            </div>
            </div>
        </div>

        <div className='flex justify-left bg-[#f5f5f5] px-4 py-5 mb-5'>
            <NavLink exact to="/admin"
                className={isActive => {return `'pt-1 font-bold flex mr-3 cursor-pointer hover:opacity-75 ' ${isActive ? "text-indigo-500" : "text-[#111111]"}`}}
            >
                Home
            </NavLink>
            <NavLink to="/admin/activity"
                className={isActive => {return `'pt-1 font-bold flex mr-3 cursor-pointer hover:opacity-75 ' ${isActive ? "text-indigo-500" : "text-[#111111]"}`}}
            >
                Activity
            </NavLink>
            <NavLink to="/admin/session-table"
                className={isActive => {return `'pt-1 font-bold flex mr-3 cursor-pointer hover:opacity-75 ' ${isActive ? "text-indigo-500" : "text-[#111111]"}`}}
            >
                Session
            </NavLink>
            <NavLink to="/admin/create-topic"
                className={isActive => {return `'pt-1 font-bold flex mr-3 cursor-pointer hover:opacity-75 ' ${isActive ? "text-indigo-500" : "text-[#111111]"}`}}
            >
                Create Quiz
            </NavLink>
        </div>

        <div>
            <Switch>
                <Route exact path="/admin" component={CategoryPage}/>
                <Route exact path="/admin/profile" component={ProfilePage} />
                <Route exact path="/admin/activity" component={ActivityPage} />
                <Route exact path="/admin/create-topic" component={CreateTopic} />
                <Route exact path="/admin/topic/:topicId" component={TopicContent} />
                <Route exact path="/admin/session-table" component={SessionTable} />
            </Switch>
        </div>
    </>
  )
}

export default withAdmin(AdminPage);