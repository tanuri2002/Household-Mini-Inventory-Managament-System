import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import './index.css'; 
import HomePg from './pages/HomePg';
// import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from "./pages/Dashboard";
import AddItem from './pages/AddItem';
import Footer from './components/Footer';
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <AuthProvider>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePg />} />
          <Route path="/homepg" element={<HomePg />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/additem" element={<AddItem />} />
        </Routes>
        <Footer/>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;




