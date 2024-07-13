import React, { useState, useEffect } from 'react'
import styles from '../QuizeQandAnsTextandImage/Style.module.css';
import axios from 'axios';
import quizCompletedImage from '../../../assets/images/congrats.png';

function QuizTextandImage() {

    const [quizData, setQuizData] = useState(null);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const apiUrl = 'http://localhost:4747/api/create/quiz';

        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                console.log("Get respones", response)
                setQuizData(response.data);
                console.log("ooooooo", quizData)


                const initialTimerValue = response.data[0] && response.data[0].timeText;
                setTimer(initialTimerValue || 0);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

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
                    <h2>{quizData && quizData[2] && quizData[2].questionTxtImg}</h2>
                </div>
                <div className={styles.childtwo}>
                    <div className={styles.subChild}>
                        <div>
                        <p>dISPLAY OPTION TEXT</p>
                        </div>
                        <div>
                        <img src={quizCompletedImage} alt="Quiz Completed"/>
                        </div>
                    </div>
                    <div className={styles.subChild}>
                    <div>
                        <p>dISPLAY OPTION TEXT</p>
                        </div>
                        <div>
                        <img src={quizCompletedImage} alt="Quiz Completed"/>
                        </div>
                    </div>
                </div>
                <div className={styles.childtwo}>
                    <div className={styles.subChild}>
                    <div>
                        <p>dISPLAY OPTION TEXT</p>
                        </div>
                        <div>
                        <img src={quizCompletedImage} alt="Quiz Completed"/>
                        </div>
                    </div>
                    <div className={styles.subChild}>
                    <div>
                        <p>dISPLAY OPTION TEXT</p>
                        </div>
                        <div>
                        <img src={quizCompletedImage} alt="Quiz Completed"/>
                        </div>
                    </div>
                </div>

{/* <div className={styles.childtwo}>
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
 */}



{/* /////////// */}


{/* <div className={styles.childtwo}>
  {quizData && quizData[2].map((data, index) => (
    <div key={index} className={styles.subChild}>
      <div>
        <p>{data.optionsTxtImg}</p>
      </div>
      <div>
        <img src={data.optionsImageTxtImg} alt={`Option ${index + 1}`} />
      </div>
    </div>
  ))}
</div> */}


                <div className={styles.childfour}>
                    <button className={styles.buttonNext}>Next</button>
                </div>
            </div>
        </>
    )
}

export default QuizTextandImage;