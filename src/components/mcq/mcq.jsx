import React, { useState, useEffect, useRef } from 'react';
import './mcq.css'
import { db, auth } from '../../firebase';
import { collection, deleteDoc, getDocs, doc ,addDoc} from 'firebase/firestore';
import ReactPaginate from 'react-paginate';
import McqChild from './mcqchild';
import { useNavigate } from 'react-router-dom';


function Mcq() {
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [score,setScore] = useState(0);
  const [total,setTotal] = useState(0);
 const navigate = useNavigate()
   const mcqsPerPage = 5;

  useEffect(() => {
    const getDocsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "questions"));
        const mcqsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMcqs(mcqsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching MCQs:", error);
        setLoading(false);
      }
    };
    getDocsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

 

  const pagesVisited = pageNumber * mcqsPerPage;
  const displayMcqs = mcqs.slice(pagesVisited, pagesVisited + mcqsPerPage);
  const pageCount = Math.ceil(mcqs.length / mcqsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  function getData(totalPoint){
    setTotal(prevTotal => prevTotal + totalPoint)
  }
  
  function getData2(point){
    setScore(score + point)
  }
 async function handleSubmitAns(){

  if (auth.currentUser) {
  
    try {
      
      const docRef = await addDoc(collection(db, "scores"), {
        point: score,
        time:new Date().toLocaleTimeString() ,
        authorId: auth.currentUser.uid
      });
      console.log("scores written with ID: ", docRef.id);
      navigate('/dashboard')
     
    } catch (e) {
      console.error("Error adding score: ", e);
    }
  } else {
    console.error("User is not authenticated");
  }
}
  return (
    <div className='mcq-container'>
      <div className="mcq-content">
        <h4> your score is {score} out of {total} <button className='button' onClick={handleSubmitAns}>submit ans</button></h4>
      {displayMcqs.map((mcq, i) => (
        <McqChild mcq={mcq} index={i} mcqs={mcqs} setMcq={setMcqs} getData={getData} getData2={getData2}/>
        ))}
      
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default Mcq;