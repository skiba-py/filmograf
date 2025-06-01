import { Box, Image, Text, Flex, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const genreStyles = {
  'Боевик': { bg: '#EA926316', color: '#E26C2D' },
  'Триллер': { bg: '#49B64E16', color: '#49B64E' },
  'Комедия': { bg: '#8775D216', color: '#8775D2' },
  'Драма': { bg: '#958F8F16', color: '#958F8F' },
};

const TimeIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
    <circle cx="9" cy="9" r="8.25" stroke="black" strokeWidth="1.1"/>
    <path d="M9 5.25V9L11.25 11.25" stroke="black" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

const StarSvg = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? '#FFB800' : 'none'} stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const MovieCard = ({ movie, onToggleFavorite }) => {
  const navigate = useNavigate();
  const genre = genreStyles[movie.genre] || { bg: 'gray.100', color: 'gray.600' };
  return (
    <Box
      maxW="350px"
      w="100%"
      maxH="325px"
      h="100%"
      borderWidth="1px"
      borderRadius="12px"
      overflow="hidden"
      bg="#FFFFFF"
      boxShadow="sm"
      cursor="pointer"
      _hover={{ boxShadow: 'md' }}
      onClick={() => navigate(`/movie/${movie.id}`)}
      position="relative"
    >
      <Image src={movie.image} alt={movie.title} w="100%" h="180px" objectFit="cover" />
      <Box p={4}>
        <Flex align="center" justify="space-between">
          <Text fontWeight="bold" fontSize="22px">{movie.title}</Text>
        </Flex>
        <Flex align="center" justify="space-between" gap={12} mt={2}>
          <Box
            as="span"
            px={3}
            py={1}
            fontSize="sm"
            fontWeight="md"
            bg={genre.bg}
            color={genre.color}
            borderRadius="24px"
          >
            {movie.genre}
          </Box>
          <Flex align="center" gap={2} ml={2}>
            <TimeIcon />
            <Text fontSize="14px" color="black">{movie.duration} мин.</Text>
          </Flex>
          <IconButton
            icon={<StarSvg active={movie.isFavorite} />}
            color="yellow.400"
            variant="ghost"
            aria-label="Избранное"
            onClick={e => { e.stopPropagation(); onToggleFavorite(movie.id); }}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default MovieCard; 