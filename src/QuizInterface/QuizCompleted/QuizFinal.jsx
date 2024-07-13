import React from 'react'
import styles from '../QuizCompleted/Style.module.css';
import quizCompletedImage from '../../assets/images/congrats.png';
import { useParams } from 'react-router-dom';

function QuizFinal() {
    const { showFinalTotal } = useParams();
    return (
        <>
            <div className={styles.parent}>
                <div className={styles.childOne}>
                <h2>Congrats Quiz is completed</h2>
                </div>
                <div className={styles.childTwo}>
                    <img src={quizCompletedImage} alt="Quiz Completed" className={styles.image}/>
                </div>
                
                <div className={styles.childThree}>
                    <h2>Your Score is <span className={styles.greenText}>{showFinalTotal}02/03</span></h2>
                </div>
            </div>
        </>
    )
}

export default QuizFinal