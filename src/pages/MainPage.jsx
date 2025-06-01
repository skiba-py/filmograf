import { useContext, useState } from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import GenreFilter from '../components/GenreFilter.jsx';
import MovieList from '../components/MovieList.jsx';
import { MoviesContext } from '../data/MoviesContext';

const allGenres = ['Боевик', 'Триллер', 'Комедия', 'Драма'];

const MainPage = () => {
  const { movies, toggleFavorite } = useContext(MoviesContext);
  const [selectedGenres, setSelectedGenres] = useState(allGenres);

  const handleGenreChange = genre => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const filteredMovies =
    selectedGenres.length === 0
      ? movies
      : movies.filter(m => selectedGenres.includes(m.genre));

  return (
    <Box id="catalog" bg="#FFFFFF" h="87vh">
      <Header />
        <Box maxW="1200px" w="100%" mx="auto" h="100%" px={6}>
          <Flex justify="space-between" align="center">
          <Heading as="h1" size="xl" mb={6} fontWeight="bold">
            Фильмы
          </Heading>
          <GenreFilter selectedGenres={selectedGenres} onChange={handleGenreChange} />
          </Flex>
          <MovieList
            movies={filteredMovies}
            onToggleFavorite={toggleFavorite}
          />
        </Box>
      <Footer />
    </Box>
  );
};

export default MainPage;