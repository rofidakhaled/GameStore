import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Image,
  Text,
  Heading,
  Button,
  Icon,
  Divider,
  useToast,
  SimpleGrid,
  Badge
} from '@chakra-ui/react';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const Cart = () => {
  const toast = useToast();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Starfield',
      image: 'https://via.placeholder.com/200x150?text=Starfield',
      price: 59.99,
      discount: 20,
      quantity: 1
    },
    {
      id: 2,
      name: 'Cyberpunk 2077',
      image: 'https://via.placeholder.com/200x150?text=Cyberpunk+2077',
      price: 49.99,
      discount: 0,
      quantity: 1
    },
    {
      id: 3,
      name: 'Baldur\'s Gate 3',
      image: 'https://via.placeholder.com/200x150?text=Baldurs+Gate+3',
      price: 59.99,
      discount: 10,
      quantity: 1
    }
  ]);

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    toast({
      title: 'Item Removed',
      description: 'The item has been removed from your cart',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleQuantityChange = (itemId, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.price * (1 - item.discount / 100);
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    toast({
      title: 'Proceeding to Checkout',
      description: 'Redirecting to payment page...',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Heading>Shopping Cart ({cartItems.length} items)</Heading>
        </HStack>

        {cartItems.length > 0 ? (
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
            <Box gridColumn="span 2">
              <VStack spacing={4} align="stretch" bg="gray.800" p={6} borderRadius="lg" boxShadow="md">
                {cartItems.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {index > 0 && <Divider />}
                    <HStack spacing={4} py={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        boxSize="100px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <VStack align="start" flex={1} spacing={1}>
                        <Heading size="md" color="whiteAlpha.900">{item.name}</Heading>
                        <HStack>
                          {item.discount > 0 ? (
                            <>
                              <Text textDecoration="line-through" color="gray.400">
                                ${item.price}
                              </Text>
                              <Text color="green.400" fontWeight="bold">
                                ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                              </Text>
                              <Badge colorScheme="green">-{item.discount}%</Badge>
                            </>
                          ) : (
                            <Text fontWeight="bold" color="whiteAlpha.900">${item.price}</Text>
                          )}
                        </HStack>
                      </VStack>
                      <HStack>
                        <Button
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          isDisabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <Text fontWeight="bold">{item.quantity}</Text>
                        <Button
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </Button>
                      </HStack>
                      <Button
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Icon as={FaTrash} />
                      </Button>
                    </HStack>
                  </React.Fragment>
                ))}
              </VStack>
            </Box>

            <Box>
              <VStack
                spacing={4}
                align="stretch"
                bg="gray.800"
                p={6}
                borderRadius="lg"
                boxShadow="md"
                position="sticky"
                top="20px"
              >
                <Heading size="md" color="whiteAlpha.900">Order Summary</Heading>
                <Divider />
                <HStack justify="space-between">
                  <Text color="whiteAlpha.900">Subtotal</Text>
                  <Text fontWeight="bold" color="whiteAlpha.900">${calculateSubtotal().toFixed(2)}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="whiteAlpha.900">Tax</Text>
                  <Text fontWeight="bold" color="whiteAlpha.900">${(calculateSubtotal() * 0.1).toFixed(2)}</Text>
                </HStack>
                <Divider />
                <HStack justify="space-between">
                  <Text fontWeight="bold" color="whiteAlpha.900">Total</Text>
                  <Text fontWeight="bold" fontSize="xl" color="blue.400">
                    ${(calculateSubtotal() * 1.1).toFixed(2)}
                  </Text>
                </HStack>
                <Button
                  colorScheme="blue"
                  size="lg"
                  leftIcon={<Icon as={FaShoppingCart} />}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </VStack>
            </Box>
          </SimpleGrid>
        ) : (
          <VStack py={12} spacing={4}>
            <Text fontSize="xl">Your cart is empty</Text>
            <Button colorScheme="blue" leftIcon={<Icon as={FaShoppingCart} />}>
              Continue Shopping
            </Button>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Cart;
