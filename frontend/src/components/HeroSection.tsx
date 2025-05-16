// frontend/src/components/HeroSection.tsx
import { Box, Button, Container, Typography, Grid, Paper, styled, alpha } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import theme from '../theme';

const VideoContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  paddingBottom: '177.77%', 
  height: 0,
  maxHeight: '600px',
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: `0px 12px 35px -8px ${alpha(theme.palette.primary.main, 0.25)}`,
  backgroundColor: theme.palette.grey[900],
  overflow: 'hidden',
  margin: '0 auto',

  [theme.breakpoints.down('md')]: {
    maxHeight: '50vh', 
    // paddingBottom: '177.77%', 
  }
}));

const VideoElement = styled('video')({ 
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});


export default function HeroSection() {
  const videoSrc = "/img/hero_piano_vertical.mp4"; 

  const handleScrollToCollection = () => {
    const collectionSection = document.getElementById('collection');
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 }, 
        overflow: 'hidden',
        backgroundColor: (theme) => theme.palette.background.paper,
        position: 'relative', 
      }}
    >
      <Container maxWidth="lg">
       
        <Box
          sx={{
            display: { xs: 'block', md: 'none' }, 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%', 
            maxHeight: '70vh', 
            zIndex: 0, 
            '& video': {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.40,
            }
          }}
        >
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            key={`${videoSrc}-mobile`}
          />
        </Box>

        <Grid
          container
          spacing={{ xs: 0, md: 8 }} 
          alignItems="center"
          justifyContent="center"
          sx={{ position: 'relative', zIndex: 1 }} 
        >
          
          <Grid
            size={{xs: 12, md: 6}}
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              py: { xs: 4, md: 0 }, 
              
            }}
          >
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start'} }}>
              <MusicNoteIcon color="secondary" sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, mr: 1 }} />
              <Typography
                variant="overline"
                color="secondary.main"
                sx={{ fontWeight: 'bold', letterSpacing: '0.5px', fontSize: '0.85rem' }}
              >
                Piano World
              </Typography>
            </Box>

            <Typography
              component="h1"
              variant="h2"
              sx={(theme) => ({
                color: {xs: theme.palette.primary.main, md: 'primary.main'}, 
                fontWeight: 900,
                letterSpacing: '-1px',
                lineHeight: 1.15,
                fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.8rem', lg: '4.2rem' },
                mb: 2, 
              })}
            >
              Descubre el Piano
              <br />
              <Box component="span" sx={{ color: 'secondary.main' }}>
                de Tus Sueños
              </Box>
            </Typography>

            <Typography
              variant="h6"
              component="p"
              sx={{
                color: {xs: alpha(theme.palette.text.primary, 0.9), md: 'text.secondary'}, 
                mb: 3, 
                fontSize: { xs: '0.9rem', md: '1.1rem' },
                lineHeight: 1.6,
                maxWidth: {xs: '90%', sm: '80%', md: '500px'}, 
                mx: 'auto', 
              }}
            >
              En Piano World, te ofrecemos una cuidada selección de los mejores pianos y teclados. Calidad, inspiración y el sonido que transformará tu música.
            </Typography>

            <Button
              onClick={handleScrollToCollection} 
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                py: 1.5,
                px: 4,
                ml: 1.5,

                fontSize: { xs: '0.9rem', md: '1rem' },
                borderRadius: '50px',
                textTransform: 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: (theme) => `0 12px 25px -10px ${alpha(theme.palette.secondary.main, 0.6)}`,
                }
              }}
            >
              Ver Colección
            </Button>
          </Grid>

          <Grid size={{xs: 12, md: 6}} sx={{ display: { xs: 'none', md: 'block' } }}>
            <VideoContainer elevation={10}>
              <VideoElement
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                key={`${videoSrc}-desktop`}
              />
            </VideoContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}