import { useEffect, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io.connect("https://chatapp-awll.onrender.com");

const Chat = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [recipient, setRecipient] = useState("");
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [navbarColor, setNavbarColor] = useState("bg-gradient-to-r from-indigo-900 to-purple-900");
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
                const response = await axios.get("https://chatapp-awll.onrender.com/api/users", {
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
            const response = await axios.get(`https://chatapp-awll.onrender.com/api/messages/${loggedInUsername}/${recipientUsername}`, {
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
        if (!recipient) {
            alert("Please select a user");
            return;
        }
        if (!messageText.trim()) {
            alert("Please type a message before sending");
            return;
        }

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
            "bg-gradient-to-r from-indigo-900 to-purple-900",
            "bg-gradient-to-r from-blue-900 to-indigo-900",
            "bg-gradient-to-r from-purple-900 to-blue-900"
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

    const getLatestMessage = (username) => {
        const userMessages = messages.filter(msg => 
            (msg.from === username && msg.to === user.username) || 
            (msg.from === user.username && msg.to === username)
        );
        return userMessages.length > 0 ? userMessages[userMessages.length - 1].text : "No messages yet";
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            <nav className={`${navbarColor} text-white p-4 flex justify-between items-center shadow-lg backdrop-blur-sm bg-opacity-70 transition-all duration-1000`}>
                <ul className="flex space-x-8">
                    {["Home", "About", "Services", "Security"].map((item) => (
                        <li key={item}>
                            <button 
                                onClick={() => navigate(`/${item.toLowerCase()}`)} 
                                className="px-3 py-1 rounded-full bg-transparent hover:bg-white/10 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
                <button 
                    onClick={handleLogout} 
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300 transform hover:scale-105 hover:rotate-3"
                >
                    Logout
                </button>
            </nav>

            <div className="flex items-center justify-center flex-1 p-4">
                <div className="flex flex-col md:flex-row justify-center items-start space-y-4 md:space-y-0 md:space-x-4 w-full max-w-7xl">
                    {/* User List Box */}
                    <div className="w-full md:w-1/3 p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/30 h-[600px] flex flex-col">
                        <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Users</h3>

                        {/* Search Bar */}
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 mb-4 rounded-full bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                        />

                        <div className="flex-grow h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                            <ul>
                                {filteredUsers.map((u) => (
                                    <li
                                        key={u._id}
                                        onClick={() => handleUserClick(u.username)}
                                        className="cursor-pointer p-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-r from-blue-900/30 to-purple-900/30 transform hover:scale-105 hover:shadow-lg"
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={u.profilePic}
                                                alt={u.username}
                                                className="w-10 h-10 rounded-full mr-3 border-2 border-blue-500/50 transition-transform duration-300 hover:rotate-6"
                                            />
                                            <div>
                                                <span className="text-white font-semibold">{u.username}</span>
                                                <p className="text-gray-400 text-sm truncate max-w-[200px]">{getLatestMessage(u.username)}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Random User Button */}
                        <button
                            onClick={handleRandomUserClick}
                            className="mt-4 w-full p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                        >
                            Pick Random User
                        </button>
                        {loading && (
                            <div className="mt-2 text-center">
                                <p className="text-gray-300 animate-pulse">Loading...</p>
                                <p className="text-gray-400">Elapsed Time: {loadingTime} seconds</p>
                            </div>
                        )}
                        {notification && <p className="mt-2 text-green-400 animate-bounce">{notification}</p>}
                    </div>

                    {/* Chat Box */}
                    <div className="w-full md:w-2/3 flex flex-col bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/30 h-[600px] p-4">
                        <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                            Chat with {recipient || "Select a user"}
                        </h3>

                        <div className="flex-grow overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                            <div className="flex flex-col space-y-3">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.from === user.username ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-3 rounded-2xl max-w-[70%] ${msg.from === user.username ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-gray-700 text-gray-200'} shadow-md`}>
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
                                className="w-full p-3 rounded-full bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                            />
                            <button 
                                type="submit" 
                                className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                            >
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