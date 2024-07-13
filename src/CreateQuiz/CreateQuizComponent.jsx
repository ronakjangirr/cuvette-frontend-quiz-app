import React, {useState} from 'react'
import styles from '../CreateQuiz/Style.module.css'
import PollTypePopUp from './PollType/PollTypePopUp';
import QandAnsPopUp from './QandAnsType/QandAnsPopUp';

function CreateQuizComponent({ closePopUp }) {
  const [selectedQuizType, setSelectedQuizType] = useState('');
  const [showComponent, setShowComponent] = useState(false);
  const [quizName, setQuizName] = useState('');


  const handleCancel = () => {
    closePopUp(false)
  }

  const handleContinue = () => {
    debugger
    if(!quizName){
      return alert("Please enter quiz name");
    }

    if(selectedQuizType){
      setShowComponent(true)
    }
  }

  const handleQuizTypeClick = (quizType) => {
    setSelectedQuizType(quizType)
    console.log("selectedQuizType", selectedQuizType)      // This will should coz react takes time to update the value
    console.log("quizType", quizType) // BUt this will show the data
    
    // setSelectedQuizType((prev)=>)
  }

  const closeHandle =(flag)=>{
    setShowComponent(flag)
    handleCancel()
  }
    
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.parent}>
          <div className={styles.inputParent}>
            <input className={styles.input} placeholder="Quiz Name" value={quizName} onChange={(e)=>setQuizName(e.target.value)}/>
          </div>
          <div className={styles.buttonContainer}>
            <p>Quiz Type</p>
            <button className={styles.customButton} onClick={() => handleQuizTypeClick('q&a')}>Q & A</button>
            <button className={styles.customButton} onClick={() => handleQuizTypeClick('poll-type')}>Poll Type</button>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
            <button className={styles.continueButton} onClick={handleContinue}>Continue</button>
          </div>
        </div>
      </div>
      {
        selectedQuizType && showComponent &&(
          <>  
          {
              selectedQuizType === "q&a"? (
                <QandAnsPopUp closePopUp={closeHandle} sendQuizName={quizName}/>
              ):(
                <PollTypePopUp closePopUp={closeHandle} sendQuizName={quizName}/>
              )
            }
            </>
        )
      }
    </>
  )
}

export default CreateQuizComponent