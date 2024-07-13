import React, { useState, useEffect } from 'react';
import styles from "../Dashboard/Style.module.css";
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';

function DashboardComponent() {

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:4747/api/create/quiz');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const totalQuizzes = quizzes.length;

  // const countQuestionsByType = (questions, type) => {
  //   return questions.filter(question => question).length;
  // };

  const countQuestionsByType = (questions, type) => {
    return questions.filter(question => question && question.trim() !== '').length;
  };

  const countTextQuestions = quizzes.reduce((total, quiz) => total + countQuestionsByType([quiz.questionText], 'text'), 0);
  const countImageQuestions = quizzes.reduce((total, quiz) => total + countQuestionsByType([quiz.questionImg], 'imageURL'), 0);
  const countTextAndImageQuestions = quizzes.reduce((total, quiz) => total + countQuestionsByType([quiz.questionTxtImg], 'textandimageURL'), 0);

  const totalCountQuestions = countTextQuestions + countImageQuestions + countTextAndImageQuestions;

  return (
    <>
      <div className={styles.main}>
        <div className={styles.parent}>
          <div className={styles.child}>
            <h3 className={styles.orange}><span className={styles.countFontSize}>{totalQuizzes}</span> Quiz Created</h3>
          </div>
          <div className={styles.child}>
            <h3 className={styles.green}><span className={styles.countFontSize}>{totalCountQuestions}</span> Questions Created </h3>
          </div>
          <div className={styles.child}>
            <h3 className={styles.blue}> K Total Impressions</h3>
          </div>
        </div>
        <div>
          <div className={styles.childOne}>
            <h1> Trending Quizs</h1>
          </div>
          <div className={styles.parentFlex}>
            {quizzes.map((quiz, index) => (
              <div className={styles.parentTwo} key={index}>
                <div className={styles.flexContainer}>
                  <label className={styles.logoText}>{quiz.quizName}</label>
                  {/* Assuming there is a logo property in the quiz object */}
                  <label><VisibilityIcon className={styles.logoColor}/></label>
                </div>
                <div>
                  <p className={styles.logoTime}>Created on: {new Date(quiz.currentDateAndTime).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardComponent