import React, { useState, useRef, useEffect } from 'react';

const ChatScreen = ({ chat, onSendMessage }) => {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [chat.messages]);

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-gray-50">
            <div className="bg-white-600 text-black p-4 shadow-lg">
                <h2 className="text-lg font-semibold">{chat.name}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chat.messages.map((msg, index) => (
                    <div key={index} className={`mb-4 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-3 rounded-xl ${msg.sender === 'me'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-900'
                            } max-w-xs break-words`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 border border-gray-300 p-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-indigo-600 text-white p-3 rounded-r-md hover:bg-indigo-700 transition-colors duration-300"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;