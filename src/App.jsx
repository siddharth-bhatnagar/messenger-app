import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import ChatScreen from './components/ChatScreen/ChatScreen';

const App = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleNewChat = (name) => {
    const existingChat = chats.find(chat => chat.name.toLowerCase() === name.toLowerCase());
    if (existingChat) {
      setSelectedChat(existingChat);
    } else {
      const newChat = {
        id: Date.now(),
        name,
        messages: []
      };
      setChats([...chats, newChat]);
      setSelectedChat(newChat);
    }
  };

  const handleChatSelect = (chatId) => {
    const chat = chats.find(c => c.id === chatId);
    setSelectedChat(chat);
  };

  const handleSendMessage = (message) => {
    if (selectedChat) {
      const updatedChat = {
        ...selectedChat,
        messages: [...selectedChat.messages, { text: message, sender: 'me' }]
      };
      setChats(chats.map(chat => chat.id === selectedChat.id ? updatedChat : chat));
      setSelectedChat(updatedChat);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          chats={chats}
          selectedChat={selectedChat}
          onChatSelect={handleChatSelect}
          onNewChat={handleNewChat}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        {selectedChat ? (
          <ChatScreen chat={selectedChat} onSendMessage={handleSendMessage} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <p className="text-gray-500 text-lg">Select a chat or start a new one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;