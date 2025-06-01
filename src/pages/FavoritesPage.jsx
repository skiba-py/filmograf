import { useContext } from 'react';
import { Box, Container, Heading, Flex, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { MoviesContext } from '../data/MoviesContext';

const TimeIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
    <circle cx="9" cy="9" r="8.25" stroke="#18181B" strokeWidth="1.1"/>
    <path d="M9 5.25V9L11.25 11.25" stroke="#18181B" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

const FavoritesPage = () => {
  const { movies, toggleFavorite } = useContext(MoviesContext);
  const favoriteMovies = movies.filter(m => m.isFavorite);

  return (
    <Box bg="#FFFFFF">
      <Header />
      <Box display="flex" justifyContent="center" alignItems="flex-start" minH="87vh">
        <Box bg="#fff" borderRadius="0" maxW="1200px" w="100%" mx="auto" px={6} py={2} boxShadow="none" h="100%">
          <Heading as="h1" fontSize="40px" fontWeight="bold" mb={8} mt={2}>
            Избранное
          </Heading>
          {favoriteMovies.length === 0 ? (
            <Text color="gray.500">Нет избранных фильмов.</Text>
          ) : (
            <Box as="ul" mt={2} maxW="800px">
              {favoriteMovies.map((movie, idx) => (
                <Box key={movie.id}>
                  <Flex align="center" py={5} borderBottom={idx !== favoriteMovies.length - 1 ? '1px solid #E5E5E5' : 'none'}>
                    <Link to={`/movie/${movie.id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                      <Image src={movie.image} alt={movie.title} boxSize="92px" borderRadius="full" mr={6} objectFit="cover" _hover={{ boxShadow: 'md' }} />
                    </Link>
                    <Box flex={1}>
                      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                        <Text fontWeight="bold" fontSize="20px" mb={7} color="#18181B" _hover={{ textDecoration: 'underline' }}>
                          {movie.title}
                        </Text>
                      </Link>
                      <Flex align="center" gap={2}>
                        <TimeIcon />
                        <Text fontSize="16px" color="#18181B">{movie.duration} мин.</Text>
                      </Flex>
                    </Box>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#858383',
                        fontWeight: 400,
                        fontSize: '14px',
                        cursor: 'pointer',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        transition: 'background 0.2s',
                        marginLeft: 'auto',
                      }}
                      onClick={() => toggleFavorite(movie.id)}
                    >
                      Удалить
                    </button>
                  </Flex>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default FavoritesPage; 