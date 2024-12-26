import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Badge,
  HStack,
  Icon,
  Button,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FaCalendar, FaTag, FaChevronRight, FaSearch } from 'react-icons/fa';

const News = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const newsItems = [
    {
      id: 1,
      title: 'Cyberpunk 2077: Phantom Liberty Expansion',
      image: 'https://via.placeholder.com/600x400?text=Cyberpunk+2077',
      date: '2024-01-15',
      category: 'DLC',
      summary: 'CD Projekt Red announces new story expansion coming in Q2 2024.',
      content: 'Experience a thrilling new adventure in Night City with expanded gameplay mechanics and a compelling narrative featuring new characters.',
      tags: ['RPG', 'Action', 'Open World'],
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://via.placeholder.com/40x40?text=SJ',
        role: 'Gaming Editor'
      }
    },
    {
      id: 2,
      title: 'Red Dead Redemption 2 Next-Gen Update',
      image: 'https://via.placeholder.com/600x400?text=RDR2',
      date: '2024-01-10',
      category: 'Update',
      summary: 'Experience the Wild West in stunning 4K with ray tracing support.',
      content: 'The next-gen update brings new life to this masterpiece with ray-traced global illumination and improved textures.',
      tags: ['Action', 'Adventure', 'Western'],
      author: {
        name: 'Mike Chen',
        avatar: 'https://via.placeholder.com/40x40?text=MC',
        role: 'Technical Writer'
      }
    },
    {
      id: 3,
      title: 'Baldur\'s Gate 3 Major Content Update',
      image: 'https://via.placeholder.com/600x400?text=BG3',
      date: '2024-01-05',
      category: 'Patch',
      summary: 'Major balance changes and new content in the latest update.',
      content: 'New side quests, magical items, and combat balance adjustments await players in this massive update.',
      tags: ['RPG', 'Fantasy', 'Turn-based'],
      author: {
        name: 'Alex Wright',
        avatar: 'https://via.placeholder.com/40x40?text=AW',
        role: 'Game Analyst'
      }
    },
    {
      id: 4,
      title: 'The Elder Scrolls VI Development Update',
      image: 'https://via.placeholder.com/600x400?text=TES6',
      date: '2024-01-01',
      category: 'Development',
      summary: 'Bethesda shares insights into the development progress.',
      content: 'Get a sneak peek at the ambitious scope and technological advancements in the next Elder Scrolls installment.',
      tags: ['RPG', 'Fantasy', 'Open World'],
      author: {
        name: 'Emma Davis',
        avatar: 'https://via.placeholder.com/40x40?text=ED',
        role: 'Senior Editor'
      }
    },
    {
      id: 5,
      title: 'Starfield: Journey to the Stars',
      image: 'https://via.placeholder.com/600x400?text=Starfield',
      date: '2024-01-03',
      category: 'Update',
      summary: 'New planets and missions added in latest content update.',
      content: 'Explore new frontiers with previously undiscovered planets and alien species.',
      tags: ['RPG', 'Sci-Fi', 'Space'],
      author: {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40x40?text=JD',
        role: 'Game Developer'
      }
    },
    {
      id: 6,
      title: 'GTA VI: Vice City Returns',
      image: 'https://via.placeholder.com/600x400?text=GTA+VI',
      date: '2023-12-28',
      category: 'Announcement',
      summary: 'First look at the next Grand Theft Auto game.',
      content: 'Return to Vice City in this next-generation open-world experience.',
      tags: ['Action', 'Open World', 'Crime'],
      author: {
        name: 'Jane Smith',
        avatar: 'https://via.placeholder.com/40x40?text=JS',
        role: 'Game Designer'
      }
    }
  ];

  const filteredNews = newsItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Heading size="xl" color="whiteAlpha.900">Latest News</Heading>
        </HStack>

        {/* Search Bar */}
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.500" />
          </InputLeftElement>
          <Input
            placeholder="Search news by title, summary, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="gray.800"
            color="whiteAlpha.900"
            _placeholder={{ color: 'gray.400' }}
            borderColor="gray.600"
            _hover={{ borderColor: 'gray.500' }}
            _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
          />
        </InputGroup>

        {/* Featured News */}
        {!searchQuery && (
          <>
            <Box
              position="relative"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              onClick={() => navigate(`/article/${newsItems[0].id}`)}
              _hover={{ transform: 'translateY(-4px)' }}
              transition="transform 0.2s"
            >
              <Image
                src={newsItems[0].image}
                alt={newsItems[0].title}
                w="100%"
                h="400px"
                objectFit="cover"
              />
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="rgba(0, 0, 0, 0.7)"
                p={6}
              >
                <VStack align="start" spacing={2}>
                  <Badge colorScheme="blue">{newsItems[0].category}</Badge>
                  <Heading size="lg" color="white">
                    {newsItems[0].title}
                  </Heading>
                  <Text color="gray.200">{newsItems[0].summary}</Text>
                  <HStack>
                    <Icon as={FaCalendar} color="blue.400" />
                    <Text color="gray.300">{newsItems[0].date}</Text>
                  </HStack>
                </VStack>
              </Box>
            </Box>
            <Divider borderColor="gray.600" />
          </>
        )}

        {/* News Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredNews.slice(searchQuery ? 0 : 1).map((news) => (
            <Box
              key={news.id}
              bg="gray.800"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              onClick={() => navigate(`/article/${news.id}`)}
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-4px)' }}
            >
              <Image
                src={news.image}
                alt={news.title}
                height="200px"
                width="100%"
                objectFit="cover"
              />
              <VStack p={4} align="stretch" spacing={3}>
                <HStack justify="space-between">
                  <Badge colorScheme="blue">{news.category}</Badge>
                  <HStack>
                    <Icon as={FaCalendar} color="blue.400" />
                    <Text color="whiteAlpha.700" fontSize="sm">
                      {news.date}
                    </Text>
                  </HStack>
                </HStack>

                <VStack align="start" spacing={2}>
                  <Heading size="md" color="whiteAlpha.900">
                    {news.title}
                  </Heading>
                  <Text color="whiteAlpha.800" noOfLines={2}>
                    {news.summary}
                  </Text>
                </VStack>

                <HStack spacing={2}>
                  {news.tags.map((tag, index) => (
                    <Badge key={index} colorScheme="gray">
                      {tag}
                    </Badge>
                  ))}
                </HStack>

                <Button
                  rightIcon={<FaChevronRight />}
                  variant="ghost"
                  colorScheme="blue"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/article/${news.id}`);
                  }}
                >
                  Read More
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default News;
