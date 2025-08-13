import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import './index.css'; 
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;




