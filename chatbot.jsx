import React, { useState } from 'react';
import './App.css';

function App() {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [botResponses, setBotResponses] = useState([
    "I'm here to help.",
    "Please let me know your queries.",
    "I'm all ears.",
    "Ready to assist!"
  ]);

  const handleUserInput = () => {
    if (userName && userRole) {
      const botResponse = generateBotResponse(userRole, userQuery);
      addMessage(userName, true);
      addMessage(botResponse, false);
      setUserQuery('');
    }
  };

  const generateBotResponse = (role, query) => {
    if (role === 'hawker') {
      // Customize responses for hawker role based on query
      return `Hi ${userName}, How's your ${query} business going?`;
    } else if (role === 'buyer') {
      // Customize responses for buyer role based on query
      return `Hi ${userName}, How can I assist you in finding ${query}?`;
    } else {
      return 'Please enter a valid role (hawker or buyer).';
    }
  };

  const addMessage = (text, isUser) => {
    setChatMessages([...chatMessages, { text, isUser }]);
  };

  return (
    <div className="App">
      <div id="chat-container">
        <div id="chat-box">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Enter your name..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your role (hawker or buyer)..."
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ask your question..."
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleUserInput();
          }}
          disabled={!userName || !userRole}
        />
        <button onClick={handleUserInput} disabled={!userName || !userRole}>Send</button>
      </div>
    </div>
  );
}

export default App;
