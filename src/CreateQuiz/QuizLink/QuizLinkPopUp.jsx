import React, { useState } from 'react'
import styles from '../QuizLink/Style.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function QuizLinkPopUp({closePopUp}) {

    const handleClosePopUp=()=>{
        closePopUp(false)
    }

    const handleShare =()=>{
        toast("Link copied to Clipboard!", {
            position: "top-right",
            
          });
    }
    return (
        <div>
            <ToastContainer />
            <div className={styles.overlay}>
                <div className={styles.parent}>
                
                    <div className={styles.cancelButton}>
                            <div onClick={handleClosePopUp}><CloseIcon/></div>
                    </div>
                    <div className={styles.message}>
                        <h2>
                        Congrats your Quiz is Published!
                        </h2>
                    </div>
                    <div className={styles.inputParent}>
                        <input className={styles.input} placeholder="your link is here" />
                    </div>

                    <div className={styles.buttonContainer}>
                        <button className={styles.createButton} onClick={handleShare}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizLinkPopUp