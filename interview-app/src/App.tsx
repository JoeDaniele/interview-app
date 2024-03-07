import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SteamFriendsList from './SteamFriendsList';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to My Steam App</h1>
        <Link to="/friends-list">
          <button>Go to Friends List</button>
        </Link>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/friends-list" element={<SteamFriendsList />} />
      </Routes>
    </Router>
  );
}

export default App;
