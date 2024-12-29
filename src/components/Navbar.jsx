import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Button,
  HStack,
  Icon,
  Container,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaHome,
  FaStore,
  FaGamepad,
  FaUser,
  FaHeart,
  FaNewspaper,
  FaUsers,
  FaCog,
  FaShoppingCart,
} from 'react-icons/fa';
import logo from '../assets/logo.svg?v=3';

const Navbar = () => {
  const location = useLocation();
  const bg = useColorModeValue('rgba(26, 32, 44, 0.95)', 'rgba(23, 25, 35, 0.95)');
  const iconColor = useColorModeValue('#B7791F', '#ECC94B');
  const activeIconColor = useColorModeValue('#ECC94B', '#F6E05E');

  const isActive = (path) => location.pathname === path;

  const links = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Store', path: '/store', icon: FaStore },
    { name: 'Library', path: '/library', icon: FaGamepad },
    { name: 'News', path: '/news', icon: FaNewspaper },
    { name: 'Friends', path: '/friends', icon: FaUsers },
    { name: 'Wishlist', path: '/wishlist', icon: FaHeart },
  ];

  const profileLinks = [
    { name: 'Profile', path: '/profile', icon: FaUser },
    { name: 'Settings', path: '/settings', icon: FaCog },
  ];

  return (
    <Box
      as="nav"
      position="fixed"
      w="100%"
      zIndex={9999}
      bg={bg}
      backdropFilter="blur(10px)"
      boxShadow="0 2px 10px rgba(0, 0, 0, 0.3)"
      py={4}
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <HStack spacing={12}>
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <Box
                position="relative"
                width="48px"
                height="48px"
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.05)' }}
              >
                <Image
                  src={logo}
                  alt="GameStore"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              </Box>
            </RouterLink>
            <HStack spacing={6}>
              {links.map((link) => (
                <Button
                  key={link.path}
                  as={RouterLink}
                  to={link.path}
                  variant={isActive(link.path) ? 'solid' : 'ghost'}
                  colorScheme="yellow"
                  size="lg"
                  px={8}
                  py={7}
                  opacity={isActive(link.path) ? 1 : 0.8}
                  _hover={{ 
                    opacity: 1,
                    transform: 'translateY(-2px)',
                    bg: isActive(link.path) ? 'yellow.500' : 'whiteAlpha.200',
                    textDecoration: 'none',
                    '& svg': {
                      color: activeIconColor,
                    }
                  }}
                  transition="all 0.2s"
                  style={{ textDecoration: 'none' }}
                >
                  <Icon 
                    as={link.icon} 
                    boxSize={16} 
                    mr={4} 
                    color={isActive(link.path) ? activeIconColor : iconColor}
                    transition="color 0.2s"
                  />
                  {link.name}
                </Button>
              ))}
            </HStack>
          </HStack>
          
          <HStack spacing={4}>
            <Button
              as={RouterLink}
              to="/cart"
              variant={isActive('/cart') ? 'solid' : 'ghost'}
              colorScheme="yellow"
              size="lg"
              px={8}
              py={7}
              position="relative"
              opacity={isActive('/cart') ? 1 : 0.8}
              _hover={{ 
                opacity: 1,
                transform: 'translateY(-2px)',
                bg: isActive('/cart') ? 'yellow.500' : 'whiteAlpha.200',
                textDecoration: 'none',
                '& svg': {
                  color: activeIconColor,
                }
              }}
              transition="all 0.2s"
              style={{ textDecoration: 'none' }}
            >
              <Icon 
                as={FaShoppingCart} 
                boxSize={16} 
                mr={4} 
                color={isActive('/cart') ? activeIconColor : iconColor}
                transition="color 0.2s"
              />
              Cart
              <Box
                position="absolute"
                top="-2"
                right="-2"
                bg="#B7791F"
                color="white"
                width="20px"
                height="20px"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xs"
                fontWeight="bold"
                boxShadow="0 2px 4px rgba(183, 121, 31, 0.4)"
                border="2px solid #ECC94B"
              >
                3
              </Box>
            </Button>

            {profileLinks.map((link) => (
              <Button
                key={link.path}
                as={RouterLink}
                to={link.path}
                variant={isActive(link.path) ? 'solid' : 'ghost'}
                colorScheme="yellow"
                size="lg"
                px={8}
                py={7}
                opacity={isActive(link.path) ? 1 : 0.8}
                _hover={{ 
                  opacity: 1,
                  transform: 'translateY(-2px)',
                  bg: isActive(link.path) ? 'yellow.500' : 'whiteAlpha.200',
                  textDecoration: 'none',
                  '& svg': {
                    color: activeIconColor,
                  }
                }}
                transition="all 0.2s"
                style={{ textDecoration: 'none' }}
              >
                <Icon 
                  as={link.icon} 
                  boxSize={16} 
                  mr={4} 
                  color={isActive(link.path) ? activeIconColor : iconColor}
                  transition="color 0.2s"
                />
                {link.name}
              </Button>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
