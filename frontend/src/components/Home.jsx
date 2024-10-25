import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    // Check if the user is logged in
    const isLoggedIn = () => {
        return localStorage.getItem('token') !== null;
    };

    // Handle navigation to the chat page
    const handleStartChatClick = () => {
        if (isLoggedIn()) {
            navigate('/chat');
        } else {
            setShowModal(true);
        }
    };

    // Handle login button click in the navbar
    const handleLoginClick = () => {
        navigate('/login');
    };

    // Handle logout
    const handleLogoutClick = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/'); // Navigate back to the home page
        // Optionally, you can show a message or perform other actions here
    };

    return (
        <div className="h-screen bg-gray-900 text-white">
            {/* Navbar */}
            <nav className="w-full py-4 px-8 flex justify-between items-center bg-violet-800 bg-opacity-90 shadow-md">
                <div className="text-3xl font-bold text-white hover:text-violet-300 transition-colors duration-300">
                    🌐 SStranger Chat
                </div>
                <div>
                    {isLoggedIn() ? (
                        <button 
                            onClick={handleLogoutClick} 
                            className="bg-gray-300 text-black px-5 py-2 rounded-full border border-gray-500 hover:bg-violet-400 transition-all duration-300 transform hover:scale-105"
                        >
                            🚪 Logout
                        </button>
                    ) : (
                        <button 
                            onClick={handleLoginClick} 
                            className="bg-gray-300 text-black px-5 py-2 rounded-full border border-gray-500 hover:bg-violet-400 transition-all duration-300 transform hover:scale-105"
                        >
                            🔑 Login
                        </button>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col justify-center items-center h-[40%]">
                <h1 className="text-5xl font-bold mb-6 hover:text-violet-400 transition-colors duration-300 transform hover:scale-105">
                    Welcome to Stranger Chat! 🎉
                </h1>
                <p className="text-lg text-center max-w-2xl mb-8 hover:text-pink-400 transition-colors duration-300 transform hover:scale-105"> 
                    Connect with people from all over the world, anonymously and securely. 🤝 Start chatting with random strangers now!
                </p>

                {/* Start Chat Button */}
                <button
                    onClick={handleStartChatClick}
                    className="bg-gray-300 text-black px-6 py-3 rounded-full border border-gray-500 shadow-lg hover:bg-violet-400 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                    💬 Start Chatting
                </button>
            </div>

            {/* Modal for login prompt */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
                    <div className="bg-violet-800 p-6 rounded-lg shadow-lg text-white border border-gray-700">
                        <h2 className="text-xl font-bold mb-4">🔒 Login Required</h2>
                        <p className="mb-6">Please log in to continue to the chat. ✨</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2 transition-all duration-300 transform hover:scale-105"
                            >
                                🔑 Login
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-all duration-300 transform hover:scale-105"
                            >
                                ❌ Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Features Section */}
            <div className="bg-gray-800 text-white py-16 px-8">
                <h2 className="text-3xl font-bold text-center mb-8 hover:text-violet-400 transition-colors duration-300">✨ Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {["Anonymous Chatting 🤐", "Real-time Messaging ⚡", "Match with New People 🌍", "Secure Connections 🔒", "Easy to Use Interface 📱", "Mobile-Friendly 📲"].map((feature, index) => (
                        <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg border border-gray-600 transition-all duration-300 transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-2 hover:text-yellow-300">{feature}</h3>
                            <p className="text-gray-300">
                                {index === 0 && "Chat with random strangers without revealing your identity. Enjoy secure and private conversations."}
                                {index === 1 && "Experience real-time messaging with strangers all over the world. Chat with zero delays."}
                                {index === 2 && "Get randomly matched with people and make new friends globally with just a click."}
                                {index === 3 && "We prioritize your privacy and ensure all connections are secure with encrypted messages."}
                                {index === 4 && "Our user-friendly interface makes it easy to start conversations without any hassle."}
                                {index === 5 && "Access Stranger Chat on any device, whether it’s mobile, tablet, or desktop."}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How it Works Section */}
            <div className="bg-gray-900 text-white py-16 px-8">
                <h2 className="text-3xl font-bold text-center mb-8 hover:text-violet-400 transition-colors duration-300">🔍 How It Works</h2>
                <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-8">
                    {[1, 2, 3].map(step => (
                        <div key={step} className="bg-gray-700 p-6 rounded-lg shadow-md border border-gray-600 hover:shadow-lg transition-all duration-300 text-center transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-4 hover:text-green-300">Step {step}</h3>
                            <p>
                                {step === 1 && "Sign up or log in to start chatting. 📝"}
                                {step === 2 && 'Click on "Start Chatting" to get matched with a random stranger. 🤝'}
                                {step === 3 && "Begin your conversation and make a new connection! 💬"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-gray-800 text-white py-16 px-8">
                <h2 className="text-3xl font-bold text-center mb-8 hover:text-violet-400 transition-colors duration-300">💬 What People Are Saying</h2>
                <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-8">
                    {["Jane Doe", "John Smith", "Emily Lee"].map((name, index) => (
                        <div key={index} className="text-center hover:bg-gray-700 p-6 rounded-lg shadow-md transition-all duration-300 bg-gray-600 transform hover:scale-105">
                            <p className="text-xl italic mb-4">
                                {index === 0 && '"Stranger Chat helped me meet people from all over the world!" 🌍'}
                                {index === 1 && '"I love how easy it is to connect and chat anonymously." 🤐'}
                                {index === 2 && '"The platform is secure, and the experience has been amazing." ⭐'}
                            </p>
                            <p className="font-semibold">{name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How This Can Help with User Stress Section */}
            <div className="bg-gray-900 text-white py-16 px-8">
                <h2 className="text-3xl font-bold text-center mb-8 hover:text-violet-400 transition-colors duration-300">💡 How This Can Help with User Stress</h2>
                <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-8">
                    {["Express Yourself 💬", "Connect with Others 🤝", "Anonymous Support 🤫"].map((benefit, index) => (
                        <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                            <h3 className="text-xl font-semibold mb-4 hover:text-pink-400">{benefit}</h3>
                            <p className="text-gray-300">
                                {index === 0 && "Talk about your feelings openly without judgment."}
                                {index === 1 && "Make connections with people who understand your experiences."}
                                {index === 2 && "Find comfort in anonymity and discuss your issues freely."}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;



















