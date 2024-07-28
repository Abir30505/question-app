import React, { useState, useEffect, useRef } from 'react';
import './mcq.css'
import { db, auth } from '../../firebase';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { OperationType } from 'firebase/auth';
import ReactPaginate from 'react-paginate';

function Mcq() {
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lock, setLock] = useState(false);
  const [lockdata,setlockdata]= useState([])
  const [ans ,setAns]= useState('')
  const option1 = useRef(null)
  const option2 = useRef(null)
  const option3 = useRef(null)
  const option4 = useRef(null)
  const options = [option1,option2,option3,option4]
  const [pageNumber, setPageNumber] = useState(0);
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

  async function handleDlt(id) {
    const mcqdoc = doc(db, "questions", id);
    await deleteDoc(mcqdoc);
    const newMcqs = mcqs.filter(mcq => mcq.id !== id);
    setMcqs(newMcqs);
  }

  function ansClick(e, checkans, mcqAns, mcqid) {
    if (! lockdata.includes(mcqid)) {
      if (!lock) {
        if (checkans == mcqAns) {
          e.target.classList.add("correct");
        } else {
          e.target.classList.add("wrong");
          options[mcqAns-1].current.add.classList(correct)
        }
  
        setlockdata([...lockdata, mcqid]);
     
      }
    }

  }

  const pagesVisited = pageNumber * mcqsPerPage;
  const displayMcqs = mcqs.slice(pagesVisited, pagesVisited + mcqsPerPage);
  const pageCount = Math.ceil(mcqs.length / mcqsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className='mcq-container'>
      <div className="mcq-content">
        {displayMcqs.map((mcq, i) => (
          <div className="question-content" key={mcq.id}>
            <h1>{i + 1}.{mcq.question} ?</h1>
            <ul>
              <li ref={option1}  onClick={(e) => ansClick(e, 1, mcq.ans,mcq.id)}>{mcq.option1}</li>
              <li ref={option2} onClick={(e) => ansClick(e, 2, mcq.ans,mcq.id)}>{mcq.option2}</li>
              <li ref={option3} onClick={(e) => ansClick(e, 3, mcq.ans,mcq.id)}>{mcq.option3}</li>
              <li ref={option4} onClick={(e) => ansClick(e, 4, mcq.ans,mcq.id)}>{mcq.option4}</li>
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