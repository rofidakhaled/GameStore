import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Image,
  Button,
  SimpleGrid,
  Icon,
  Avatar,
  Badge,
} from '@chakra-ui/react';
import { FaGamepad, FaUsers, FaTrophy, FaClock, FaEdit, FaCamera } from 'react-icons/fa';
import { avatarImages, bannerImages } from '../assets/images';

const Profile = () => {
  const stats = [
    { label: 'Games Owned', value: '42', icon: FaGamepad },
    { label: 'Friends', value: '128', icon: FaUsers },
    { label: 'Achievements', value: '156', icon: FaTrophy },
    { label: 'Hours Played', value: '320', icon: FaClock },
  ];

  const recentAchievements = [
    {
      game: 'Elden Ring',
      name: 'Master of Sorcery',
      description: 'Learn all sorceries',
    },
    {
      game: 'Cyberpunk 2077',
      name: 'Night City Legend',
      description: 'Complete all main missions',
    },
    {
      game: 'Red Dead Redemption 2',
      name: 'True Western',
      description: 'Achieve 100% completion',
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Profile Header */}
        <Box
          position="relative"
          height="200px"
          borderRadius="xl"
          overflow="hidden"
          boxShadow="lg"
        >
          <Image
            src={bannerImages.featured}
            alt="Profile Banner"
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Box
            position="absolute"
            bottom={-16}
            left={8}
            zIndex={2}
            borderRadius="full"
            boxShadow="lg"
            overflow="hidden"
          >
            <Avatar
              size="2xl"
              src={avatarImages.default}
              border="4px solid"
              borderColor="gray.900"
            />
          </Box>
          <Button
            position="absolute"
            bottom={4}
            right={4}
            leftIcon={<FaCamera />}
            colorScheme="blue"
            size="sm"
          >
            Change Banner
          </Button>
        </Box>

        {/* Profile Info */}
        <Box pt={12} pb={4} textAlign="center">
          <VStack spacing={2}>
            <Heading size="xl" color="whiteAlpha.900">John Doe</Heading>
            <Text color="gray.400">@johndoe</Text>
            <Button leftIcon={<FaEdit />} colorScheme="blue" size="xs">
              Edit Profile
            </Button>
          </VStack>
        </Box>

        {/* Stats */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
          {stats.map((stat, index) => (
            <Box
              key={index}
              bg="gray.800"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-4px)' }}
            >
              <VStack>
                <Icon as={stat.icon} boxSize={6} color="blue.400" />
                <Text fontWeight="bold" fontSize="lg" color="whiteAlpha.900">
                  {stat.value}
                </Text>
                <Text color="gray.400">{stat.label}</Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* Recent Achievements */}
        <Box>
          <Heading size="lg" mb={4} color="whiteAlpha.900">Recent Achievements</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {recentAchievements.map((achievement, index) => (
              <Box
                key={index}
                bg="gray.800"
                borderRadius="lg"
                p={4}
                boxShadow="lg"
              >
                <Text color="blue.400" fontWeight="bold">{achievement.game}</Text>
                <Text fontSize="md" color="whiteAlpha.900">
                  {achievement.name}
                </Text>
                <Text color="gray.400" fontSize="sm">
                  {achievement.description}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};

export default Profile;