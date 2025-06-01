import { HStack, Text, Box } from '@chakra-ui/react';

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
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill={color} />
    <path d="M18 9.71777L10.7999 17C10.7999 17.0011 6 12.1457 6 12.1457L7.69814 10.429C7.69814 10.429 9.41931 12.1715 10.7999 13.567L16.3029 8L18 9.71777Z" fill="white"/>
  </svg>
);

const GenreFilter = ({ selectedGenres, onChange }) => (
  <HStack spacing={8} mt={2} mb={6}>
    {genres.map(({ label, color }) => {
      const checked = selectedGenres.includes(label);
      return (
        <Box
          key={label}
          as="button"
          display="flex"
          alignItems="center"
          gap={2}
          bg="none"
          border="none"
          cursor="pointer"
          onClick={() => onChange(label)}
        >
          <Box w="24px" h="24px" display="flex" alignItems="center" justifyContent="center">
            {checked ? (
              <FilledCircle color={color} />
            ) : (
              <EmptyCircle color={color} />
            )}
          </Box>
          <Text color="black" fontWeight="md" fontSize="16px">{label}</Text>
        </Box>
      );
    })}
  </HStack>
);

export default GenreFilter; 