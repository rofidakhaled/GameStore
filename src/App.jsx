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
      }
    }
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'blue',
      }
    },
    Text: {
      baseStyle: {
        color: 'whiteAlpha.900',
      }
    },
    Heading: {
      baseStyle: {
        color: 'whiteAlpha.900',
      }
    },
    Box: {
      baseStyle: {
        bg: 'gray.800',
      }
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'gray.800',
          color: 'whiteAlpha.900',
        }
      }
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'blue.300',
      },
      variants: {
        outline: {
          field: {
            bg: 'gray.700',
            borderColor: 'gray.600',
            _hover: {
              borderColor: 'gray.500',
            },
            _focus: {
              borderColor: 'blue.300',
              bg: 'gray.700',
            }
          }
        }
      }
    },
    Select: {
      variants: {
        outline: {
          field: {
            bg: 'gray.700',
            borderColor: 'gray.600',
            _hover: {
              borderColor: 'gray.500',
            },
            _focus: {
              borderColor: 'blue.300',
              bg: 'gray.700',
            }
          }
        }
      }
    }
  },
  colors: {
    gray: {
      50: '#f7fafc',
      100: '#edf2f7',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#718096',
      600: '#4a5568',
      700: '#2d3748',
      800: '#1a202c',
      900: '#171923',
    }
  }
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh" bg="gray.900">
          <Navbar />
          <Box as="main" pt="60px" color="whiteAlpha.900">
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
