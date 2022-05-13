import React , {useState, useEffect}from 'react';
import { withRouter, Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import {url} from "@services/http";
 function CategoryPage(props) {
    const history = useHistory();
    const [quizzes, setQuizzes] = useState([]);

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
        })()
      },[]);

  return (
    <div className='mb-10'>
        <div className='flex flex-wrap'>
            {quizzes.map((quiz, index) => {
                return (
                        <div className='w-1/4 px-4 pb-5 mb-5' 
                            key={quiz._id}
                            onClick={() => history.push(`/admin/topic/${quiz._id}`)}
                        >
                            <img src="https://png.pngtree.com/thumb_back/fh260/background/20211031/pngtree-abstract-bg-image_914283.png" 
                                alt="quiz" 
                                className='w-full h-[200px] cursor-pointer'
                            />
                            <div className='cursor-pointer text-center font-bold mt-2'>
                                {quiz.category} 
                            </div>
                            <div className='cursor-pointer h-[200px]  leading-5 text-ellipsis overflow-hidden md:text-clip'>
                                {quiz.description}
                            </div>
                        </div>
                )
            })}
        </div>
        <div>
            <Link to="/admin/create-topic"> 
                <button className='py-2 px-4 bg-[#51ad32] text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-opacity-75 ml-2'>
                    Create Quiz +
                </button>
            </Link>
        </div>
    </div>
  )
}

export default CategoryPage;
