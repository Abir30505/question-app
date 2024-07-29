import React, { useState, useRef } from 'react';
import './mcq.css';
import { db, auth } from '../../firebase';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';

function McqChild({mcq,index,mcqs,setMcq,getData,getData2}){
    const [lock, setLock] = useState(false);
    const [lockdata,setlockdata]= useState([])
    const [ans ,setAns]= useState('')
  
    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);
    const options = [option1, option2, option3, option4]
    function ansClick(e, checkans, mcqAns, mcqid) {
      if (! lockdata.includes(mcqid)) {
          if (checkans == mcqAns) {
            e.target.classList.add("correct");
            getData2(1)
          } else {
            e.target.classList.add("wrong");
            options[mcq.ans-1].current.classList.add('correct')
          }
    
          setlockdata([...lockdata, mcqid]);
          setAns(options[mcq.ans-1].current.textContent)
          getData(1)
        
          
       
        
      } 
     }

    async function handleDlt(id) {
        const mcqdoc = doc(db, "questions", id);
        await deleteDoc(mcqdoc);
        const newMcqs = mcqs.filter(mcq => mcq.id !== id);
        setMcq(newMcqs);
      }
    
     
    return(
      <>
        <div className="question-content" key={mcq.id}>
            <h1>{index + 1}.{mcq.question} ?</h1>
            <ul>
              <li  ref={option1} onClick={(e) => ansClick(e, 1, mcq.ans,mcq.id)}>{mcq.option1}</li>
              <li ref={option2}  onClick={(e) => ansClick(e, 2, mcq.ans,mcq.id)}>{mcq.option2}</li>
              <li ref={option3}  onClick={(e) => ansClick(e, 3, mcq.ans,mcq.id)}>{mcq.option3}</li>
              <li ref={option4}  onClick={(e) => ansClick(e, 4, mcq.ans,mcq.id)}>{mcq.option4}</li>
              <p>right Ans: {ans}</p>
            
              <div className='mcq-btn'>
                {auth.currentUser && mcq.authorId === auth.currentUser.uid ? (
                  <button className='button' onClick={() => handleDlt(mcq.id)}>Delete</button>
                ) : (
                  <></>
                )}
              </div>
            </ul>
          </div>
      </>
  
    )
  };
  
export default McqChild;  