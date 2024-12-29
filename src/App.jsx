import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react';
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

// Create a dark theme
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'whiteAlpha.900',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        colorScheme: 'blue',
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: 'gray.700',
            borderColor: 'gray.600',
            _hover: { borderColor: 'gray.500' },
            _focus: { borderColor: 'blue.300', boxShadow: 'none' },
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh" bg="gray.900">
          <Navbar />
          <Box as="main" pt="60px">
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
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;