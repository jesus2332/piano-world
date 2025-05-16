// frontend/src/pages/HomePage.tsx
// ... (imports sin cambios)
import KeyboardComponent from "../components/Keyboard";
import { useCartContext } from '../contexts/CartContext';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import HeroSection from '../components/HeroSection';

function HomePage() {
  const { data: keyboards, addToCart } = useCartContext();

  return (
    <>
      <HeroSection /> 

      <Box component="section" className="py-8 md:py-12" id="collection"> 
        <Typography variant="h3" component="h2" align="center" gutterBottom
          sx={{
            color: 'primary.main',
            fontWeight: '900',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            mb: { xs: 3, md: 5 }
          }}
        >
          Nuestra Colección
        </Typography>
        {keyboards.length === 0 ? (
          <Box className="flex flex-col justify-center items-center py-10 min-h-[40vh]">
            <CircularProgress size={50}/>
            <Typography variant="h6" className="mt-4 text-gray-600">Cargando pianos...</Typography>
          </Box>
        ) : (
          <Grid container spacing={3} className="mt-4">
            {keyboards.map((keyboard) => (
              <Grid key={keyboard.id} size={{xs: 12, sm: 6, md: 4}}>
                <KeyboardComponent
                  keyboard={keyboard}
                  addToCart={addToCart}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}

export default HomePage;