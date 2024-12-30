import React, { useState } from 'react';
import { HStack, Input, Button } from '@chakra-ui/react';

const SearchBar = ({ placeholder, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <HStack mb={6} justifyContent="space-between">
      <Input
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        bg="gray.800"
        borderColor="gray.600"
        _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
      />
      <Button colorScheme="blue" onClick={handleSearch}>
        Search
      </Button>
    </HStack>
  );
};

export default SearchBar;
