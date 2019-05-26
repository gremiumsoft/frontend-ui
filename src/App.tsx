import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AllQuizzes from "./AllQuizes";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Gremium Quiz</p>
        <AllQuizzes />
      </header>
    </div>
  );
};

export default App;
