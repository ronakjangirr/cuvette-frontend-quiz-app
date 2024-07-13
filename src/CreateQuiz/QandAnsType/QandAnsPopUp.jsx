import React, { useEffect, useState } from 'react';
import styles from '../QandAnsType/Style.module.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import QuizLinkPopUp from '../QuizLink/QuizLinkPopUp';
import axios from 'axios';


function QandAnsPopUp({ closePopUp, sendQuizName }) {

  const [selectedOption, setSelectedOption] = useState('');
  const [textOptions, setTextOptions] = useState(['', '']);
  const [imageOptions, setImageOptions] = useState(['', '']);
  const [textAndImgOptions, setTextAndImgOptions] = useState(['', '']);
  const [newQuiz, setnewQuiz] = useState([]);
  const [showQuizLink, setShowQuizLink] = useState(false);

  const [textAndImgTextOptions, setTextAndImgTextOptions] = useState(['', '']);
  const [textAndImgImageOptions, setTextAndImgImageOptions] = useState(['', '']);


  // const [myNewData, setMyNewData] = useState(['', '']);


  const [questions, setQuestions] = useState({
    text: '',
    imageURL: '',
    textandimageURL: '',
  });

  // const [createdQuizData, setCreatedQuizData] = useState([]);

  const updateQuestion = (option, value) => {
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      [option]: value,
    }));
  };

  ///////-------FOR TIME------------

  const [totalTime, setTotalTime] = useState({
    newTime:0
  });

  ///////-------FOR TIME------------

  const [textQuizData, setTextQuizData] = useState({
    quest: '',
    options: ['', ''],
    correctOption: '', // Rename to correctOption
    // time: 0,
  });


  const [imageQuizData, setImageQuizData] = useState({
    quest: '',
    options: ['', ''],
    correctOption: '', // Rename to correctOption
    // time: 0,
  });


  const [textandImageQuizData, setTextandImageQuizData] = useState({
    quest: '',
    options: ['', ''],
    optionsImage: ['', ''],
    correctOption: '', // Rename to correctOption
    // time: 0,
  });


  const handleTextDelete = (index) => {
    let updatedOptions = [...textOptions];
    updatedOptions.splice(index, 1);
    setTextOptions(updatedOptions);
  }


  const handleImageDelete = (index) => {
    let updatedOption = [...imageOptions];
    updatedOption.splice(index, 1);
    setImageOptions(updatedOption);
  }


  const handleTextAndImageDelete = (index) => {
    let updatedOption = [...textAndImgOptions];
    let updatedTextOption = [...textAndImgTextOptions];
    let updatedImageOption = [...textAndImgImageOptions];


    updatedOption.splice(index, 1);
    updatedTextOption.splice(index, 1);
    updatedImageOption.splice(index, 1);


    setTextAndImgOptions(updatedOption);
    setTextAndImgTextOptions(updatedTextOption);
    setTextAndImgImageOptions(updatedImageOption);
  }


  // const handleTimer = (sec) => {
  //   // Check the selected option and update the corresponding state
  //   switch (selectedOption) {
  //     case 'text':
  //       setTextQuizData({ ...textQuizData, time: sec });
  //       console.log("Selected time for textQuizData:", sec);
  //       break;
  //     case 'imageURL':
  //       setImageQuizData({ ...imageQuizData, time: sec });
  //       break;
  //     case 'textandimageURL':
  //       setTextandImageQuizData({ ...textandImageQuizData, time: sec });
  //       break;
  //     default:
  //       console.warn(`Unhandled selectedOption: ${selectedOption}`);
  //       // You can throw an error, log a warning, or set a default behavior here
  //       break;
  //   }
  // }


// ======================= IN TRIAL FOR TIME START

const handleTimer = (sec) => {
  // Check the selected option and update the corresponding state
  switch (selectedOption) {
    case 'text':
      setTotalTime({ ...totalTime, newTime: sec });
      console.log("Selected time for textQuizData:", sec);
      break;
    case 'imageURL':
      setTotalTime({ ...totalTime, newTime: sec });
      break;
    case 'textandimageURL':
      setTotalTime({ ...totalTime, newTime: sec });
      break;
    default:
      console.warn(`Unhandled selectedOption: ${selectedOption}`);
      // You can throw an error, log a warning, or set a default behavior here
      break;
  }
}

