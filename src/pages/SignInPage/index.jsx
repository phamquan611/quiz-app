/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import {
  validationEmail,
  displayErrorMessage,
  LOCAL_ACCESS_TOKEN,
  ERROR_SIGN_IN,
} from "@utils";
import { adminRequireSignIn } from "@actions/admin.action";

const SignInPage = () => {
  const history = useHistory();
  const [isClickSignIn, setIsClickSignIn] = useState("NotClick");
  const dispatch = useDispatch();
  const adminStore = useSelector((state) => state.admin);

  useEffect(() => {
    const { adminToken, error } = adminStore;
    if (adminToken) {
      localStorage.setItem(LOCAL_ACCESS_TOKEN, adminStore.adminToken);
      Swal.fire("Well come to PQ quiz app .").then((result) => {
        if (result.isConfirmed) {
          return history.push("/admin");
        }
      });
    }
    if (error === ERROR_SIGN_IN && !adminToken) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: ERROR_SIGN_IN,
        showConfirmButton: false,
      });
    }
  }, [adminStore.adminToken, adminStore.error]);

  const validate = (values) => {
    const errors = {};
    if (!values.account) {
      errors.checkEmpty = "account or password cannot blank ";
    }

    if (!values.password) {
      errors.checkEmpty = "account or password cannot blank";
    }

    if (!validationEmail(values.account)) {
      errors.checkTypeAccount = "Invalid email address";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
    },
    validate,
    onSubmit: async () => {
      setIsClickSignIn(!isClickSignIn);
      return dispatch(adminRequireSignIn(formik.values));
    },
  });

  const { errors, touched } = formik;
  // alert message validation
  const alertValidation = () => {
    const { checkEmpty, checkTypeAccount } = errors;
    if ((checkEmpty && touched.account) || (checkEmpty && touched.password)) {
      return displayErrorMessage(checkEmpty);
    }
    if (checkTypeAccount && touched.account) {
      return displayErrorMessage(checkTypeAccount);
    }
  };
  return (
    <>
      <div className="flex-auto">
        <div className="mt-20 ml-5 text-3xl font-bold text-[#50d71e] cursor-pointer w-[180px]">
          PQ Quizz!!!
        </div>
      </div>
      <form className="w-full h-full mt-20" onSubmit={formik.handleSubmit}>
        <div className="mx-auto text-center font-bold text-2xl">
          Sign in with
          <b className="text-[#50d71e]">PQ Quizz!!!</b>
        </div>
        {/* alert message error account or password */}
        {alertValidation(errors, touched)}
        <div className="lg:w-1/3 md:w-2/3 sm:w-full max-w-full mx-auto mb-5 mt-5 px-4">
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Account
            </span>
            <input
              type="text"
              name="account"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.account}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Admin account"
            />
          </label>
        </div>
        <div className="lg:w-1/3 md:w-2/3 sm:w-full max-w-full mx-auto px-4">
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              password
            </span>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="password"
            />
          </label>
        </div>
        <div className="text-center mt-10">
          <button
            className="py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 rounded-lg hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

// const AlertMessage = (errors) => {

// }

export default SignInPage;
