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
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Icon,
  Divider,
  useColorModeValue,
  Avatar,
  AvatarBadge,
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
      date: '2 days ago',
      image: bannerImages.featured,
    },
    {
      game: 'Cyberpunk 2077',
      name: 'Night City Legend',
      description: 'Complete all main missions',
      date: '1 week ago',
      image: bannerImages.new,
    },
    {
      game: 'Red Dead Redemption 2',
      name: 'True Western',
      description: 'Achieve 100% completion',
      date: '2 weeks ago',
      image: bannerImages.sale,
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
          >
            <Avatar
              size="2xl"
              src={avatarImages.default}
              border="4px solid"
              borderColor="gray.800"
              bg="gray.800"
            >
              <AvatarBadge
                boxSize="1.25em"
                bg="green.500"
                borderColor="gray.800"
              />
            </Avatar>
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
        <Box pt={20} pb={4}>
          <HStack justify="space-between">
            <VStack align="start" spacing={1}>
              <Heading size="xl" color="whiteAlpha.900">John Doe</Heading>
              <Text color="gray.400">@johndoe</Text>
            </VStack>
            <Button leftIcon={<FaEdit />} colorScheme="blue">
              Edit Profile
            </Button>
          </HStack>
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
                <Stat textAlign="center">
                  <StatLabel color="gray.400">{stat.label}</StatLabel>
                  <StatNumber color="whiteAlpha.900" fontSize="2xl">{stat.value}</StatNumber>
                </Stat>
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
                overflow="hidden"
                boxShadow="md"
                transition="transform 0.2s"
                _hover={{ transform: 'translateY(-4px)' }}
              >
                <Image
                  src={achievement.image}
                  alt={achievement.game}
                  h="120px"
                  w="100%"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Badge colorScheme="blue" mb={2}>{achievement.game}</Badge>
                  <Heading size="md" color="whiteAlpha.900" mb={2}>{achievement.name}</Heading>
                  <Text color="gray.400" fontSize="sm" mb={2}>{achievement.description}</Text>
                  <Text color="blue.400" fontSize="sm">{achievement.date}</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};

export default Profile;
