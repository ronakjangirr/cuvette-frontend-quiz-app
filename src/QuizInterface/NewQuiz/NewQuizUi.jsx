
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../NewQuiz/Style.module.css';
import { useParams } from 'react-router-dom';

const NewQuizUi = () => {
    const [quizData, setQuizData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timer, setTimer] = useState(0);
    const [currentType, setCurrentType] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                debugger
                const response = await axios.get(`http://localhost:4747/api/create/quiz/${id}`);
                // const response = await axios.get(`http://localhost:4747/api/create/quiz`);

                const fetchedQuizData = response.data;
                setQuizData(fetchedQuizData);
                // if (fetchedQuizData.length > 0) {
                //     setQuizData(fetchedQuizData);
                //     setCurrentType(fetchedQuizData[currentIndex]?.typeText || '');
                //     setTimer(fetchedQuizData[currentIndex]?.time || 0);
                // } else {
                //     console.error('No quiz data available.');
                // }
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        fetchQuizData();
    }, [currentIndex, id]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const renderQuizContent = () => {
        if (!id || quizData.length === 0 || currentIndex >= quizData.length) {
            return <p>No quiz available</p>;
        }

        const currentQuiz = quizData[currentIndex];

        let content;

        switch (currentType) {
            case 'text':
                content = (
                    <>
                        {/* Your text content rendering */}
                    </>
                );
                break;

            case 'imageURL':
                content = (
                    <>
                        {/* Your image content rendering */}
                    </>
                );
                break;

            case 'textandimageURL':
                content = (
                    <>
                        {/* Your text and image content rendering */}
                    </>
                );
                break;

            default:
                content = <p>No quiz available</p>;
        }

        return (
            <div className={styles.parent}>
                <div className={styles.childone}>
                    <h3>01/{quizData.length}</h3>
                    <h2>{timer > 0 ? `00:${timer}s` : "Time's up!"}</h2>
                </div>
                {content}
                <div className={styles.childfour}>
                    <button className={styles.buttonNext} onClick={handleNext}>
                        Next
                    </button>
                </div>
            </div>
        );
    };

    return <>{renderQuizContent()}</>;
};

export default NewQuizUi;
