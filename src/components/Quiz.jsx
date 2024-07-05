import React, { useState, useRef } from 'react'
import '../styles/quiz.css'
import { data } from '../assets/data'

export default function Quiz() {

  let [index,setIndex] = useState(1);
  let [question,setQuestion] = useState(data[index-1]);
  let [lock,setLock] = useState(false);
  let [score,setScore] = useState(0);
  let [result,setResult] = useState(false);

  let opt1 = useRef(null); 
  let opt2 = useRef(null);
  let opt3 = useRef(null);
  let opt4 = useRef(null);

  let optionsArray = [opt1,opt2,opt3,opt4];

  const checkAnswer = (e,ans) => {
    if(lock === false){
      if(question.ans == ans){
        e.target.classList.add('correct');
        setLock(true);
        setScore(prev => prev+1);
      }
      else{
        e.target.classList.add('wrong');
        optionsArray[question.ans-1].current.classList.add('correct');
        setLock(true);
      }
    }
  }

  const nextHandler = () => {
    if(lock === true){
      if(index === data.length) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index-1]);
      setLock(false);

      optionsArray.map( (option) => {
        option.current.className = "";
        return null;
      })
    }
  }

  const resetHandler = () => {
    setResult(false);
    setScore(0);
    setLock(false);
    setIndex(1);
    setQuestion(data[index-1]);
  }

  return (
    <>
    <div className="container">
        <h1>Quiz App</h1>
        <hr />
        {!result &&
        <>
        <h3>{index}.{question.question}</h3>
        <ul>
            <li onClick={(e)=>{checkAnswer(e,1);}} ref={opt1}>{question.option1}</li>
            <li onClick={(e)=>{checkAnswer(e,2);}} ref={opt2}>{question.option2}</li>
            <li onClick={(e)=>{checkAnswer(e,3);}} ref={opt3}>{question.option3}</li>
            <li onClick={(e)=>{checkAnswer(e,4);}} ref={opt4}>{question.option4}</li>
        </ul>
        <button onClick={nextHandler} type="button">Next</button>
        <p>{index} of {data.length} Questions</p>
        </>}
        {result &&
        <>
        <h2>You have Scored {score} out of {data.length}</h2>
        <button onClick={resetHandler}>Reset</button>
        </>
        }
    </div>
    </>
  )
}

