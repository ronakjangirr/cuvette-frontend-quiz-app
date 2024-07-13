import React, { useEffect, useState } from 'react';
import styles from '../Qna.jsx/Style.module.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function QnaComponent() {
  const {quizId} = useParams();
  const [quizData, setQuizData] = useState([]);
  const [impressions, setImpressions] = useState(0);

  const navigate= useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4747/api/create/quiz/${quizId}`);
        setQuizData(response.data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchData();



     // Fetch impressions count when the component mounts
     const fetchImpressions = async () => {
      try {
        debugger
        // const response = await axios.get(`http://localhost:4747/api/track/${quizId}`);
        const response = await axios.get(`http://localhost:4747/api/create/quiz/${quizId}`);

        setImpressions(response.data.impressions);
      } catch (error) {
        console.error('Error fetching impressions count:', error);
      }
    };
  
    fetchImpressions();
  }, [quizId]);

  const handleBack=()=>{
    navigate('/dashboard')
  }




  return (
    <>
    <div className={styles.fullScreenDiv}>
    <div className={styles.parent}>
    <button className={styles.backButton} onClick={handleBack}>Dashboard</button>
      <div className={styles.childOne}>
        <div>
        <h2>Quiz Name: {quizData.quizName}</h2>
        </div>
        <div>
        <p>Created on : {new Date(quizData.currentDateAndTime).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        <p>Impressions : {impressions}</p>
        </div>
      </div>
      <div className={styles.mainOverFlow}>
      {quizData.questionText && (
      <div className={styles.childTwo}>
        <p className={styles.paragraphOne}>Q. {quizData.questionText} ?</p>
        <div className={styles.parentOne}>
        <div className={styles.subChild}>
        <h2>{quizData.textQuestionAttempted ? 1 : 0}</h2>
          <p>people Attempted the question</p>
        </div>
        <div className={styles.subChild}>
          <h2>{quizData.textCorrectAns ? quizData.textCorrectAns: 0}</h2>
          <p>people Answered Correctly</p>
        </div>
        <div className={styles.subChild}>
          <h2>{quizData.textInCorrectAns ? quizData.textInCorrectAns :0 }</h2>
          <p>people Answered Incorrectly</p>
        </div>
        </div>
      </div>
       )}

{quizData.questionImg && (
      <div className={styles.childTwo}>
        <p className={styles.paragraphOne}>Q. {quizData.questionImg} ?</p>
        <div className={styles.parentOne}>
        <div className={styles.subChild}>
        <h2>{quizData.imageQuestionAttempted ? 1 : 0}</h2>
          <p>people Attempted the question</p>
        </div>
        <div className={styles.subChild}>
          <h2>{quizData.imgCorrectAns ? quizData.imgCorrectAns : 0}</h2>
          <p>people Answered Correctly</p>
        </div>
        <div className={styles.subChild}>
          <h2>{quizData.imgInCorrectAns ? quizData.imgInCorrectAns : 0}</h2>
          <p>people Answered Incorrectly</p>
        </div>
        </div>
      </div>
 )}

{quizData.questionTxtImg && (
      <div className={styles.childTwo}>
        <p className={styles.paragraphOne}>Q. {quizData.questionTxtImg} ? </p>
        <div className={styles.parentOne}>
        <div className={styles.subChild}>
        <h2>{quizData.textAndImageQuestionAttempted ? 1 : 0}</h2>
          <p>people Attempted the question</p>
        </div>
        <div className={styles.subChild}>
          <h2>{quizData.textImgCorrectAns ? quizData.textImgCorrectAns : 0 }</h2>
          <p>people Answered Correctly</p>
        </div>
        <div className={styles.subChild}>
          <h2>{quizData.textImgInCorrectAns ? quizData.textImgInCorrectAns : 0 }</h2>
          <p>people Answered Incorrectly</p>
        </div>
        </div>
      </div>
)}
      </div>

    </div>
    </div>
    </>
  )
}

export default QnaComponent