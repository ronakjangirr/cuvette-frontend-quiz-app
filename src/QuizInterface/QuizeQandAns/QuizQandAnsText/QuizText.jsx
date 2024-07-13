import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../QuizQandAnsText/Style.module.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const QuizText = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [displayType, setDisplayType] = useState('text');
  const [error, setError] = useState('')
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [displayTypes, setDisplayTypes] = useState(['text', 'imageURL', 'textandimageURL']);

  const [selectedOption, setSelectedOption] = useState(null);
  // const [correctCount, setCorrectCount] = useState(0);
  // const [incorrectCount, setIncorrectCount] = useState(0);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [totalAttemptedQuestions, setTotalAttemptedQuestions] = useState(0);

  const [attemptedQuestions, setAttemptedQuestions] = useState([]);

  const navigate = useNavigate();

  const [showFinalTotal, setShowFinalTotal] = useState(0);

  // Total questions attempted
  const [textQuestionAttempted, setTextQuestionAttempted] = useState('');
  const [imageQuestionAttempted, setImageQuestionAttempted] = useState('');
  const [textAndImageQuestionAttempted, setTextAndImageQuestionAttempted] = useState('');


  // Text quiz correct and Incorrect Question
  const [textCorrectAns, setTextCorrectAns] = useState(0);
  const [textInCorrectAns, setTextInCorrectAns] = useState(0);

  // Img quiz correct and Incorrect Question
  const [imgCorrectAns, setImgCorrectAns] = useState(0);
  const [imgInCorrectAns, setImgInCorrectAns] = useState(0);

  // TextandImg quiz correct and Incorrect Question
  const [textImgCorrectAns, setTextImgCorrectAns] = useState(0);
  const [textImgInCorrectAns, setTextImgInCorrectAns] = useState(0);



  useEffect(() => {
    console.log("TEXTCorrectCount", textCorrectAns);
    console.log("TEXTInCorrectCount", textInCorrectAns);

    console.log("IMGCorrectCount", imgCorrectAns);
    console.log("IMGInCorrectCount", imgInCorrectAns);

    console.log("TEXTIMGCorrectCount", textImgCorrectAns);
    console.log("TEXTIMGInCorrectCount", textImgInCorrectAns);

  }, [textQuestionAttempted, imageQuestionAttempted, imageQuestionAttempted, textCorrectAns, textInCorrectAns, imgCorrectAns, imgInCorrectAns, textImgCorrectAns, textImgInCorrectAns, showFinalTotal]);






  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        debugger
        const response = await axios.get(`http://localhost:4747/api/create/quiz/${id}`);
        console.log('API Response:', response.data);
        setQuizData(response.data);
        setLoading(false);
        setSelectedOptions(new Array(response.data.length).fill(false));
        setAnsweredQuestions([]);
        setTotalAttemptedQuestions(0);


      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setError('Error fetching quiz data');
        setLoading(false);
      }
    };

    fetchQuizData();

  }, [id]);



  useEffect(() => {
    let intervalId;

    // Start the timer when the component mounts
    if (quizData.timeText > 0) {
      debugger
      setTimer(quizData.timeText);

      intervalId = setInterval(() => {
        debugger
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [quizData]);



  useEffect(() => {
    // Handle logic when the timer reaches 0
    if (timer === 0) {
      debugger
      // Implement your logic when time's up
      console.log("Time's up!");
      // You might want to disable the Next button or do something else here
    }
  }, [timer]);








  const handleOptionClick = (selectedOption) => {
    debugger

    const updatedOptions = [...selectedOptions];
    updatedOptions[currentIndex] = selectedOption;
    setSelectedOptions(updatedOptions);

    // Add the current question to the list of answered questions
    if (!answeredQuestions.includes(currentIndex)) {
      setAnsweredQuestions([...answeredQuestions, currentIndex]);
      setTotalAttemptedQuestions(totalAttemptedQuestions + 1);
    }

    switch (displayType) {

      case 'text':
        setTextQuestionAttempted(selectedOption);
        console.log("INside optionclick textQuestionAttempted", textQuestionAttempted);


        if (selectedOption === quizData.correctOptionText) {
          console.log('Correct Answer!');
          setTextCorrectAns(textCorrectAns + 1)
        } else {
          console.log('Incorrect Answer!');
          setTextInCorrectAns(textInCorrectAns + 1)
        }
        break;

      case 'imageURL':
        setImageQuestionAttempted(selectedOption);
        console.log("INside optionclick imageQuestionAttempted", imageQuestionAttempted);

        if (selectedOption === quizData.correctOptionImg) {
          console.log('Correct Answer!');
          setImgCorrectAns(imgCorrectAns + 1);
        } else {
          console.log('Incorrect Answer!');
          setImgInCorrectAns(imgInCorrectAns + 1);
        }
        break;

      case 'textandimageURL':

        setTextAndImageQuestionAttempted(selectedOption);
        console.log("INside optionclick imageQuestionAttempted", textAndImageQuestionAttempted);

        if (selectedOption === quizData.correctOptionTxtImg) {
          console.log('Correct Answer!');
          setTextImgCorrectAns(textImgCorrectAns + 1);
        } else {
          console.log('Incorrect Answer!');
          setTextImgInCorrectAns(textImgInCorrectAns + 1);
        }
        break;
      default:
        console.warn(`Unhandled displayType: ${displayType}`);
        break;
    }
  }











  const handleNext = () => {
    debugger
    // Check if the user has selected an option for the current question
    const currentQuestionAnswered = selectedOptions[currentIndex];

    switch (displayType) {
      case 'text':
        setTextQuestionAttempted(currentQuestionAnswered);
        console.log("textQuestionAttempted", textQuestionAttempted);

        break;
      case 'imageURL':
        setImageQuestionAttempted(currentQuestionAnswered);
        console.log("imageQuestionAttempted", imageQuestionAttempted);
        break;
      case 'textandimageURL':
        setTextAndImageQuestionAttempted(currentQuestionAnswered);
        console.log("textAndImageQuestionAttempted", textAndImageQuestionAttempted);
        break;
      default:
        break;
    }






    if (currentQuestionAnswered) {
      // If the question is answered, increment the totalAttemptedQuestions count
      setTotalAttemptedQuestions(totalAttemptedQuestions + 1);
      console.log("totalAttemptedQuestions", totalAttemptedQuestions)
      console.log("selectedOptions", selectedOptions)
      // Check if the selected option is correct
      const isCorrect =
        currentQuestionAnswered ===
        quizData[
        `correctOption${displayType.charAt(0).toUpperCase()}${displayType.slice(1)}`
        ];
    }



    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % displayTypes.length;
      setDisplayType(displayTypes[nextIndex]);

      // // Check if all cases are over
      if (nextIndex === 0) {

        // Show the final total of textCorrectAns, imgCorrectAns, and textImgCorrectAns
        const finalTotal = textCorrectAns + imgCorrectAns + textImgCorrectAns;
        console.log("Final Total:", finalTotal);



        setShowFinalTotal(finalTotal);
        alert("Quiz questions are over!");
        // Optionally, you can redirect or perform any other action after showing the alert







        // Prepare data for API post
        const finalAnsweredQuestion = {
          textQuestionAttempted,
          imageQuestionAttempted,
          textAndImageQuestionAttempted,
          textCorrectAns,
          textInCorrectAns,
          imgCorrectAns,
          imgInCorrectAns,
          textImgCorrectAns,
          textImgInCorrectAns,
        };

        console.log("finalAnsweredQuestion", finalAnsweredQuestion)

        // Call function to post data to API
        postFinalAnsweredQuestions(finalAnsweredQuestion);

        // Navigate to QuizFinal component with finalTotal as a URL parameter

        navigate('/quiz-final');
      }

      return nextIndex;
    });
    setSelectedOption(null);


  };





  const postFinalAnsweredQuestions = async (finalAnsweredQuestion) => {
    try {
      debugger
      const response = await axios.post(`http://localhost:4747/api/create/quiz/${id}`, finalAnsweredQuestion);
      console.log('API Response==========:', response.data);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error posting final answered questions:', error);
      // Handle error, e.g., show an error message
    }
  };








  const renderContentByType = () => {

    if (quizData.length === 0) {
      return <p>Loading...</p>;
    }

    switch (displayType) {
      case 'text':
        // Check if quizData.questionText is not empty
        if (!quizData.questionText) {
          return null;
        }
        return (
          // Render text content
          <>

            {quizData.questionText && (
              <div className={styles.childthree}>
                <h2>{quizData.questionText}</h2>
              </div>
            )}
            {quizData.optionsText && (
              <div className={styles.childtwo}>
                {quizData.optionsText.map((optionsText, index) => (
                  <div key={index} className={styles.subChild} onClick={() => handleOptionClick(optionsText)}>
                    <div>
                      <p>{optionsText}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {quizData.typeText && (
              <div className={styles.childthree}>
                <p>Type: {quizData.typeText}</p>
              </div>
            )}
          </>
        );
      case 'imageURL':
        // Check if quizData.questionText is not empty
        if (!quizData.questionImg) {
          return null;
        }

        return (
          // Render image content
          <>
            {quizData.questionImg && (
              <div className={styles.childthree}>
                <h2>{quizData.questionImg}</h2>
              </div>
            )}
            {quizData.optionsImg && (
              <div className={styles.childtwo}>
                {quizData.optionsImg.map((optionsImg, index) => (
                  <div key={index} className={styles.subChild} onClick={() => handleOptionClick(optionsImg)}>
                    {/* <div> */}
                    <img src={optionsImg} alt={index + 1} />
                    {/* </div> */}
                  </div>
                ))}
              </div>
            )}
            {quizData.typeImg && (
              <div className={styles.childthree}>
                <p>Type: {quizData.typeImg}</p>
              </div>
            )}
          </>
        );
      case 'textandimageURL':
        // Check if quizData.questionText is not empty
        if (!quizData.questionTxtImg) {
          return null;
        }
        return (
          // Render text and image content
          <>

            {quizData.questionTxtImg && (
              <div className={styles.childthree}>
                <h2>{quizData.questionTxtImg}</h2>
              </div>
            )}
            {quizData.optionsTxtImg && (
              <div className={styles.childtwoTxtImg}>
                {quizData.optionsTxtImg.map((optionsTxtImg, index) => (
                  <div key={index} className={styles.subChildTxtImg} onClick={() => handleOptionClick(optionsTxtImg)}>
                    <div>
                      <p>{optionsTxtImg}</p>
                    </div>
                    {quizData.optionsImageTxtImg && (
                      <div key={index} className={styles.childtwoImgstyle}>
                        <img src={quizData.optionsImageTxtImg[index]} alt={`Option ${index + 1}`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {quizData.typeTxtImg && (
              <div className={styles.childthree}>
                <p>Type: {quizData.typeTxtImg}</p>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return <>
    <div className={styles.parent}>
      <div className={styles.childone}>
        <h3>01/{quizData.length}</h3>
        <h2>{timer > 0 ? `00:${timer}s` : "Time's up!"}</h2>
      </div>
      {renderContentByType()}

      <div className={styles.childfour}>
        <button className={styles.buttonNext} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  </>;
};

export default QuizText;