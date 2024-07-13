
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../QuizPollTypeText/Style.module.css';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom

const PollText = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [timer, setTimer] = useState(0);
  const [displayType, setDisplayType] = useState('text'); // 'text', 'image', 'textImage'
  const [error, setError] = useState('')
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [displayTypes, setDisplayTypes] = useState(['text', 'imageURL', 'textandimageURL']);
  // const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0);
  // const [allCasesOver, setAllCasesOver] = useState(false);

  const [textPollOne, setTextPollOne] = useState(0)
  const [textPollTwo, setTextPollTwo] = useState(0)
  const [textPollThree, setTextPollThree] = useState(0)
  const [textPollFour, setTextPollFour] = useState(0)

  const [imgPollOne, setImgPollOne] = useState(0)
  const [imgPollTwo, setImgPollTwo] = useState(0)
  const [imgPollThree, setImgPollThree] = useState(0)
  const [imgPollFour, setImgPollFour] = useState(0)

  const [textImgPollOne, setTextImgPollOne] = useState(0)
  const [textImgPollTwo, setTextImgPollTwo] = useState(0)
  const [textImgPollThree, setTextImgPollThree] = useState(0)
  const [textImgPollFour, setTextImgPollFour] = useState(0)

  const [optionClicked, setOptionClicked] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        debugger
        const response = await axios.get(`http://localhost:4747/api/create/poll/${id}`);
        console.log('API Response:', response.data);
        setQuizData(response.data);
        setLoading(false);
        // setTimer(response.data[currentIndex]?.time || 0);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setError('Error fetching quiz data');
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [id]);






  const handleOptionClick = (optionsText) => {

    setSelectedOption(optionsText);

    // Check if the option has already been clicked
    // if (!optionClicked) {
    //   // Update poll counts based on the selected option
    //   switch (displayType) {
    //     case 'text':
    //       switch (selectedOption) {
    //         case quizData.optionsText[0]:
    //           setTextPollOne((prevCount) => {
    //             const newCount = prevCount + 1;
    //             console.log(`textPollOne: ${newCount}`);
    //             return newCount;
    //           });
    //           break;
    //         case quizData.optionsText[1]:
    //           setTextPollTwo((prevCount) => {
    //             const newCount = prevCount + 1;
    //             console.log(`textPollTwo: ${newCount}`);
    //             return newCount;
    //           });
    //           break;
    //         case quizData.optionsText[2]:
    //           setTextPollThree((prevCount) => {
    //             const newCount = prevCount + 1;
    //             console.log(`textPollThree: ${newCount}`);
    //             return newCount;
    //           });
    //           break;
    //         case quizData.optionsText[3]:
    //           setTextPollFour((prevCount) => {
    //             const newCount = prevCount + 1;
    //             console.log(`textPollFour: ${newCount}`);
    //             return newCount;
    //           });
    //           break;
    //         default:
    //           break;
    //       }
    //     // Add similar cases for 'imageURL' and 'textandimageURL' if needed
    //     default:
    //       break;
    //   }

    //   // Set the optionClicked state to true
    //   setOptionClicked(true);
    // }

    // Move to the next question
    // handleNext();
  };








  const handleNext = () => {

debugger

switch (displayType) {
  case 'text':
    switch (selectedOption) {
      case quizData.optionsText[0]:
        setTextPollOne((prevCount) => {
          const newCount = prevCount + 1;
          console.log("textPollOne", newCount);
          return newCount;
        });
        break;
      case quizData.optionsText[1]:
        setTextPollTwo((prevCount) => {
          const newCount = prevCount + 1;
          console.log("textPollTwo", newCount);
          return newCount;
        });
        break;
      case quizData.optionsText[2]:
        setTextPollThree((prevCount) => {
          const newCount = prevCount + 1;
          console.log("textPollThree", newCount);
          return newCount;
        });
        break;
      case quizData.optionsText[3]:
        setTextPollFour((prevCount) => {
          const newCount = prevCount + 1;
          console.log("textPollFour", newCount);
          return newCount;
        });
        break;

      default:
        break;
    }
    break;



    case 'imageURL':
      switch (selectedOption) {
        case quizData.optionsImg[0]:
          setImgPollOne((prevCount) => prevCount + 1);
          break;
        case quizData.optionsImg[1]:
          setImgPollTwo((prevCount) => prevCount + 1);
          break;
        case quizData.optionsImg[2]:
          setImgPollThree((prevCount) => prevCount + 1);
          break;
        case quizData.optionsImg[3]:
          setImgPollFour((prevCount) => prevCount + 1);
          break;
        default:
          break;
      }
      break;



}












    // Try one 
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % displayTypes.length;
      setDisplayType(displayTypes[nextIndex]);

      // // Check if all cases are over
      if (nextIndex === 0) {
        alert("Quiz questions are over!");
        // Optionally, you can redirect or perform any other action after showing the alert
      }
      return nextIndex;
    });
  };



// useEffect(()=>{
//   console.log("textPollOne", textPollOne)
// }, [textPollOne])


  const renderContentByType = () => {

    if (quizData.length === 0) {
      // Display loading indicator or handle the case when quiz data is not yet available
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
            <div className={styles.childone}>
              <h3>01/{quizData.length}</h3>
            </div>
            {quizData.questionText && (
              <div className={styles.childthree}>
                <h2>{quizData.questionText}</h2>
              </div>
            )}
            {quizData.optionsText && (
              <div className={styles.childtwo}>
                {quizData.optionsText.map((optionsText, index) => (
                  <div key={index} className={styles.subChild}   onClick={() => handleOptionClick(optionsText)}>
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
            <div className={styles.childone}>
              <h3>01/{quizData.length}</h3>
              {/* <h2>{timer > 0 ? `00:${timer}s` : "Time's up!"}</h2> */}
            </div>

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

            <div className={styles.childone}>
              <h3>01/{quizData.length}</h3>
              {/* <h2>{timer > 0 ? `00:${timer}s` : "Time's up!"}</h2> */}
            </div>

            {quizData.questionTxtImg && (
              <div className={styles.childthree}>
                <h2>{quizData.questionTxtImg}</h2>
              </div>
            )}
            {quizData.optionsTxtImg && (
              <div className={styles.childtwoTxtImg}>
                {quizData.optionsTxtImg.map((optionsTxtImg, index) => (
                  <div key={index} className={styles.subChildTxtImg}onClick={() => handleOptionClick(optionsTxtImg)}>
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

      {renderContentByType()}

      <div className={styles.childfour}>
        <button className={styles.buttonNext} onClick={handleNext}>
          Next
        </button>
      </div>

    </div>
  </>;
};

export default PollText;