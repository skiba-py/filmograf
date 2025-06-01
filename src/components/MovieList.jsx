import { SimpleGrid } from '@chakra-ui/react';
import MovieCard from './MovieCard.jsx';

const MovieList = ({ movies, onToggleFavorite }) => (
  <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={"60px"}>
    {movies.map(movie => (
      <MovieCard
        key={movie.id}
        movie={movie}
        onToggleFavorite={onToggleFavorite}
      />
    ))}
  </SimpleGrid>
);

export default MovieList; 