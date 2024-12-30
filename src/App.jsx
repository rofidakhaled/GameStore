import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Store from './pages/Store';
import Library from './pages/Library';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import News from './pages/News';
import Friends from './pages/Friends';
import Settings from './pages/Settings';
import GameDetails from './pages/GameDetails';
import Cart from './pages/Cart';
import Message from './pages/Message';
import Article from './pages/Article';
import FriendProfile from './pages/FriendProfile';
import './styles/global.css';
import './styles/variables.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/library" element={<Library />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/news" element={<News />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/game/:id" element={<GameDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/message" element={<Message />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/friend/:id" element={<FriendProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
