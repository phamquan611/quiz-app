import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation , NavLink, Switch , Route, Link} from 'react-router-dom';
import ProfilePage from '@pages/profile';
import CategoryPage from '@pages/category';
import ActivityPage from '@pages/activity';
import { withRouter ,useHistory} from 'react-router-dom';
import CreateTopic from '@pages/createTopic';
import TopicContent from '@pages/topicContent';

function AdminPage() {
  const history = useHistory();
  const [search, setSearchCategory] = useState("");
  const location = useLocation();

  const handleChangeSearch = (e) => {
    // setSearchCategory(e.target.value);
  }
  useEffect(() => {
    
  },[])
  return (
    <>
        <div className='text-center bg-indigo-500 p-4  flex justify-between'>
            <div className='flex justify-left'>
            <div className='text-3xl font-bold text-[#50d71e] cursor-pointer w-[180px]'>PQ Quizz!!!</div>
            <label>
                <input 
                    className="placeholder:italic text-bold placeholder:text-slate-400 block bg-white w-[300px] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                    placeholder="Search for anything..." 
                    type="text" 
                    name="search"
                    value={search}
                    onChange={handleChangeSearch}
                    />
                </label>
                <button className='py-2 px-4 bg-[#51ad32] text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-opacity-75 ml-2'>
                    Search
                </button>
            </div>
            <div className='flex'>
            <Link to={"/admin/profile"}>
            <div className='mr-2 cursor-pointer'>
                <img src="https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="img" className='w-[30px] h-[30px] rounded-full' />
            </div>
            </Link>
            <div className='font-bold pt-1 text-[white] cursor-pointer'>
                Admin 
            </div>
            </div>
        </div>

        <div className='flex justify-left bg-[#f5f5f5] px-4 py-5 mb-5'>
            <NavLink exact to="/admin"
                className={isActive => 'pt-1 font-bold flex mr-3 cursor-pointer hover:opacity-75 ' + (isActive ? "text-indigo-500" : "text-[#111111]" )}
            >
                    Home
            </NavLink>
            <NavLink to="/admin/activity"
                className={isActive => {
                            return 'pt-1 font-bold flex mr-3 cursor-pointer hover:opacity-75 ' + (isActive ? "text-indigo-500" : "text-[#111111]" )
                        }
                    }
            >
                    Activity
            </NavLink>
        </div>

        <div>
        <Switch>
                <Route exact path="/admin" render={() => <CategoryPage />} 
                />
                <Route exact path="/admin/profile" render={() => <ProfilePage/>} />
                <Route exact path="/admin/activity" render={() => <ActivityPage/>} />
                <Route exact path="/admin/create-topic" render={() => <CreateTopic/>} />
                <Route exact path="/admin/topic/:topicId" render={() => <TopicContent/>} />
                
        </Switch>
        </div>
    </>
  )
}

export default withRouter(AdminPage);