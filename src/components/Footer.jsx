import { Box, Text } from '@chakra-ui/react';

const Footer = () => (
  <Box as="footer" bg="black" color="white">
    <Box maxW="1200px" w="100%" mx="auto" py={3} h="89px" display="flex" alignItems="center" px={6}>
      <Text fontSize="16px" fontWeight="md">Фильмограф</Text>
    </Box>
  </Box>
);

export default Footer; 