import { Box, Container, Stack, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      bg="gray.800"
      color="gray.200"
      py={4}
      mt={8}
      borderTop="1px"
      borderColor="gray.700"
    >
      <Container maxW="container.xl">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify="space-between"
          align="center"
        >
          <Text> 2024 GameStore. All rights reserved</Text>
          <Stack direction="row" spacing={6}>
            <Link href="#">Terms</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Contact</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
