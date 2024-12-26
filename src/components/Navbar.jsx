import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Button,
  HStack,
  Icon,
  Container,
  Badge,
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

const Navbar = () => {
  const location = useLocation();
  const bg = useColorModeValue('gray.800', 'gray.900');

  const isActive = (path) => location.pathname === path;

  const links = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Store', path: '/store', icon: FaStore },
    { name: 'Library', path: '/library', icon: FaGamepad },
    { name: 'Profile', path: '/profile', icon: FaUser },
    { name: 'Wishlist', path: '/wishlist', icon: FaHeart },
    { name: 'News', path: '/news', icon: FaNewspaper },
    { name: 'Friends', path: '/friends', icon: FaUsers },
    { name: 'Settings', path: '/settings', icon: FaCog },
  ];

  return (
    <Box
      as="nav"
      position="fixed"
      w="100%"
      zIndex="sticky"
      bg={bg}
      boxShadow="md"
      py={2}
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <HStack spacing={4}>
            <RouterLink to="/">
              <Image
                src="https://via.placeholder.com/40x40?text=GS"
                alt="GameStore"
                boxSize="40px"
                borderRadius="md"
                mr={4}
              />
            </RouterLink>
            <HStack spacing={1}>
              {links.map((link) => (
                <Button
                  key={link.path}
                  as={RouterLink}
                  to={link.path}
                  variant={isActive(link.path) ? 'solid' : 'ghost'}
                  colorScheme={isActive(link.path) ? 'blue' : 'blue'}
                  leftIcon={<Icon as={link.icon} />}
                  size="sm"
                  opacity={isActive(link.path) ? 1 : 0.8}
                  _hover={{ opacity: 1 }}
                >
                  {link.name}
                </Button>
              ))}
            </HStack>
          </HStack>
          
          <Button
            as={RouterLink}
            to="/cart"
            variant={isActive('/cart') ? 'solid' : 'ghost'}
            colorScheme={isActive('/cart') ? 'blue' : 'blue'}
            leftIcon={<Icon as={FaShoppingCart} />}
            size="sm"
            position="relative"
            opacity={isActive('/cart') ? 1 : 0.8}
            _hover={{ opacity: 1 }}
          >
            Cart
            <Badge
              position="absolute"
              top="-1"
              right="-1"
              colorScheme="red"
              borderRadius="full"
            >
              3
            </Badge>
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
