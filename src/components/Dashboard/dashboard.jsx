import React, { useState, useEffect } from 'react';
import './dashboard.css'
import {auth, db } from '../../firebase';
import { collection, getDocs,doc ,deleteDoc} from 'firebase/firestore';

function DashboardChild({ score ,allscores,setAllScore}) {
  async function handleDlt(id) {
    const allscoredoc = doc(db, "scores", id);
    await deleteDoc(allscoredoc);
    const newScore = allscores.filter(score => score.id !== id);
    setAllScore(newScore);
  }

  return (
    <div className='dashboard-item'>
      <h5>{auth.currentUser.email}</h5>
      <h5>Score: {score.point}</h5>
      <p>{score.time}</p>

     <div className='dashboard-btn'>
     {auth.currentUser && score.authorId === auth.currentUser.uid ? (
       <button className='button' onClick={() => handleDlt(score.id)}>Delete</button>
     ) : (
       <></>
     )}
   </div>
   </div>
  );
}

function Dashboard() {
  const [allscores, setAllScore] = useState([]);

  useEffect(() => {
    const getDocsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "scores"));
        const Data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAllScore(Data);
      } catch (error) {
        console.error("Error fetching score:", error);
      }
    };
    getDocsData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="individual-score">
        {allscores.map((score, i) => (
          <div className='dashboard-item' key={i}>
            <DashboardChild score={score} allscores={allscores} setAllScore={setAllScore}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;