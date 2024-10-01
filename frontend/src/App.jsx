import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import StrangerChat from './components/StrangerChat';
import Home from './components/Home';        // Import Home component
import About from './components/About';      // Import About component
import Services from './components/Services'; // Import Services component
import Security from './components/Security'; // Import Security component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/stranger-chat" element={<StrangerChat />} />
                <Route path="/" element={<Home />} /> {/* Set Home as the default page */}
                <Route path="/about" element={<About />} /> {/* About page */}
                <Route path="/services" element={<Services />} /> {/* Services page */}
                <Route path="/security" element={<Security />} /> {/* Security page */}
            </Routes>
        </Router>
    );
};

export default App;







