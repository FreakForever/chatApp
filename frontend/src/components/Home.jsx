import { useState } from 'react';
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

    return (
        <div className="h-screen bg-slate-950 text-white mt-10">
            {/* Main Content */}
            <div className="flex flex-col justify-center items-center h-[40%] px-4 sm:px-8 mt-10">
                <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 hover:text-purple-400 transition-colors duration-300 transform hover:scale-105 mt-10">
                    Welcome to Chat App! 🎉
                </h1>
                <p className="text-base sm:text-lg text-center max-w-2xl mb-4 sm:mb-8 hover:text-purple-300 transition-colors duration-300 transform hover:scale-105">
                    Connect with people from all over the world, anonymously and securely. 🤝 Start chatting with random strangers now!
                </p>

                {/* Start Chat Button */}
                <button
                    onClick={handleStartChatClick}
                    className="bg-purple-200 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-purple-500 shadow-lg hover:bg-purple-400 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                    💬 Start Chatting
                </button>
            </div>

            {/* Modal for login prompt */}
            {showModal && (
                <div className="fixed inset-0 bg-black flex justify-center items-center bg-opacity-50 z-50">
                    <div className="bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg text-white border border-slate-700">
                        <h2 className="text-lg sm:text-xl font-bold mb-4">🔒 Login Required</h2>
                        <p className="mb-4 sm:mb-6">Please log in to continue to the chat. ✨</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mr-2 transition-all duration-300 transform hover:scale-105"
                            >
                                🔑 Login
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
                            >
                                ❌ Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Features Section */}
            <div className="bg-slate-900 text-white py-12 sm:py-16 px-6 sm:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 hover:text-purple-400 transition-colors duration-300">✨ Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {["Anonymous Chatting 🤐", "Real-time Messaging ⚡", "Match with New People 🌍", "Secure Connections 🔒", "Easy to Use Interface 📱", "Mobile-Friendly 📲"].map((feature, index) => (
                        <div key={index} className="bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg border border-slate-700 transition-all duration-300 transform hover:scale-105">
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 hover:text-purple-300">{feature}</h3>
                            <p className="text-purple-200 text-sm sm:text-base">
                                {index === 0 && "Chat with random strangers without revealing your identity. Enjoy secure and private conversations."}
                                {index === 1 && "Experience real-time messaging with strangers all over the world. Chat with zero delays."}
                                {index === 2 && "Get randomly matched with people and make new friends globally with just a click."}
                                {index === 3 && "We prioritize your privacy and ensure all connections are secure with encrypted messages."}
                                {index === 4 && "Our user-friendly interface makes it easy to start conversations without any hassle."}
                                {index === 5 && "Access Stranger Chat on any device, whether it's mobile, tablet, or desktop."}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How it Works Section */}
            <div className="bg-slate-950 text-white py-12 sm:py-16 px-6 sm:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 hover:text-purple-400 transition-colors duration-300">🔍 How It Works</h2>
                <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-6 sm:gap-8">
                    {[1, 2, 3].map(step => (
                        <div key={step} className="bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md border border-slate-700 hover:shadow-lg transition-all duration-300 text-center transform hover:scale-105">
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 hover:text-purple-300">Step {step}</h3>
                            <p className="text-sm sm:text-base">
                                {step === 1 && "Sign up or log in to start chatting. 📝"}
                                {step === 2 && 'Click on "Start Chatting" to get matched with a random stranger. 🤝'}
                                {step === 3 && "Begin your conversation and make a new connection! 💬"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-slate-900 text-white py-12 sm:py-16 px-6 sm:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 hover:text-purple-400 transition-colors duration-300">💬 What People Are Saying</h2>
                <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-6 sm:gap-8">
                    {["Jane Doe", "John Smith", "Emily Lee"].map((name, index) => (
                        <div key={index} className="text-center hover:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md transition-all duration-300 bg-slate-700 transform hover:scale-105">
                            <p className="text-xl sm:text-lg italic mb-4 sm:mb-6">
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
            <div className="bg-slate-950 text-white py-12 sm:py-16 px-6 sm:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 hover:text-purple-400 transition-colors duration-300">💡 How This Can Help with User Stress</h2>
                <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-6 sm:gap-8">
                    {["Express Yourself 💬", "Connect with Others 🤝", "Anonymous Support 🤫"].map((benefit, index) => (
                        <div key={index} className="bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg border border-slate-700 text-center transition-all duration-300 transform hover:scale-105">
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 hover:text-purple-300">{benefit}</h3>
                            <p className="text-sm sm:text-base">
                                {index === 0 && "Chatting anonymously allows you to express your feelings without judgment."}
                                {index === 1 && "You can find new connections and share experiences, reducing stress."}
                                {index === 2 && "Connecting anonymously can help you feel less vulnerable and more supported."}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;