import React, { useEffect, useState } from 'react'
import styles from '../QuizeQandAnsImage/Style.module.css';
// import quizCompletedImage from '../../../assets/images/congrats.png';
import axios from 'axios';

function QuizImage() {

    const [quizData, setQuizData] = useState(null);
    const [timer, setTimer] = useState(0); // Initialize with 0

    useEffect(() => {
        // Define the API endpoint
        const apiUrl = 'http://localhost:4747/api/create/quiz';

        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                console.log("Get respones", response)
                setQuizData(response.data);
                console.log("ooooooo", quizData)


                const initialTimerValue = response.data[1] && response.data[1].timeImg;
                setTimer(initialTimerValue || 0);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []); // Empty dependency array means the effect runs once after the initial render


    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            // Clear the interval when timer reaches 0
            if (timer === 0) {
                clearInterval(intervalId);
            }

            // Clear the interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [timer]);

    return (
        <>
            <div className={styles.parent}>
                <div className={styles.childone}>
                    <h3>
                        01/04
                    </h3>
                    <h2>
                        {timer > 0 ? `00:${timer}s` : 'Time\'s up!'}
                    </h2>
                </div>
                <div className={styles.childthree}>
                    <h2>{quizData && quizData[1] && quizData[1].questionImg}</h2>
                </div>
                {/* <div className={styles.childtwo}>
                    <div className={styles.subChild}>
                    <img src={quizCompletedImage} alt="Quiz Completed"/>
                    </div>
                    <div className={styles.subChild}>
                    <img src={quizCompletedImage} alt="Quiz Completed"/>
                    </div>
                </div>
                <div className={styles.childtwo}>
                    <div className={styles.subChild}>
                    <img src={quizCompletedImage} alt="Quiz Completed"/>
                    </div>
                    <div className={styles.subChild}>
                    <img src={quizCompletedImage} alt="Quiz Completed"/>
                    </div>
                </div> */}

                <div className={styles.childtwo}>
                    {quizData && quizData[1] && quizData[1].optionsImg.map((option, index) => (
                        <div key={index} className={styles.subChild}>
                            {quizData[1].typeImg === 'imageURL' ? (
                                <img src={option} alt={`Option ${index + 1}`} />
                            ) : (
                                <p>{option}</p>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.childfour}>
                    <button className={styles.buttonNext}>Next</button>
                </div>
            </div>
        </>
    )
}

export default QuizImage