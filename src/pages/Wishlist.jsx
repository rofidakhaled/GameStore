import React, { useState } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Text,
  Heading,
  Button,
  VStack,
  HStack,
  Icon,
  Badge,
} from '@chakra-ui/react';
import { FaShoppingCart, FaTrash, FaBell } from 'react-icons/fa';

const Wishlist = () => {
  const [wishlistGames, setWishlistGames] = useState([
    {
      id: 1,
      name: 'Starfield',
      image: 'https://via.placeholder.com/300x200?text=Starfield',
      price: 59.99,
      discount: 0,
      releaseDate: '2023-09-06',
      notifyOnSale: true
    },
    {
      id: 2,
      name: 'Baldur\'s Gate 3',
      image: 'https://via.placeholder.com/300x200?text=Baldurs+Gate+3',
      price: 59.99,
      discount: 20,
      releaseDate: '2023-08-03',
      notifyOnSale: false
    },
    {
      id: 3,
      name: 'Dragon\'s Dogma 2',
      image: 'https://via.placeholder.com/300x200?text=Dragons+Dogma+2',
      price: 69.99,
      discount: 0,
      releaseDate: '2024-03-22',
      notifyOnSale: true
    }
  ]);

  const removeFromWishlist = (gameId) => {
    setWishlistGames(wishlistGames.filter(game => game.id !== gameId));
  };

  const toggleNotification = (gameId) => {
    setWishlistGames(wishlistGames.map(game => 
      game.id === gameId ? { ...game, notifyOnSale: !game.notifyOnSale } : game
    ));
  };

  return (
    <Container maxW="container.xl" py={8} bg="gray.800">
      <VStack spacing={8} align="stretch">
        <Heading color="whiteAlpha.900">My Wishlist ({wishlistGames.length} games)</Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {wishlistGames.map((game) => (
            <Box
              key={game.id}
              borderRadius="lg"
              overflow="hidden"
              bg="gray.800"
              boxShadow="md"
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-4px)' }}
            >
              <Image
                src={game.image}
                alt={game.name}
                height="200px"
                width="100%"
                objectFit="cover"
              />
              <Box p={4}>
                <VStack align="stretch" spacing={3}>
                  <HStack justify="space-between">
                    <Heading size="md" color="whiteAlpha.900" noOfLines={2}>
                      {game.name}
                    </Heading>
                    <Button
                      variant="outline"
                      colorScheme="red"
                      onClick={() => removeFromWishlist(game.id)}
                    >
                      <Icon as={FaTrash} />
                    </Button>
                  </HStack>

                  <HStack justify="space-between" align="center">
                    <VStack align="start" spacing={1}>
                      <Text color="whiteAlpha.700">Release Date:</Text>
                      <Text color="whiteAlpha.900">{game.releaseDate}</Text>
                    </VStack>
                    <Button
                      variant="outline"
                      colorScheme={game.notifyOnSale ? 'green' : 'gray'}
                      onClick={() => toggleNotification(game.id)}
                    >
                      <Icon as={FaBell} />
                    </Button>
                  </HStack>

                  <HStack justify="space-between" align="center">
                    {game.discount > 0 ? (
                      <HStack spacing={2}>
                        <Text textDecoration="line-through" color="gray.400">
                          ${game.price}
                        </Text>
                        <Text color="green.400" fontWeight="bold">
                          ${(game.price * (1 - game.discount / 100)).toFixed(2)}
                        </Text>
                        <Badge colorScheme="green">-{game.discount}%</Badge>
                      </HStack>
                    ) : (
                      <Text fontWeight="bold" color="whiteAlpha.900">
                        ${game.price}
                      </Text>
                    )}
                  </HStack>

                  <HStack spacing={2}>
                    <Button
                      colorScheme="blue"
                      leftIcon={<Icon as={FaShoppingCart} />}
                      flex={1}
                    >
                      Add to Cart
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Wishlist;
