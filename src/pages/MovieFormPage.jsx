import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Heading, Input, Textarea, Button, Stack, FormControl, FormLabel, Image, Text, Flex, Grid } from '@chakra-ui/react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { MoviesContext } from '../data/MoviesContext';

const genres = [
  { label: 'Боевик', color: '#EA580B' },
  { label: 'Триллер', color: '#17A34A' },
  { label: 'Комедия', color: '#2463EB' },
  { label: 'Драма', color: '#18181B' },
];

const EmptyCircle = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11.5" stroke={color} strokeWidth="1" fill="white" />
  </svg>
);

const FilledCircle = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill={color} />
    <path d="M18 9.71777L10.7999 17C10.7999 17.0011 6 12.1457 6 12.1457L7.69814 10.429C7.69814 10.429 9.41931 12.1715 10.7999 13.567L16.3029 8L18 9.71777Z" fill="white"/>
  </svg>
);

const MovieFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { movies, addMovie, editMovie } = useContext(MoviesContext);
  const movie = isEdit ? movies.find(m => m.id === Number(id)) : null;

  const [form, setForm] = useState({
    title: '',
    genre: '',
    duration: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (movie) {
      setForm({
        title: movie.title,
        genre: movie.genre,
        duration: movie.duration,
        description: movie.description,
        image: movie.image,
      });
    }
  }, [movie]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleGenreChange = value => {
    setForm(f => ({ ...f, genre: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setForm(f => ({ ...f, image: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isEdit) {
      editMovie(movie.id, form);
    } else {
      addMovie(form);
    }
    navigate('/');
  };

  return (
    <Box minH="100vh" bg="#FFFFFF">
      <Header />
      <Box maxW="1200px" w="100%" mx="auto" h="87vh" px={6} py={6}>
        <Heading as="h1" fontSize="32px" fontWeight="bold" pb={6}>
          {isEdit ? 'Редактировать фильм' : 'Добавить фильм'}
        </Heading>
        <Box maxW="770px" w="100%" maxH="731px" h="100%" mx="auto" mt={10}>
          <Box
            id="form-box"
            h="100%"
            bg="#FFFFFF"
            borderRadius="16px"
            border="1px solid #EEEEEE"
            boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25)"
            px={16}
            py={12}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={12}>
                <Grid templateColumns="140px 370px" alignItems="center" columnGap={16}>
                  <Text fontWeight="normal" fontSize="16px">Название фильма</Text>
                  <Input name="title" value={form.title} onChange={handleChange} fontSize="16px" h="42px" w="370px" borderRadius="8px" borderColor="#00000050" _focus={{ borderColor: '#4A61DD' }} />
                </Grid>
                <Grid templateColumns="140px 370px" alignItems="center" columnGap={16}>
                  <Text fontWeight="normal" fontSize="16px">Жанр</Text>
                  <Stack direction="row" spacing={6}>
                    {genres.map(({ label, color }) => (
                      <Box
                        key={label}
                        as="button"
                        type="button"
                        display="flex"
                        alignItems="center"
                        gap={2}
                        bg="none"
                        border="none"
                        cursor="pointer"
                        onClick={() => handleGenreChange(label)}
                      >
                        <Box w="22px" h="22px" display="flex" alignItems="center" justifyContent="center">
                          {form.genre === label ? (
                            <FilledCircle color={color} />
                          ) : (
                            <EmptyCircle color={color} />
                          )}
                        </Box>
                        <Text color="black" fontWeight="normal" fontSize="16px">{label}</Text>
                      </Box>
                    ))}
                  </Stack>
                </Grid>
                <Grid templateColumns="140px 370px" alignItems="center" columnGap={16}>
                  <Text fontWeight="normal" fontSize="16px">Длительность</Text>
                  <Flex align="center" gap={2}>
                    <Input name="duration" type="number" value={form.duration} onChange={handleChange} min={1} max={500} fontSize="16px" h="42px" borderRadius="8px" borderColor="#00000050" _focus={{ borderColor: '#4A61DD' }} w="84px" />
                    <Text fontSize="16px" color="#18181B">мин</Text>
                  </Flex>
                </Grid>
                <Grid templateColumns="140px 370px" alignItems="flex-start" columnGap={16}>
                  <Text fontWeight="normal" fontSize="16px" pt={2}>Описание</Text>
                  <Textarea name="description" value={form.description} onChange={handleChange} rows={4} fontSize="16px" borderRadius="8px" borderColor="#00000050" _focus={{ borderColor: '#4A61DD' }} h="184px" w="370px" />
                </Grid>
                <Grid templateColumns="140px 370px" alignItems="center" columnGap={16}>
                  <Text fontWeight="normal" fontSize="16px">Загрузить фото</Text>
                  <Box>
                    <label htmlFor="file-upload">
                      <Box as="span" display="inline-block" bg="#DEDEDE" color="#18181B" borderRadius="6px" px={4} py={2} fontSize="16px" fontWeight="normal" cursor="pointer" _hover={{ bg: '#E5E7EB' }}>
                        Выбрать файл
                      </Box>
                      <Input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} display="none" />
                    </label>
                    {form.image && (
                      <Image src={form.image} alt="preview" boxSize="120px" mt={2} borderRadius="md" />
                    )}
                  </Box>
                </Grid>
                <Grid templateColumns="140px 370px" alignItems="center" columnGap={16}>
                  <Box />
                  <Button type="submit" w="199px" h="48px" bg="#4A61DD70" color="#FFFFFF" fontWeight="bold" fontSize="16px" borderRadius="8px" _hover={{ bg: '#3751A5' }}>
                    {isEdit ? 'Сохранить' : 'Добавить фильм'}
                  </Button>
                </Grid>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default MovieFormPage; 