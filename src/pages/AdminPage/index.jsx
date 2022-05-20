import React from "react";
import {
  NavLink, Link, Switch, Route,
} from "react-router-dom";
import Session from "@pages/AdminPage/Session";
import HomeAdmin from "@pages/AdminPage/Home";
import QuizWithId from "@pages/AdminPage/QuizWithId";

const AdminPage = () => {
  return (
    <>
      <div className="text-center bg-indigo-500 p-4  flex justify-between">
        <div className="flex justify-left">
          <div className="text-3xl font-bold text-[#50d71e] cursor-pointer w-[180px]">
            PQ Quizz!!!
          </div>
        </div>
        <div className="flex">
          <Link to="/admin/profile">
            <div className="mr-2 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                alt="img"
                className="w-[30px] h-[30px] rounded-full"
              />
            </div>
          </Link>
          <div className="font-bold pt-1 text-[white] cursor-pointer">
            Admin
          </div>
        </div>
      </div>

      <div className="flex justify-left bg-[#f5f5f5] px-4 py-5 mb-5">
        <NavLink
          exact
          to="/admin"
          activeClassName="text-indigo-900"
          className="pt-1 font-bold flex mr-3 cursor-pointer hover:opacity-75"
        >
          Home
        </NavLink>
        <NavLink
          exact
          to="/admin/activity"
          activeClassName="text-indigo-900"
          className="pt-1 font-bold flex mr-3 cursor-pointer hover:opacity-75"
        >
          Activity
        </NavLink>
        <NavLink
          exact
          to="/admin/session"
          activeClassName="text-indigo-900"
          className="pt-1 font-bold flex mr-3 cursor-pointer hover:opacity-75"
        >
          Session
        </NavLink>
        <NavLink
          exact
          to="/admin/create-quiz"
          activeClassName="text-indigo-900"
          className="pt-1 font-bold flex mr-3 cursor-pointer hover:opacity-75"
        >
          CreateQuiz
        </NavLink>
      </div>

      <div>
        <Switch>
          <Route exact path="/admin" component={HomeAdmin} />
          {/* <Route exact path="/admin/activity" component={Activity} />
                      <Route exact path="/admin/create-quiz" component={CreateQuiz} /> */}
          <Route
            exact
            path="/admin/quiz/:quizId"
            component={QuizWithId}
          />
          <Route exact path="/admin/session" component={Session} />
        </Switch>
      </div>
    </>
  );
};

export default AdminPage;
