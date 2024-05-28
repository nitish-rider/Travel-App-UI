import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Components/Header/Header";
import LoginPage from "./Pages/Login/Login"; // Import your LoginPage component
import HomePage from "./Pages/Home/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/login" element={<LoginPage />}>
          </Route>
          <Route path="/home" element={<HomePage />}>
          </Route>
          <Route path="/" element={<HomePage/>}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;