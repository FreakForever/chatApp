import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:8000");

const Chat = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [recipient, setRecipient] = useState("");
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [navbarColor, setNavbarColor] = useState("bg-gray-800");
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState("");
    const [loadingTime, setLoadingTime] = useState(0);
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedToken) setToken(storedToken);
        if (storedUser) {
            setUser(storedUser);
            socket.emit("join_room", storedUser.username);
        }
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) return;
            try {
                const response = await axios.get("http://localhost:8000/api/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error.response?.data || error.message);
            }
        };

        fetchUsers();
    }, [token]);

    const fetchMessages = async (loggedInUsername, recipientUsername) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/messages/${loggedInUsername}/${recipientUsername}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(response.data);
            endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
        } catch (error) {
            console.error("Error fetching messages:", error.response?.data || error.message);
        }
    };

    const handleUserClick = (recipientUsername) => {
        setRecipient(recipientUsername);
        fetchMessages(user.username, recipientUsername);
        socket.emit("join_room", recipientUsername);
        setNotification("");
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageText || !recipient) return;

        const messageData = {
            from: user.username,
            to: recipient,
            text: messageText,
        };

        socket.emit("send_message", messageData);
        setMessages((prev) => [...prev, messageData]);
        setMessageText("");
    };

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            if (
                (data.from === user?.username && data.to === recipient) ||
                (data.to === user?.username && data.from === recipient)
            ) {
                setMessages((prev) => (prev.some(msg => msg.text === data.text) ? prev : [...prev, data]));
            }
        };

        socket.on("receive_message", handleReceiveMessage);
        return () => {
            socket.off("receive_message");
        };
    }, [recipient, user?.username]);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const filteredUsers = users.filter((u) =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        socket.disconnect();
        navigate("/");
    };

    useEffect(() => {
        const colors = [
            "bg-gray-800",
            "bg-gray-700",
            "bg-gray-600",
            "bg-gray-500",
            "bg-gray-400"
        ];
        let currentIndex = 0;

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % colors.length;
            setNavbarColor(colors[currentIndex]);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleRandomUserClick = () => {
        if (filteredUsers.length === 0) return;

        setLoading(true);
        setLoadingTime(0);

        const timer = setInterval(() => {
            setLoadingTime((prev) => prev + 1);
        }, 1000);

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * filteredUsers.length);
            const randomUser = filteredUsers[randomIndex].username;
            handleUserClick(randomUser);
            setNotification(`You are now chatting with ${randomUser}`);
            setLoading(false);
            clearInterval(timer);
        }, 3000);
    };

    // Create a function to get the latest message for each user
    const getLatestMessage = (username) => {
        const userMessages = messages.filter(msg => 
            (msg.from === username && msg.to === user.username) || 
            (msg.from === user.username && msg.to === username)
        );
        return userMessages.length > 0 ? userMessages[userMessages.length - 1].text : "No messages yet";
    };

    return (
        <div className="flex flex-col h-screen bg-slate-500">
            <nav className={`${navbarColor} text-white p-4 flex justify-between items-center transition-colors duration-1000`}>
                <ul className="flex space-x-8">
                    <li>
                        <button 
                            onClick={() => navigate("/")} 
                            className="border border-transparent hover:border-white hover:bg-gray-700 px-2 py-1 rounded transition duration-200"
                        >
                            Home
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => navigate("/about")} 
                            className="border border-transparent hover:border-white hover:bg-gray-700 px-2 py-1 rounded transition duration-200"
                        >
                            About
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => navigate("/services")} 
                            className="border border-transparent hover:border-white hover:bg-gray-700 px-2 py-1 rounded transition duration-200"
                        >
                            Services
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => navigate("/security")} 
                            className="border border-transparent hover:border-white hover:bg-gray-700 px-2 py-1 rounded transition duration-200"
                        >
                            Security
                        </button>
                    </li>
                </ul>
                <button 
                    onClick={handleLogout} 
                    className="border border-transparent hover:border-white hover:bg-gray-700 px-2 py-1 rounded transition duration-200"
                >
                    Logout
                </button>
            </nav>


            <div className="flex items-center justify-center flex-1 p-4">
                <div className="flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-4 w-full max-w-7xl">
                    {/* User List Box */}
                    <div className="w-full md:w-1/3 border-r border-gray-700 p-4 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg h-[600px] flex flex-col">
                        <h3 className="text-lg font-semibold mb-4 text-gray-200">Users</h3>

                        {/* Search Bar */}
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-gray-300 border border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />

                        <div className="flex-grow h-[500px] overflow-y-scroll">
                            <ul>
                                {filteredUsers.map((u) => (
                                    <li
                                        key={u._id}
                                        onClick={() => handleUserClick(u.username)}
                                        className="cursor-pointer hover:bg-gray-700 p-2 rounded-md flex flex-col transition duration-200 transform hover:scale-105"
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={u.profilePic}
                                                alt={u.username}
                                                className="w-8 h-8 rounded-full mr-2"
                                            />
                                            <span className="text-gray-300">{u.username}</span>
                                        </div>
                                        <span className="text-gray-400 text-sm">{getLatestMessage(u.username)}</span> {/* Display latest message */}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Random User Button */}
                        <button
                            onClick={handleRandomUserClick}
                            className="mt-4 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-200"
                        >
                            Pick Random User
                        </button>
                        {loading && (
                            <div className="mt-2 text-gray-300">
                                <p>Loading...</p>
                                <p>Elapsed Time: {loadingTime} seconds</p>
                            </div>
                        )}
                        {notification && <p className="mt-2 text-green-300">{notification}</p>}
                    </div>

                    {/* Chat Box */}
                    <div className="w-full md:w-2/3 flex flex-col bg-gray-800 bg-opacity-90 rounded-lg shadow-lg h-[600px] p-4">
                        <h3 className="text-lg font-semibold mb-4 text-gray-200">
                            Chat with {recipient || "Select a user"}
                        </h3>

                        <div className="flex-grow overflow-y-scroll">
                            <div className="flex flex-col space-y-2">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.from === user.username ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-2 rounded-lg ${msg.from === user.username ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-200'}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                <div ref={endOfMessagesRef} />
                            </div>
                        </div>

                        <form onSubmit={handleSendMessage} className="flex space-x-2 mt-4">
                            <input
                                type="text"
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                placeholder="Type your message..."
                                className="w-full p-2 rounded-md bg-gray-700 text-gray-300 border border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                            <button type="submit" className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-200">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;





























