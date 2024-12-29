import React, { useState } from 'react';
import { FaSearch, FaPaperPlane, FaSmile, FaPaperclip, FaEllipsisV } from 'react-icons/fa';
import '../styles/Message.css';

const Message = () => {
  const [contacts] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: 'https://via.placeholder.com/40',
      status: 'online',
      lastMessage: 'Want to play some Cyberpunk?',
      timestamp: '2 min ago',
      unread: 2
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      avatar: 'https://via.placeholder.com/40',
      status: 'offline',
      lastMessage: 'Thanks for the game recommendation!',
      timestamp: '1 hour ago',
      unread: 0
    },
    {
      id: 3,
      name: 'Mike Brown',
      avatar: 'https://via.placeholder.com/40',
      status: 'online',
      lastMessage: 'Did you see the new DLC?',
      timestamp: '3 hours ago',
      unread: 1
    }
  ]);

  const [messages] = useState([
    {
      id: 1,
      senderId: 1,
      text: 'Hey! Want to play some Cyberpunk?',
      timestamp: '2:30 PM',
      isRead: true
    },
    {
      id: 2,
      senderId: 'me',
      text: 'Sure! Let me finish this quest first',
      timestamp: '2:31 PM',
      isRead: true
    },
    {
      id: 3,
      senderId: 1,
      text: 'No problem, take your time',
      timestamp: '2:32 PM',
      isRead: false
    }
  ]);

  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add message handling logic here
    setNewMessage('');
  };

  return (
    <div className="messages-container">
      <div className="messages-sidebar">
        <div className="search-container">
          <div className="search-input">
            <FaSearch />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="contacts-list">
          {contacts.map(contact => (
            <div
              key={contact.id}
              className={`contact-item ${selectedContact?.id === contact.id ? 'active' : ''}`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="contact-avatar">
                <img src={contact.avatar} alt={contact.name} />
                <span className={`status-indicator ${contact.status}`}></span>
              </div>
              <div className="contact-info">
                <div className="contact-header">
                  <h3>{contact.name}</h3>
                  <span className="timestamp">{contact.timestamp}</span>
                </div>
                <div className="contact-preview">
                  <p>{contact.lastMessage}</p>
                  {contact.unread > 0 && (
                    <span className="unread-badge">{contact.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="messages-content">
        {selectedContact ? (
          <>
            <div className="chat-header">
              <div className="chat-contact">
                <img src={selectedContact.avatar} alt={selectedContact.name} />
                <div className="chat-contact-info">
                  <h2>{selectedContact.name}</h2>
                  <span className={`status ${selectedContact.status}`}>
                    {selectedContact.status}
                  </span>
                </div>
              </div>
              <button className="options-button">
                <FaEllipsisV />
              </button>
            </div>

            <div className="chat-messages">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`message ${message.senderId === 'me' ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <form className="chat-input" onSubmit={handleSendMessage}>
              <button type="button" className="attach-button">
                <FaPaperclip />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="button" className="emoji-button">
                <FaSmile />
              </button>
              <button type="submit" className="send-button">
                <FaPaperPlane />
              </button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <h2>Select a conversation to start messaging</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
