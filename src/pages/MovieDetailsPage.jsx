import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Heading, Text, Badge, Flex, Image, IconButton, Button } from '@chakra-ui/react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { MoviesContext } from '../data/MoviesContext';

const genreColors = {
  'Боевик': 'orange',
  'Триллер': 'green',
  'Комедия': 'blue',
  'Драма': 'gray',
};

const genreStyles = {
  'Боевик': { bg: '#EA926316', color: '#E26C2D' },
  'Триллер': { bg: '#49B64E16', color: '#49B64E' },
  'Комедия': { bg: '#8775D216', color: '#8775D2' },
  'Драма': { bg: '#958F8F16', color: '#958F8F' },
};

const TimeIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
    <circle cx="9" cy="9" r="8.25" stroke="#18181B" strokeWidth="1.1"/>
    <path d="M9 5.25V9L11.25 11.25" stroke="#18181B" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

const StarSvg = ({ active }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill={active ? '#FFB800' : 'none'} stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies, toggleFavorite, deleteMovie } = useContext(MoviesContext);
  const movie = movies.find(m => m.id === Number(id));

  if (!movie) return <Text>Фильм не найден</Text>;

  const handleDelete = () => {
    deleteMovie(movie.id);
    navigate('/');
  };

  const handleEdit = () => {
    navigate(`/edit/${movie.id}`);
  };

  return (
    <Box bg="#FFFFFF">
      <Header />
      <Box maxW="1200px" w="100%" mx="auto" h="87vh" px={6} py={6}>
        <Flex gap={8}>
          <Image src={movie.image} alt={movie.title} boxSize="480px" objectFit="cover" borderRadius="16px" />
          <Box flex={1} pl={6}>
            <Flex align="center" justify="space-between" mb={5}>
              <Heading as="h1" size="2xl" fontWeight="bold">{movie.title}</Heading>
              <IconButton
                icon={<StarSvg active={movie.isFavorite} />}
                color="yellow.400"
                variant="ghost"
                aria-label="Избранное"
                onClick={() => toggleFavorite(movie.id)}
                p={0}
              />
            </Flex>
            <Flex align="center" gap={50} mb={5}>
              <Box
                as="span"
                px={3}
                py={1}
                fontSize="sm"
                fontWeight="md"
                bg={(genreStyles[movie.genre] || {}).bg}
                color={(genreStyles[movie.genre] || {}).color}
                borderRadius="24px"
              >
                {movie.genre}
              </Box>
              <Flex align="center" gap={1}>
                <TimeIcon />
                <Text fontSize="16px" color="#18181B">{movie.duration} мин.</Text>
              </Flex>
            </Flex>
            <Text mb={6}>{movie.description}</Text>
            <Flex gap={10} justify="flex-end" mt={8}>
              <Button variant="outline" colorScheme="#4A61DD" size="sm" onClick={handleEdit} borderRadius="6px" px={5} borderColor="#DEE2F2">
                <Text fontSize="14px" color="#4A61DD" fontWeight="md">Редактировать</Text>
              </Button>
              <Button variant="outline" colorScheme="#4A61DD" size="sm" onClick={handleDelete} borderRadius="6px" px={5} borderColor="#DEE2F2">
                <Text fontSize="14px" color="#4A61DD" fontWeight="md">Удалить</Text>
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export default MovieDetailsPage; 