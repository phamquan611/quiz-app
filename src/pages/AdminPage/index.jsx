import React from "react";
import { useDispatch } from "react-redux";
import {
  NavLink, Switch, Route, useHistory,
} from "react-router-dom";
import Swal from "sweetalert2";
import { adminSignOut } from "@actions/admin.action";
import { LOCAL_ACCESS_TOKEN } from "@utils";
import Session from "@pages/AdminPage/Session";
import HomeAdmin from "@pages/AdminPage/Home";
import Quiz from "@pages/AdminPage/Quiz";
import CreateQuiz from "@pages/AdminPage/CreateQuiz";
import Participants from "@pages/AdminPage/Participants";

const AdminPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const clickSignOut = () => {
    Swal.fire({
      title: "Are you sure sign out page",
      showDenyButton: true,
      confirmButtonText: "YES",
      denyButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(adminSignOut());
        localStorage.setItem(LOCAL_ACCESS_TOKEN, "");
        history.push("/signin");
      }
    });
  };
  return (
    <>
      <div className="text-center bg-indigo-500 p-4  flex justify-between">
        <div className="flex justify-left">
          <div className="text-3xl font-bold text-[#50d71e] cursor-pointer w-[180px]">
            PQ Quizz!!!
          </div>
        </div>
        <div className="flex">
          <div className="font-bold pt-1 text-[white] cursor-pointer" onClick={clickSignOut}>
            Logout
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
          <Route exact path="/admin/session/participants/:sessionId" component={Participants} />
          <Route exact path="/admin/create-quiz" component={CreateQuiz} />
          <Route
            exact
            path="/admin/quiz/:quizId"
            component={Quiz}
          />
          <Route exact path="/admin/session" component={Session} />
        </Switch>
      </div>
    </>
  );
};

export default AdminPage;
