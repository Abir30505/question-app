import React, { useState } from 'react';
import './addmcq.css'
import { auth, db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function AddMcq() {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [ans,setAns] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "questions"), {
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        ans:ans,
        authorId: auth.currentUser.uid
      });
      console.log("Document written with ID: ", docRef.id);
      setQuestion('');
      setOption1('');
      setOption2('');
      setOption3('');
      setOption4('');
      navigate('/mcq');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  };

  return (
    <div className="add-question-container">
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
        </label>
        <label>
          Option 1:
          <input type="text" value={option1} onChange={(e) => setOption1(e.target.value)} />
        </label>
        <label>
          Option 2:
          <input type="text" value={option2} onChange={(e) => setOption2(e.target.value)} />
        </label>
        <label>
          Option 3:
          <input type="text" value={option3} onChange={(e) => setOption3(e.target.value)} />
        </label>
        <label>
          Option 4:
          <input type="text" value={option4} onChange={(e) => setOption4(e.target.value)} />
        </label>
        <label>
          Answer no:
          <input placeholder='only digit supported!' type="text" value={ans} onChange={(e) => setAns(e.target.value)} />
        </label>
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}

export default AddMcq;