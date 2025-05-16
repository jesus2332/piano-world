// frontend/src/components/Keyboard.tsx
import type { Keyboard as KeyboardType } from "../types";
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Chip, Box } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

type KeyboardProps = {
  keyboard: KeyboardType,
  addToCart: (keyboard: KeyboardType) => void
}

export default function Keyboard({ keyboard, addToCart }: KeyboardProps) {
  const { name, image, description, price, stock } = keyboard;
  const isOutOfStock = stock === 0;

  return (
    <Card 
      className="flex flex-col h-full m-2 relative"
      sx={{ 
        opacity: isOutOfStock ? 0.75 : 1,
        overflow: 'visible' 
      }}
    >
      {isOutOfStock && (
        <Chip
          label="Fuera de Stock"
          color="error"
          size="medium"
          sx={{
            position: 'absolute',
            top: { xs: 10, sm: 12, md: 16 }, 
            left: { xs: 10, sm: 12, md: 16 },
            zIndex: 10,
            fontWeight: 'bold',
          }}
        />
      )}
      <CardMedia
        component="img"
        sx={{ 
          height: { 
            xs: 250, 
            sm: 350, 
            md: 500  
          },
          objectFit: 'contain', 
          p: { xs: 1, sm: 1, md: 1 }, 
          filter: isOutOfStock ? 'grayscale(70%)' : 'none'
        }}
        image={`/img/${image}.jpg`}
        alt={name}
      />
      <CardContent className="flex-grow flex flex-col">
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div" 
          className="font-bold uppercase"
          sx={{ 
            color: isOutOfStock ? 'text.disabled' : 'primary.main',
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } 
          }}
        >
          {name}
        </Typography>
        <Typography 
          variant="body2" 
          className="mb-2"
          sx={{ 
            color: isOutOfStock ? 'text.disabled' : 'text.secondary',
            display: '-webkit-box',
            '-webkit-line-clamp': '3', 
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: { xs: '3.6em', sm: '3.9em'}, 
            fontSize: { xs: '0.8rem', sm: '0.875rem'} 
          }}
        >
          {description}
        </Typography>
        
        <Box className="mt-auto"> 
          <Typography 
            variant="h5" 
            className="font-black"
            sx={{ 
              color: isOutOfStock ? 'text.disabled' : 'secondary.main',
              fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.75rem' } 
            }}
          >
            ${price}
          </Typography>
          {!isOutOfStock && (
            <Typography 
              variant="caption" 
              className="font-medium"
              sx={{ color: stock < 5 ? 'warning.main' : 'success.main' }}
            >
              {stock <= 0 ? '' : `${stock} en stock`} 
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions className="p-3 md:p-4">
        <Button
          variant="contained"
          color={isOutOfStock ? "inherit" : "secondary"}
          fullWidth
          onClick={() => !isOutOfStock && addToCart(keyboard)}
          disabled={isOutOfStock}
          startIcon={isOutOfStock ? <RemoveShoppingCartIcon /> : <AddShoppingCartIcon />}
          sx={{
            bgcolor: isOutOfStock ? 'grey.400' : undefined,
            '&:hover': {
              bgcolor: isOutOfStock ? 'grey.500' : undefined,
            },
            fontSize: { xs: '0.8rem', sm: '0.875rem', md: '0.9rem' }, 
            py: { xs: 1, sm: 1.2 } 
          }}
        >
          {isOutOfStock ? 'Fuera de Stock' : 'Agregar al Carrito'}
        </Button>
      </CardActions>
    </Card>
  );
}