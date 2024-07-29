import React, { useState, useEffect, useRef } from 'react';
import './mcq.css'
import { db, auth } from '../../firebase';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import ReactPaginate from 'react-paginate';
import McqChild from './mcqchild';


function Mcq() {
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [score,setScore] = useState(0);
  const [total,setTotal] = useState(0);

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
    setTotal(total+totalPoint)
  }
 function getData2(point){
  setScore(score+point)
 }
  return (
    <div className='mcq-container'>
      <div className="mcq-content">
        <h4> your score is {score} out of {total}</h4>
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