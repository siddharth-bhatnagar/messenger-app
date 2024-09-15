import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

const Sidebar = ({ chats, selectedChat, onChatSelect, onNewChat, isOpen, onToggle }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newChatName, setNewChatName] = useState('');

    const handleNewChat = () => {
        if (newChatName.trim()) {
            onNewChat(newChatName.trim());
            setNewChatName('');
            setIsModalOpen(false);
        }
    };

    return (
        <div className={`${isOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-gray-900 text-gray-100 flex flex-col`}>
            <div className="p-4 flex items-center justify-between">
                {isOpen && <h2 className="text-lg font-semibold">Chats</h2>}
                <button
                    onClick={onToggle}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-300"
                >
                    {isOpen ? '«' : '»'}
                </button>
            </div>
            <div className="p-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-300"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    {isOpen && "New Chat"}
                </button>
            </div>
            <ul className="flex-1 overflow-y-auto space-y-2">
                {chats.map((chat) => (
                    <li
                        key={chat.id}
                        onClick={() => onChatSelect(chat.id)}
                        className={`p-3 cursor-pointer rounded-lg ${selectedChat && selectedChat.id === chat.id ? 'bg-gray-800' : 'hover:bg-gray-700'
                            } transition-colors duration-300`}
                    >
                        {isOpen ? chat.name : chat.name[0].toUpperCase()}
                    </li>
                ))}
            </ul>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-1/2"> 
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Start a New Chat</h3>
                        <input
                            type="text"
                            value={newChatName}
                            onChange={(e) => setNewChatName(e.target.value)}
                            placeholder="Enter user name"
                            className="w-full border border-gray-300 p-2 rounded-md mb-4 text-gray-800"
                        />
                        <div className="flex justify-center">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleNewChat}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                            >
                                Start Chat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;