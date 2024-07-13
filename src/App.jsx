// import logo from './logo.svg';
import { Routes, Route } from "react-router-dom"
import './App.css';
import AuthPanel from './Auth/AuthPanel';
import MainDashBoardComponent from "./MainDashboard/MainDashBoardComponent";
import QuizFinal from "./QuizInterface/QuizCompleted/QuizFinal";
import QuizImage from "./QuizInterface/QuizeQandAns/QuizeQandAnsImage/QuizImage";
import QuizText from "./QuizInterface/QuizeQandAns/QuizQandAnsText/QuizText";
import QuizTextandImage from "./QuizInterface/QuizeQandAns/QuizeQandAnsTextandImage/QuizTextandImage";
// import NewQuizUi from "./QuizInterface/NewQuiz/NewQuizUi";
import PollText from "./QuizInterface/QuizPollType/QuizPollTypeText/PollText";
import QnaComponent from "./Qna.jsx/QnaComponent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPanel />} />
        <Route path="/dashboard" element={<MainDashBoardComponent />} />
        <Route path="/quiz-interface" element={<QuizImage />} />
        <Route path="/quiz-final" element={<QuizFinal />} />
        {/* <Route path="/quiz-text" element={<QuizText />} /> */}
        <Route path="/quiz-text/:id" element={<QuizText />} />
        <Route path="/poll-text/:id" element={<PollText />} />
        <Route path="/quiz-image" element={<QuizImage />} />
        <Route path="/quiz-text-image" element={<QuizTextandImage />} />
        {/* <Route path="/quiz-new-quiz-ui/:id" element={<NewQuizUi />} /> */}
        {/* <Route path="/quiz-new-quiz-ui" element={<NewQuizUi />} /> */}
        <Route path="/quiz-final" element={<QuizFinal />} />

        <Route path="/question-analysis/:quizId" element={<QnaComponent />} />



      </Routes>
    </>
  );
}

export default App;
