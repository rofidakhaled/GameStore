import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Text,
  Heading,
  Spinner,
  Image,
  Badge,
  VStack,
  HStack,
  Button,
  Input,
  useToast,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react';
import axios from 'axios';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const Store = () => {
  const toast = useToast();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://api.sampleapis.com/switch/games');
        const gamesWithDetails = response.data.map((game) => ({
          ...game,
          price: Math.floor(Math.random() * 40) + 20,
          discount: Math.random() < 0.3 ? Math.floor(Math.random() * 50) + 10 : 0,
          rating: Math.random() * 5,
          image: `https://via.placeholder.com/300x200?text=${encodeURIComponent(game.name)}`,
        }));
        setGames(gamesWithDetails);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
        toast({
          title: 'Error fetching games',
          description: 'Could not fetch game data. Please try again later.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchGames();
  }, [toast]);

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
        <Text>Loading games...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent>
        <Text color="red.500">Failed to load games. Please try again later.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Game Store</Heading>
      <HStack mb={6} justifyContent="space-between">
        <Input
          placeholder="Search your store..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bg="gray.800"
          borderColor="gray.600"
          _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
        />
        <Button colorScheme="blue">Filter: All Games</Button>
      </HStack>
      <Divider mb={6} />
      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing={6}>
        {filteredGames.map((game) => (
          <Box
            key={game.id}
            bg="gray.800"
            p={4}
            borderRadius="lg"
            boxShadow="lg"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.02)' }}
          >
            <HStack spacing={4} alignItems="flex-start">
              <Image
                src={game.image}
                alt={game.name}
                borderRadius="md"
                w="120px"
                h="80px"
                objectFit="cover"
              />
              <VStack align="start" spacing={1} flex="1">
                <Text fontWeight="bold" fontSize="lg">
                  {game.name}
                </Text>
                <HStack>
                  {game.discount > 0 ? (
                    <HStack>
                      <Text color="gray.400" textDecoration="line-through">
                        ${game.price}
                      </Text>
                      <Text color="green.400" fontWeight="bold">
                        ${(game.price * (1 - game.discount / 100)).toFixed(2)}
                      </Text>
                    </HStack>
                  ) : (
                    <Text color="whiteAlpha.900" fontWeight="bold">
                      ${game.price}
                    </Text>
                  )}
                  <Badge colorScheme="yellow">{game.rating.toFixed(1)} ★</Badge>
                </HStack>
                <HStack>
                  <Button size="sm" colorScheme="blue" leftIcon={<FaShoppingCart />}>
                    Add to Cart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="red"
                    leftIcon={<FaHeart />}
                  >
                    Wishlist
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Store;
