import { Component } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box textAlign="center" py={10} px={6}>
          <Heading display="inline-block" as="h2" size="2xl" color="red.500">
            Oops! Something went wrong
          </Heading>
          <Text mt={3} mb={2}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <Button
            colorScheme="red"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
          >
            Try again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
