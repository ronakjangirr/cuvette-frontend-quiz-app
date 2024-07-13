import React, { useState, useEffect } from 'react'
import styles from '../Analytics/Style.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ShareIcon from '@mui/icons-material/Share';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AnalyticsComponent({ onQnaClick }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const navigate = useNavigate();

  const handleDeleteClick = (quiz) => {
    setSelectedQuiz(quiz);
    setShowConfirmation(true);
  }

  const handleCancel = () => {
    setShowConfirmation(false);
  }

  const handleConfirmDelete = async () => {
    try {
      debugger
      // Assuming your API supports DELETE requests and the quizId is available in selectedQuiz
      await axios.delete(`http://localhost:4747/api/create/quiz/${selectedQuiz._id}`);
      // Refresh quizData after successful deletion
      const response = await axios.get('http://localhost:4747/api/create/quiz');
      setQuizData(response.data);
      
    } catch (error) {
      console.error('Error deleting quiz:', error);
    } finally {
      setSelectedQuiz(null);
      setShowConfirmation(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4747/api/create/quiz');
        setQuizData(response.data); // Assuming the API returns an array of quiz data
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchData();
  }, []); // Run the effect only once when the component mounts


  const showSelected = (id) => {
    // Use the onQnaClick prop function to navigate
    // onQnaClick(quizId);
    navigate(`/question-analysis/${id}`)
  };


  return (
    <>
      <div className={styles.main}>
        <h2 className={styles.heading}>Quiz Analysis</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.tableHeader}>
                <th>S.No.</th>
                <th>Quiz Name</th>
                <th>Created On</th>
                <th>Impression</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Share</th>
                <th>Question Wise Analysis</th>
              </tr>
            </thead>
            <tbody>
              {quizData.map((quiz, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{quiz.quizName}</td>
                  <td>{new Date(quiz.currentDateAndTime).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td>100</td>
                  <td className={styles.editIcon}>
                    <AppRegistrationIcon />
                  </td>
                  <td className={styles.deleteIcon} onClick={() => handleDeleteClick(quiz)}>
                    <DeleteForeverIcon />
                  </td>
                  <td className={styles.shareIcon}>
                    <ShareIcon />
                  </td>
                  <td className={styles.qnaLink} onClick={() => showSelected(quiz._id)}>
                    {/* <Link to="#" className={styles.qnaLink} onClick={onQnaClick}>
                    Question wise analysis
                  </Link> */}


                    {/* <Link to="#" className={styles.qnaLink} onClick={() => onQnaClick(quiz)}> */}
                      Question wise analysis
                    {/* </Link> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {
          showConfirmation && (
            <div className={styles.overlay}>
              <div className={styles.confirmationDialog}>
                <div className={styles.paragraphDiv}>
                  <p>Are you sure you want to delete?</p>
                </div>
                <div className={styles.flexButton}>
                  <button className={styles.confirmButton} onClick={handleConfirmDelete}>Confirm Delete</button>
                  <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default AnalyticsComponent