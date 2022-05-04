import React , {useState, useEffect}from 'react'
import { withRouter, Link, useHistory} from 'react-router-dom';
import {url} from "@services/http";
import axios from 'axios';

 function CategoryPage(props) {
    const history = useHistory();
    const [quizzes, setGetQuizzes] = useState([]);

    useEffect(() => {
        (async() => {
            const resQuizzes = await axios.get(url + "/quizzes");
            setGetQuizzes(resQuizzes.data);
        })()
      },[]);

  return (
    <div className='mb-10'>
        <div className='flex flex-wrap'>
            {quizzes.map((quiz) => {
                return (
                        <div className='w-1/4 px-4 pb-5 mb-5' 
                            key={quiz.category}
                            onClick={() => history.push(`/admin/topic/${quiz._id}`)}
                        >
                                <img src="https://png.pngtree.com/thumb_back/fh260/background/20211031/pngtree-abstract-bg-image_914283.png" 
                                alt="quiz" 
                                className='w-full h-[200px] cursor-pointer'
                                />
                                <div className='cursor-pointer text-center font-bold mt-2'>
                                    {quiz.category}
                                </div>
                                <div className='cursor-pointer'>
                                    {quiz.description.substring(0, 300) + "..."}
                                </div>
                        </div>
                )
            })}
        </div>
        <div>
            <Link to="/admin/create-topic"> 
                <button className='py-2 px-4 bg-[#51ad32] text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-opacity-75 ml-2'>
                    Create Topic +
                </button>
            </Link>
        </div>
    </div>
  )
}

export default withRouter(CategoryPage);