// ====================== IN TRIAL FOR TIME START













  const handleTextRadioChange = (index) => {
    setTextQuizData({ ...textQuizData, correctOption: textOptions[index] });
    console.log("kk", textQuizData);
  };


  const handleImageRadioChange = (index) => {
    setImageQuizData({ ...imageQuizData, correctOption: imageOptions[index] });
    console.log("kk", imageQuizData);
  };


  const handleTextAndImageRadioChange = (index) => {


    setTextandImageQuizData({ ...textandImageQuizData, correctOption: textAndImgTextOptions[index] })
    console.log("Selected value:", textandImageQuizData);
  };


  useEffect(() => {
    console.log("Updated textQuizData:", textQuizData);
    console.log("Updated imageQuizData:", imageQuizData);
    console.log("Updated textandImageQuizData:", textandImageQuizData);
  }, [textQuizData, imageQuizData, textandImageQuizData])




  const closeQandA = () => {
    closePopUp(false);
  };


  const handleOptionChange = (value) => {
    // setSelectedOption(value);
    debugger
    // Set the current question for the selected option type
    updateQuestion(selectedOption, questions[selectedOption] || '');

    setSelectedOption(value);
  };


  const handleTextChange = (index, value) => {
    const updatedOptions = [...textOptions];
    updatedOptions[index] = value;
    setTextOptions(updatedOptions);
  };


  const handleImageUrlChange = (index, value) => {

    // Regular expression to check if the value is a valid URL
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    // Check if the value is a valid URL
    if (!urlRegex.test(value)) {
      // Display an error or handle the case where the input is not a valid URL
      alert('Please enter a valid URL.');
      return;
    }

    const updatedOptions = [...imageOptions];
    updatedOptions[index] = value;
    setImageOptions(updatedOptions);
  };

  const handleNewTextChange = (index, value) => {
    const updatedOptions = [...textAndImgTextOptions];
    updatedOptions[index] = value;
    setTextAndImgTextOptions(updatedOptions);
    console.log("Mydata", textAndImgTextOptions);
  };


  const handleNewImageChange = (index, value) => {

    // Regular expression to check if the value is a valid URL
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    // Check if the value is a valid URL
    if (!urlRegex.test(value)) {
      // Display an error or handle the case where the input is not a valid URL
      alert('Please enter a valid URL.');
      return;
    }

    const updatedOptions = [...textAndImgImageOptions];
    updatedOptions[index] = value;
    setTextAndImgImageOptions(updatedOptions);
    console.log("MyImagedata", textAndImgImageOptions);


  };

  const handleAddOption = () => {
    if (selectedOption === 'text' && textOptions.length < 4) {
      setTextOptions((prevOptions) => [...prevOptions, '']);
    }
    else if (selectedOption === 'imageURL' && imageOptions.length < 4) {
      setImageOptions((prevImgOptions) => [...prevImgOptions, '']);
    } else if (selectedOption === 'textandimageURL' && textAndImgOptions.length < 4) {
      setTextAndImgOptions((prevTextAndImgOptions) => [...prevTextAndImgOptions, '']);
      setTextAndImgTextOptions((prevTextAndImgTextOptions) => [...prevTextAndImgTextOptions, '']);
      setTextAndImgImageOptions((prevTextAndImgImageOptions) => [...prevTextAndImgImageOptions, '']);
    }
  };


  const handleCreateNewQuiz = () => {
    if (newQuiz.length < 4) {
      setnewQuiz((prevOptions) => [...prevOptions, prevOptions.length + 1]);
    }
  };


  const renderOptions = () => {
    if (selectedOption === 'text') {
      return textOptions.map((option, index) => (
        <div key={index}>
          <input
            className={styles.radio}
            type="radio"
            name="correctOption"
            checked={textQuizData.correctOption === option}
            onChange={() => handleTextRadioChange(index)}
          />
          <input
            type="text"
            placeholder="Text"
            className={styles.inputText}
            value={option}
            onChange={(e) => handleTextChange(index, e.target.value)}
          />
          {textOptions.length > 2 && index > 1 && <DeleteForeverIcon className={styles.deleteIcon} onClick={() => handleTextDelete(index)} />}
        </div>
      ));
    } else if (selectedOption === 'imageURL') {
      return imageOptions.map((option, index) => (
        <div key={index}>
          <input
            className={styles.radio}
            type="radio"
            name="correctOption"
            checked={imageQuizData.correctOption === option}
            onChange={() => handleImageRadioChange(index)}
          />
          <input
            type="text"
            placeholder="Image URL"
            className={styles.inputText}
            value={option}
            onChange={(e) => handleImageUrlChange(index, e.target.value)}
          />
          {imageOptions.length > 2 && index > 1 && <DeleteForeverIcon className={styles.deleteIcon} onClick={() => handleImageDelete(index)} />}
        </div>
      ));
    } else if (selectedOption === 'textandimageURL') {
      return textAndImgOptions.map((option, index) => (
        <div key={index} className={styles.textImageButtons}>
          <input
            className={styles.radio}
            type="radio"
            name="correctOption"
            // checked={textandImageQuizData.correctOption === option}
            checked={textandImageQuizData.correctOption === textAndImgTextOptions[index]}
            onChange={() => handleTextAndImageRadioChange(index)}
          />
          <input
            className={styles.inputTextAndImage}
            type="text"
            placeholder="Text"
            value={textAndImgTextOptions[index]}
            onChange={(e) => handleNewTextChange(index, e.target.value)}
          />


          <input
            className={styles.inputTextAndImage}
            type="text"
            placeholder="Image URL"
            value={textAndImgImageOptions[index] || ''}
            onChange={(e) => handleNewImageChange(index, e.target.value)}
          />


          {textAndImgOptions.length > 2 && index > 1 && <DeleteForeverIcon className={styles.deleteIcon} onClick={() => handleTextAndImageDelete(index)} />}
        </div>
      ));
    }
    return null;
  };


  // const handleQuizLink = () => {
  //   setShowQuizLink(true);
  //   // closePollType();
  // };


  const handleClosePopUp = (flag) => {
    setShowQuizLink(flag);
    closeQandA();
  };

  const handleCreateQuiz = async () => {

    // Validate question input
    if (!questions[selectedOption] || !questions[selectedOption].trim()) {
      // Alert or handle the case where the question input is not filled
      alert('Please enter a question.');
      return;
    }

    // Validate fields based on the selected option type
    if (selectedOption === 'text') {
      // Validate text options
      if (textOptions.some(option => !option.trim())) {
        // Alert or handle the case where a text option is not filled
        alert('Please fill in all text options.');
        return;
      }
      // Validate correct option
      if (!textQuizData.correctOption.trim()) {
        // Alert or handle the case where the correct option is not selected
        alert('Please select the correct text option.');
        return;
      }
    } else if (selectedOption === 'imageURL') {
      // Validate image options
      if (imageOptions.some(option => !option.trim())) {
        // Alert or handle the case where an image option is not filled
        alert('Please fill in all image options.');
        return;
      }
      // Validate correct option
      if (!imageQuizData.correctOption.trim()) {
        // Alert or handle the case where the correct option is not selected
        alert('Please select the correct image option.');
        return;
      }
    } else if (selectedOption === 'textandimageURL') {
      // Validate text and image options
      if (
        textAndImgTextOptions.some(option => !option.trim()) ||
        textAndImgImageOptions.some(option => !option.trim())
      ) {
        // Alert or handle the case where a text or image option is not filled
        alert('Please fill in all text and image options.');
        return;
      }
      // Validate correct option
      if (!textandImageQuizData.correctOption.trim()) {
        // Alert or handle the case where the correct option is not selected
        alert('Please select the correct text and image option.');
        return;
      }
    }

    const currentDateAndTime = new Date();

    debugger
    const finalQuizCreatedData = {
      quizName: sendQuizName,

      typeText: 'text',
      questionText: questions.text,
      optionsText: textOptions,
      correctOptionText: textQuizData.correctOption,
      // timeText: textQuizData.time,

      typeImg: 'imageURL',
      questionImg: questions.imageURL,
      optionsImg: imageOptions,
      correctOptionImg: imageQuizData.correctOption,
      // timeImg: imageQuizData.time,

      typeTxtImg: 'textandimageURL',
      questionTxtImg: questions.textandimageURL,
      optionsTxtImg: textAndImgTextOptions,
      optionsImageTxtImg: textAndImgImageOptions,
      correctOptionTxtImg: textandImageQuizData.correctOption,
      // timeTxtImg: textandImageQuizData.time,

      currentDateAndTime: currentDateAndTime.toISOString(), // Add current date and time

      totalTime:totalTime.newTime
    }
    // setCreatedQuizData((prevData) => [...prevData, finalQuizCreatedData]); // Append to the existing array
    console.log("finalQuizCreatedData", finalQuizCreatedData);


    // Call the API directly with the single object
    try {
      const response = await axios.post("http://localhost:4747/api/create/quiz", finalQuizCreatedData);

      console.log("Api Response", response.data);
    } catch (error) {
      console.error('Error posting data to API:', error);
    }




    setQuestions({
      text: "",
      imageURL: "",
      textandimageURL: ""
    });
    setTextOptions(["", ""]);
    setImageOptions(["", ""]);

    setTextQuizData({
      quest: "",
      options: ["", ""],
      correctOption: "",
      time: 0
    });
    setImageQuizData({
      quest: "",
      options: ["", ""],
      correctOption: "",
      time: 0
    });
    setTextandImageQuizData({
      quest: "",
      options: ["", ""],
      optionsImage: ["", ""],
      correctOption: "",
      time: 0
    });
    // setTextAndImgTextOptions(["", ""]);

    // setTextAndImgImageOptions(["", ""]);
    setTextAndImgTextOptions(new Array(textAndImgOptions.length).fill(""));
    setTextAndImgImageOptions(new Array(textAndImgOptions.length).fill(""));

    setShowQuizLink(true);

  };

  const handleDeleteQuiz = (index) => {
    let updatedNewQuiz = [...newQuiz];
    updatedNewQuiz.splice(index, 1);
    setnewQuiz(updatedNewQuiz);
  }
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.parent}>
          <div className={styles.addButton}>
            <div className={styles.upperButton}>

              <button>1</button>
              {newQuiz.map((item, index) => (
                <div key={index} >
                  <button>{item + 1}</button>
                  {index > -1 && (
                    <CloseIcon
                      className={styles.closeIcon}
                      onClick={() => handleDeleteQuiz(index)}
                    />
                  )}
                </div>
              ))}
              {newQuiz.length < 4 && (
                <button className={styles.addQuestion} onClick={handleCreateNewQuiz}>
                  +
                </button>
              )}

            </div>
            <p>Max 5 questions</p>
          </div>
          <div className={styles.inputParent}>
            <input
              className={styles.input}
              placeholder="QuestionAndAnswer"
              name="question"
              value={questions[selectedOption] || ''}
              onChange={(e) => {
                // Update the question for the currently selected option type
                updateQuestion(selectedOption, e.target.value);
              }}
            />
          </div>
          <div className={styles.buttonContainer}>
            <p>Option Type</p>


            <input
              className={styles.radio}
              type="radio"
              value="text"
              checked={selectedOption === 'text'}
              onChange={() => handleOptionChange('text')}
            />
            <label>Text</label>


            <input
              className={styles.radio}
              type="radio"
              value="imageURL"
              checked={selectedOption === 'imageURL'}
              onChange={() => handleOptionChange('imageURL')}
            />
            <label>Image URL</label>


            <input
              className={styles.radio}
              type="radio"
              value="textandimageURL"
              checked={selectedOption === 'textandimageURL'}
              onChange={() => handleOptionChange('textandimageURL')}
            />
            <label>Text and Image URL</label>
          </div>


          <div className={styles.typeSelectContainer}>
            <div className={styles.childOneContainer}>
              {renderOptions()}
              <div className={styles.subChildContainer}>
                <button onClick={handleAddOption}>Add option</button>
              </div>
            </div>
            <div className={styles.childTwoContainer}>
              <p>Timer</p>
              <button onClick={() => handleTimer(0)}>Off</button>
              <button onClick={() => handleTimer(5)}>5 sec</button>
              <button onClick={() => handleTimer(10)}>10 sec</button>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton} onClick={closeQandA}>
              Cancel
            </button>
            <button className={styles.createButton} onClick={handleCreateQuiz}>
              Create Quiz
            </button>
          </div>
        </div>
      </div>
      {showQuizLink && <QuizLinkPopUp closePopUp={handleClosePopUp} />}
    </>
  );
}


export default QandAnsPopUp;



