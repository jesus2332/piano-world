// frontend/src/pages/MyAccountPage.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import apiClient from '../services/api';
import type { Order } from '../types';
import { Link as RouterLink, useNavigate } from 'react-router';
import {
  Container, Typography, Paper, Box, Button, CircularProgress, Alert,
  List, ListItem, ListItemText, Divider, Chip, Grid
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';

// --- INICIO DE LA LÓGICA DE TRADUCCIÓN ---
interface OrderStatusDetails {
  text: string;
  color: 'success' | 'warning' | 'info' | 'error' | 'default'; // Colores de Chip de MUI
}

const getOrderStatusDetails = (status: string): OrderStatusDetails => {
  switch (status.toLowerCase()) { // Convertir a minúsculas para ser más robusto
    case 'pending':
      return { text: 'Pendiente', color: 'warning' };
    case 'processing':
      return { text: 'Procesando', color: 'info' };
    case 'shipped': // Añadido ejemplo
      return { text: 'Enviado', color: 'info' };
    case 'completed':
      return { text: 'Completado', color: 'success' };
    case 'cancelled': // Nombre corregido de 'canceled' a 'cancelled' si es así en tu backend
      return { text: 'Cancelado', color: 'error' };
    case 'refunded': // Añadido ejemplo
      return { text: 'Reembolsado', color: 'default' };
    default:
      // Para cualquier otro estado no reconocido, mostrarlo tal cual y un color por defecto
      return { text: status.charAt(0).toUpperCase() + status.slice(1), color: 'default' };
  }
};
// --- FIN DE LA LÓGICA DE TRADUCCIÓN ---

export default function MyAccountPage() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setOrdersLoading(true);
      apiClient.get<Order[]>('/orders')
        .then(response => {
          setOrders(response.data);
          setError(null);
        })
        .catch(err => {
          console.error('Error fetching orders:', err);
          setError('No se pudieron cargar los pedidos. Inténtalo de nuevo más tarde.');
          if (err.response?.status === 401) {
            logout().then(() => navigate('/login'));
          }
        })
        .finally(() => setOrdersLoading(false));
    }
  }, [user, logout, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (authLoading) {
    return (
      <Box className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress />
        <Typography variant="h6" className="ml-4">Cargando datos de usuario...</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box className="text-center py-10">
        <Typography variant="h6">Por favor, <RouterLink to="/login" className="text-blue-600 hover:underline">inicia sesión</RouterLink> para ver tu cuenta.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1" className="font-bold">Mi Cuenta</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout} startIcon={<LogoutIcon />}>
          Cerrar Sesión
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{xs: 12, md: 4}}>
          <Paper elevation={3} className="p-6 rounded-lg h-full">
            <Box className="flex items-center mb-4">
              <AccountBoxIcon color="primary" className="text-3xl mr-3"/>
              <Typography variant="h5" component="h2">Información</Typography>
            </Box>
            <Typography><strong>Nombre:</strong> {user.name}</Typography>
            <Typography><strong>Email:</strong> {user.email}</Typography>
          </Paper>
        </Grid>

        <Grid size={{xs: 12, md: 8}}>
          <Paper elevation={3} className="p-6 rounded-lg h-full">
            <Box className="flex items-center mb-4">
              <ReceiptLongIcon color="primary" className="text-3xl mr-3"/>
              <Typography variant="h5" component="h2">Mis Pedidos</Typography>
            </Box>
            {ordersLoading && (
              <Box className="flex justify-center py-6"><CircularProgress /></Box>
            )}
            {error && <Alert severity="error" className="mb-4">{error}</Alert>}
            {!ordersLoading && !error && orders.length === 0 && (
              <Box className="text-center py-6">
                <ShoppingBagIcon className="text-6xl text-gray-400 mb-2" />
                <Typography>No tienes pedidos realizados aún.</Typography>
                <Button component={RouterLink} to="/" variant="contained" color="primary" className="mt-4">
                  Explorar colección
                </Button>
              </Box>
            )}
            {!ordersLoading && !error && orders.length > 0 && (
              <List>
                {orders.map((order, index) => {
                  const statusDetails = getOrderStatusDetails(order.status);
                  return (
                    <div key={order.id}>
                      <ListItem alignItems="flex-start" className="flex-wrap">
                        <ListItemText
                          primary={
                            <Box className="flex justify-between items-center w-full mb-1">
                              <Typography variant="h6">Pedido #{order.id}</Typography>
                              <Chip
                                label={statusDetails.text}
                                color={statusDetails.color}
                                size="small"
                              />
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                Fecha: {new Date(order.created_at).toLocaleDateString('es-ES')}
                              </Typography>
                              <br />
                              <Typography component="span" variant="body2" color="text.primary" className="font-semibold">
                                Total: ${parseFloat(order.total_amount).toFixed(2)}
                              </Typography>
                              <Typography variant="subtitle2" className="mt-2 mb-1 font-medium">Artículos:</Typography>
                              <List dense disablePadding>
                                {order.pianos.map(pianoItem => (
                                  <ListItem key={pianoItem.id} disableGutters className="pl-4">
                                    <ListItemText
                                      primary={`${pianoItem.name} (x${pianoItem.pivot.quantity})`}
                                      secondary={`$${parseFloat(pianoItem.pivot.price_at_purchase.toString()).toFixed(2)} c/u`}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </>
                          }
                          className="w-full"
                        />
                      </ListItem>
                      {index < orders.length - 1 && <Divider variant="inset" component="li" className="my-2"/>}
                    </div>
                  );
                })}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}