import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import MainPage from './pages/MainPage';
import FavoritesPage from './pages/FavoritesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import MovieFormPage from './pages/MovieFormPage';
import { movies as initialMovies } from './data/movies';
import { MoviesContext } from './data/MoviesContext';

function App() {
  const [movies, setMovies] = useState(initialMovies);

  const addMovie = movie => {
    setMovies(prev => [
      { ...movie, id: Date.now(), isFavorite: false },
      ...prev,
    ]);
  };

  const editMovie = (id, updated) => {
    setMovies(prev => prev.map(m => (m.id === id ? { ...m, ...updated } : m)));
  };

  const deleteMovie = id => {
    setMovies(prev => prev.filter(m => m.id !== id));
  };

  const toggleFavorite = id => {
    setMovies(prev => prev.map(m => (m.id === id ? { ...m, isFavorite: !m.isFavorite } : m)));
  };

  return (
    <MoviesContext.Provider value={{ movies, addMovie, editMovie, deleteMovie, toggleFavorite }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/add" element={<MovieFormPage />} />
          <Route path="/edit/:id" element={<MovieFormPage />} />
        </Routes>
      </BrowserRouter>
    </MoviesContext.Provider>
  );
}

export default App;
