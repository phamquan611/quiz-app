import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { validationEmail ,displayErrorMessage} from '@utils';
import {url} from "@services/http";
import Swal from "sweetalert2";

export default function SignInPage() {
    const history = useHistory();
    const [input, setInput] = useState({account : "", password : ""});
    const [incorrectInput, setIncorrectInput] = useState(false);

    const validate = values => {
        const errors = {};
        if(!values.account ){
            errors.checkEmptyAccount = "account or password cannot blank ";
        }

        if(!values.password){
            errors.checkEmptyPassword = "account or password cannot blank";
        }

        if(!validationEmail(values.account)){
            errors.checkAccount = "Invalid email address";
        }


        return errors;
    }
    
    const formik = useFormik({
        initialValues : {
            account : "",
            password : ""
        }, validate,
        onSubmit :  values => {
            (async() => {
                try{
                    const dataManager = await axios.post(`${url}/require-login`, formik.values);
                    const manager = dataManager.data;

                    if(manager?.error){
                        return Swal.fire(`${manager.error}`)
                    }

                    localStorage.setItem("sessionId", manager._id);
                    return Swal.fire("You sign in successfully").then((result) => {
                        if(result.isConfirmed){
                            setTimeout(history.push("/admin"), 2500)
                        }
                    })
                }catch(err){
                    console.log(err);
                }
            })()
        }
    })

    const {errors, touched} = formik;

    return (
            <>
            <div className='flex-auto'>
                <div className='mt-20 ml-5 text-3xl font-bold text-[#50d71e] cursor-pointer w-[180px]'>PQ Quizz!!!</div>
            </div>
            <form className='w-full h-full mt-20' onSubmit={formik.handleSubmit}>
                <div className='mx-auto text-center font-bold text-2xl'>Sign in with <b className='text-[#50d71e]'>PQ Quizz!!!</b></div>
                {   errors.checkEmptyAccount && touched.account ? displayErrorMessage(errors.checkEmptyAccount) : 
                    errors.checkEmptyPassword && touched.password ? displayErrorMessage(errors.checkEmptyPassword) : 
                    errors.checkAccount && touched.account ?displayErrorMessage(errors.checkAccount): 
                    incorrectInput?displayErrorMessage(errors.incorrect):null
                } 
                <div className='lg:w-1/3 md:w-2/3 sm:w-full max-w-full mx-auto mb-5 mt-5 px-4'>
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
                <div className='lg:w-1/3 md:w-2/3 sm:w-full max-w-full mx-auto px-4'>
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
                <div className='text-center mt-10'> 

                <button 
                    className='py-2 px-4 bg-[#51ad32] text-white font-semibold opacity-75 rounded-lg hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-opacity-75'
                    type='submit'
                >
                    Sign In
                </button>
                </div>
            </form>
            </>
    )
}
