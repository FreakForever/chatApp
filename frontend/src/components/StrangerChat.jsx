import  { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:8000"); // Adjust the URL as needed

const StrangerChat = () => {
    const navigate = useNavigate();
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState([]);
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        // Automatically join a room with a random user when the component mounts
        socket.emit("join_room", "Stranger");
    }, []);

    // Listen for incoming messages
    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setMessages((prev) => [...prev, data]);
        };

        socket.on("receive_message", handleReceiveMessage);

        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    }, []);

    // Scroll to the last message whenever messages change
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Send message
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageText) return;

        const messageData = {
            from: "You", // Adjust based on user identification
            text: messageText,
        };

        socket.emit("send_message", messageData);
        setMessages((prev) => [...prev, messageData]); // Optimistically add the message
        setMessageText(""); // Clear the input
    };

    return (
        <div className="flex flex-col h-screen">
            <nav className="bg-gray-800 text-white p-4">
                <button onClick={() => navigate("/")} className="hover:bg-gray-700 px-2 py-1 rounded transition duration-200">
                    Home
                </button>
                <button onClick={() => navigate("/chat")} className="hover:bg-gray-700 px-2 py-1 rounded transition duration-200">
                    Back to Chat
                </button>
            </nav>
            <div className="flex-1 p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-200">Chat with a Stranger</h3>
                <div className="h-[400px] overflow-y-scroll border border-gray-700 p-4 bg-gray-700 rounded-lg">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2 text-left">
                            <p className="font-semibold text-gray-300">{msg.from}:</p>
                            <p className="inline-block rounded-lg px-3 py-2 bg-indigo-500 text-white">
                                {msg.text}
                            </p>
                        </div>
                    ))}
                    <div ref={endOfMessagesRef} />
                </div>
                <form onSubmit={handleSendMessage} className="mt-4 flex">
                    <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type a message"
                        required
                        className="flex-1 border border-gray-700 rounded-l-md px-4 py-2 bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button type="submit" className="bg-blue-600 text-white rounded-r-md px-4 py-2 hover:bg-blue-700 transition duration-200">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StrangerChat;
