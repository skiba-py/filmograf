import { Box, Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Все фильмы' },
  { to: '/favorites', label: 'Избранное' },
  { to: '/add', label: 'Добавить фильм' },
];

const Header = () => (
  <Box as="header" py="19px" mb="30px" bg="#FFFFFF" maxW="1200px" w="100%" mx="auto" px={6}>
    <Flex align="center" gap={8} justifyContent="space-between">
      <Flex as="nav" gap={6}>
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              color: isActive ? '#4A61DD' : '#000000',
              fontWeight: 'md',
              fontSize: '16px',
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </Flex>
    </Flex>
  </Box>
);

export default Header; 