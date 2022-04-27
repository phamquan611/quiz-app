import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation , NavLink, Switch , Route} from 'react-router-dom';
import ProfilePage from '@pages/profile';
import CategoryPage from '@pages/category';
import ActivityPage from '@pages/activity';
import { withRouter } from 'react-router-dom';

function AdminPage() {
  const [content, setContent] = useState([]);
  const [categories, setGetCateGory] = useState([{category : "Sports", id : ""}, {category : "Musics"}, {category : "Movies"}, {category : "Finance"}, {category : "reactJS"}, 
                                          {category : "javascript"}, {category : "Html"}, {category : "CSS"}, {category : "VUE"}, {category : "Google"},{category :  "Ronaldo"}, {category : "Messi"}]);
  const [search, setSearchCategory] = useState("");
  const location = useLocation();

  const handleChangeSearch = (e) => {
    // setSearchCategory(e.target.value);
  }
  useEffect(() => {
    (async() => {
      const response = await axios.get("https://opentdb.com/api.php?amount=10&category=21&difficulty=hard");
      if(response.data){
        setContent(response.data)
      }
    })()
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
          <div className='mr-2 cursor-pointer'>
            <img src="https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="img" className='w-[30px] h-[30px] rounded-full' />
          </div>
          <div className='font-bold pt-1 text-[white] cursor-pointer'>
            Admin 
          </div>
        </div>
      </div>

      <div className='flex justify-left bg-[#f5f5f5] px-4 py-5 my-5'>
         <NavLink to="/admin"
            className={isActive => 'pt-1 font-bold flex mr-3 cursor-pointer hover:opacity-75' + (isActive ? "text-lime-500" : "text-[#111111]" )}
          >
              {/* <img 
                src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Home_Icon.svg" 
                alt="icon-home" 
                className='w-[28px] h-[28px]'
              /> */}
                Home
         </NavLink>
          <NavLink to="/admin/activity"
            className={isActive => 'pt-1 font-bold flex mr-3 cursor-pointer hover:opacity-75' + (isActive ? "text-lime-500" : "text-[#111111]" )}
          >
                Activity
          </NavLink>
      </div>

      <div>
      <Switch>
              <Route exact path="/admin" render={() => <CategoryPage 
                                                          categories = {categories}
                                                />} 
              />
              <Route exact path="/admin/profile" component={ProfilePage} />
              <Route exact path="/admin/activity" component={ActivityPage} />
      </Switch>
      </div>
    </>
  )
}

export default withRouter(AdminPage);