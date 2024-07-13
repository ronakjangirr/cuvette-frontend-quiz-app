import React, { useEffect, useState } from 'react'
import DashboardComponent from '../Dashboard/DashboardComponent';
import AnalyticsComponent from '../Analytics/AnalyticsComponent';
import CreateQuizComponent from '../CreateQuiz/CreateQuizComponent';
import styles from "../MainDashboard/Style.module.css"; // Assuming you have a CSS module for styling
import QnaComponent from '../Qna.jsx/QnaComponent';
import { useNavigate } from 'react-router-dom';

function MainDashBoardComponent() {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [showCreateQuizPopUp, setShowCreateQuizPopUp] = useState(false);
  const navigate = useNavigate();
  const [showQnaComponent, setShowQnaComponent] = useState(false); // Add this line
  const [selectedQuizId, setSelectedQuizId] = useState();

  // Uncomment it later for token verification

  // useEffect(()=>{
  //   let verifyToken = window.localStorage.getItem('token')

  //   if(!verifyToken){
  //     navigate('/')
  //   }
  // },)

  const handleQnaClick = () => {
    setActiveComponent('qna')
    setShowQnaComponent(true);
    // setSelectedQuizId(quizId);

  }

  const handleCreateQuizePopUp = () => {
    setShowCreateQuizPopUp(true);
  }

  const closeCreateQuiz = (flag) => {
    setShowCreateQuizPopUp(flag)
  }

  const handleLogout = () => {
    window.localStorage.clear();
    navigate('/');
  }


  const renderComponent = () => {

    // if (showQnaComponent) {
    //   return <QnaComponent quizId={selectedQuizId} />;
    // }

    switch (activeComponent) {
      case 'dashboard':
        return <DashboardComponent />;
      case 'analytics':
        return <AnalyticsComponent onQnaClick={handleQnaClick} />;
      // return <AnalyticsComponent onQnaClick={(quizId) => handleQnaClick(quizId)} />
      case 'qna':
        return <QnaComponent />;
      default:
        return null;
    }
  };


  return (
    <>
      <div className={styles.fullScreenDiv}>

        <div className={styles.dashboardContainer}>
          <div className={styles.sidebar}>
            <div className={styles.logo}>
              <h1>Quizzie</h1>
            </div>
            <div className={styles.menu}>
              <button onClick={() => setActiveComponent('dashboard')}>Dashboard</button>
              <button onClick={() => setActiveComponent('analytics')}>Analytics</button>
              <button onClick={handleCreateQuizePopUp}>Create Quiz</button>
            </div>
            <div className={styles.logout}>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <div className={styles.compRender}>
            {renderComponent()}
          </div>
          {
            showCreateQuizPopUp && (
              <CreateQuizComponent closePopUp={closeCreateQuiz} />
            )
          }
        </div>
      </div>

    </>
  )
}

export default MainDashBoardComponent