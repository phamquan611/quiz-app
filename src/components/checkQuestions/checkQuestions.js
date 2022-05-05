import React, { useState } from "react";
const CheckQuestions = ({questions,currentQuestion, setCurrentQuestion})=>{
const [value, setValue] =useState("")
    const handleCheck =(event)=>{
    setValue(event)
    console.log(questions[event].question);
}
console.log(value);
    return(
        <>
        <div>
            <div>
                <button value="1" onClick={()=>handleCheck(0)}>Question 1</button>
            </div>
            <div>
                <button value="2">Question 2</button>
            </div>
            <div>
                <button value="3">Question 3</button>
            </div>
            <div>
                <button value="4">Question 4</button>
            </div>
            <div>
                <button value="5">Question 5</button>
            </div>
            <div>
                <button value="6">Question 6</button>
            </div>
            <div>
                <button value="7">Question 7</button>
            </div>
            <div>
                <button value="8">Question 8</button>
            </div>
            <div>
                <button value="9" onClick={handleCheck}>Question 9</button>
            </div>
            <div>
                <button value="10">Question 10</button>
            </div>
        </div>
        </>
    )
}
export default CheckQuestions