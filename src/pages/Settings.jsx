import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Select,
  Button,
  useToast,
  Divider,
  SimpleGrid,
  Icon,
  Text,
  HStack,
  useColorMode,
  Badge,
} from '@chakra-ui/react';
import { FaSave, FaDownload, FaBell, FaGlobe, FaPalette, FaGamepad, FaUserShield, FaLanguage } from 'react-icons/fa';

const Settings = () => {
  const toast = useToast();
  
  const [settings, setSettings] = useState({
    notifications: {
      desktop: true,
      email: false,
      updates: true,
      friendRequests: true,
      gameInvites: true
    },
    appearance: {
      fontSize: 'medium',
      compactMode: false,
      animations: true
    },
    language: 'en',
    downloads: {
      path: 'C:/Games',
      autoUpdate: true,
      downloadWhilePlaying: false,
      bandwidthLimit: 'unlimited'
    },
    privacy: {
      profileVisibility: 'public',
      onlineStatus: 'online',
      gameActivity: true,
      friendRequests: 'everyone'
    }
  });

  const handleChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Your preferences have been updated successfully.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const SettingsCard = ({ icon, title, children }) => (
    <Box
      bg="gray.800"
      p={6}
      borderRadius="lg"
      boxShadow="lg"
      borderWidth="1px"
      borderColor="gray.700"
      _hover={{ borderColor: 'gray.600' }}
      transition="all 0.2s"
    >
      <VStack align="stretch" spacing={4}>
        <HStack>
          <Icon as={icon} color="blue.400" boxSize={5} />
          <Heading size="md" color="whiteAlpha.900">{title}</Heading>
        </HStack>
        {children}
      </VStack>
    </Box>
  );

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Heading size="xl" color="whiteAlpha.900">Settings</Heading>
            <Text color="whiteAlpha.600">Customize your gaming experience</Text>
          </VStack>
          <Button
            colorScheme="blue"
            leftIcon={<Icon as={FaSave} />}
            onClick={handleSave}
            size="lg"
          >
            Save Changes
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {/* Notifications */}
          <SettingsCard icon={FaBell} title="Notifications">
            <VStack align="stretch" spacing={4}>
              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel mb="0" color="whiteAlpha.900">Desktop Notifications</FormLabel>
                <Switch
                  isChecked={settings.notifications.desktop}
                  onChange={(e) => handleChange('notifications', 'desktop', e.target.checked)}
                  colorScheme="blue"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel mb="0" color="whiteAlpha.900">Email Notifications</FormLabel>
                <Switch
                  isChecked={settings.notifications.email}
                  onChange={(e) => handleChange('notifications', 'email', e.target.checked)}
                  colorScheme="blue"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel mb="0" color="whiteAlpha.900">Game Updates</FormLabel>
                <Switch
                  isChecked={settings.notifications.updates}
                  onChange={(e) => handleChange('notifications', 'updates', e.target.checked)}
                  colorScheme="blue"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel mb="0" color="whiteAlpha.900">Friend Requests</FormLabel>
                <Switch
                  isChecked={settings.notifications.friendRequests}
                  onChange={(e) => handleChange('notifications', 'friendRequests', e.target.checked)}
                  colorScheme="blue"
                />
              </FormControl>
            </VStack>
          </SettingsCard>

          {/* Downloads */}
          <SettingsCard icon={FaDownload} title="Downloads">
            <VStack align="stretch" spacing={4}>
              <FormControl>
                <FormLabel color="whiteAlpha.900">Download Location</FormLabel>
                <Input
                  value={settings.downloads.path}
                  onChange={(e) => handleChange('downloads', 'path', e.target.value)}
                  bg="gray.700"
                  color="whiteAlpha.900"
                  borderColor="gray.600"
                  _hover={{ borderColor: 'gray.500' }}
                  _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="whiteAlpha.900">Bandwidth Limit</FormLabel>
                <Select
                  value={settings.downloads.bandwidthLimit}
                  onChange={(e) => handleChange('downloads', 'bandwidthLimit', e.target.value)}
                  bg="gray.700"
                  color="whiteAlpha.900"
                  borderColor="gray.600"
                  _hover={{ borderColor: 'gray.500' }}
                  _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
                >
                  <option value="unlimited">Unlimited</option>
                  <option value="10">10 Mbps</option>
                  <option value="20">20 Mbps</option>
                  <option value="50">50 Mbps</option>
                </Select>
              </FormControl>

              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel mb="0" color="whiteAlpha.900">Auto-Update Games</FormLabel>
                <Switch
                  isChecked={settings.downloads.autoUpdate}
                  onChange={(e) => handleChange('downloads', 'autoUpdate', e.target.checked)}
                  colorScheme="blue"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel mb="0" color="whiteAlpha.900">Download While Playing</FormLabel>
                <Switch
                  isChecked={settings.downloads.downloadWhilePlaying}
                  onChange={(e) => handleChange('downloads', 'downloadWhilePlaying', e.target.checked)}
                  colorScheme="blue"
                />
              </FormControl>
            </VStack>
          </SettingsCard>

          {/* Appearance */}
          <SettingsCard icon={FaPalette} title="Appearance">
            <VStack align="stretch" spacing={4}>
              <FormControl>
                <FormLabel color="whiteAlpha.900">Font Size</FormLabel>
                <Select
                  value={settings.appearance.fontSize}
                  onChange={(e) => handleChange('appearance', 'fontSize', e.target.value)}
                  bg="gray.700"
                  color="whiteAlpha.900"
                  borderColor="gray.600"
                  _hover={{ borderColor: 'gray.500' }}
                  _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </Select>
              </FormControl>

              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel mb="0" color="whiteAlpha.900">Compact Mode</FormLabel>
                <Switch
                  isChecked={settings.appearance.compactMode}
                  onChange={(e) => handleChange('appearance', 'compactMode', e.target.checked)}
                  colorScheme="blue"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel mb="0" color="whiteAlpha.900">Enable Animations</FormLabel>
                <Switch
                  isChecked={settings.appearance.animations}
                  onChange={(e) => handleChange('appearance', 'animations', e.target.checked)}
                  colorScheme="blue"
                />
              </FormControl>
            </VStack>
          </SettingsCard>

          {/* Privacy */}
          <SettingsCard icon={FaUserShield} title="Privacy">
            <VStack align="stretch" spacing={4}>
              <FormControl>
                <FormLabel color="whiteAlpha.900">Profile Visibility</FormLabel>
                <Select
                  value={settings.privacy.profileVisibility}
                  onChange={(e) => handleChange('privacy', 'profileVisibility', e.target.value)}
                  bg="gray.700"
                  color="whiteAlpha.900"
                  borderColor="gray.600"
                  _hover={{ borderColor: 'gray.500' }}
                  _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel color="whiteAlpha.900">Online Status</FormLabel>
                <Select
                  value={settings.privacy.onlineStatus}
                  onChange={(e) => handleChange('privacy', 'onlineStatus', e.target.value)}
                  bg="gray.700"
                  color="whiteAlpha.900"
                  borderColor="gray.600"
                  _hover={{ borderColor: 'gray.500' }}
                  _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
                >
                  <option value="online">Online</option>
                  <option value="away">Away</option>
                  <option value="invisible">Invisible</option>
                </Select>
              </FormControl>

              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel mb="0" color="whiteAlpha.900">Show Game Activity</FormLabel>
                <Switch
                  isChecked={settings.privacy.gameActivity}
                  onChange={(e) => handleChange('privacy', 'gameActivity', e.target.checked)}
                  colorScheme="blue"
                />
              </FormControl>
            </VStack>
          </SettingsCard>

          {/* Language */}
          <SettingsCard icon={FaLanguage} title="Language">
            <FormControl>
              <FormLabel color="whiteAlpha.900">Display Language</FormLabel>
              <Select
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                bg="gray.700"
                color="whiteAlpha.900"
                borderColor="gray.600"
                _hover={{ borderColor: 'gray.500' }}
                _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
                <option value="pt">Português</option>
                <option value="ru">Русский</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
                <option value="zh">中文</option>
              </Select>
            </FormControl>
          </SettingsCard>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Settings;
