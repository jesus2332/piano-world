/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link as RouterLink, useNavigate } from 'react-router';
import { useCartContext } from '../contexts/CartContext';

import {
  AppBar, Toolbar, Typography, Button, IconButton, Badge, Box,
  Menu, MenuItem, List, ListItem, ListItemAvatar, Avatar,
  ListItemText, Divider, CircularProgress, Tooltip,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import apiClient from "../services/api";


export default function Header() {
  const {
    cart, removeFromCart, increaseQuantity, decreaseQuantity,
    clearCart, isEmpty, cartTotal, refetchPianos
  } = useCartContext();

  const { user, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);
  const [anchorElUserMenu, setAnchorElUserMenu] = useState<null | HTMLElement>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState<'success' | 'error'>('success');

  const handleOpenCartMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElCart(event.currentTarget);
  const handleCloseCartMenu = () => setAnchorElCart(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUserMenu(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUserMenu(null);

  const handleLogout = async () => {
    handleCloseUserMenu();
    await logout();
    navigate('/');
  };

  const showNotificationDialog = (title: string, message: string, severity: 'success' | 'error' = 'success') => {
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogSeverity(severity);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    if (dialogSeverity === 'success') { 
        navigate('/mi-cuenta');
    }
  };


  const handlePlaceOrder = async () => {
    handleCloseCartMenu();
    if (!user) {
      showNotificationDialog("Inicio de Sesión Requerido", "Por favor, inicia sesión para realizar un pedido.", "error");
      return;
    }
    if (cart.length === 0) {
      showNotificationDialog("Carrito Vacío", "Tu carrito está vacío. Añade algunos pianos primero.", "error");
      return;
    }

    try {
      const orderData = {
        cart: cart.map(item => ({ id: item.id, quantity: item.quantity }))
      };
      const response = await apiClient.post('/orders', orderData);
      
      clearCart();
      await refetchPianos();
      
      showNotificationDialog(
        "¡Pedido Exitoso!",
        `Tu pedido #${response.data.order.id} ha sido realizado correctamente. Serás redirigido a "Mi Cuenta".`,
        "success"
      );

    } catch (error: any) {
      console.error('Error placing order:', error);
      const errorMessage = error.response?.data?.message || "Ocurrió un error al procesar tu pedido. Por favor, inténtalo de nuevo.";
      showNotificationDialog("Error en el Pedido", errorMessage, "error");
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/img/piano_header.jpg")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Toolbar className="container mx-auto xl:px-0 flex justify-between items-center h-full">
        <RouterLink to="/" className="flex items-center">
          <img className="h-10 md:h-12" src="/img/piano_logo.png" alt="Piano World Logo" />
        </RouterLink>

        <Box className="flex items-center space-x-2 md:space-x-4">
          <Button component={RouterLink} to="/" color="inherit" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            Inicio
          </Button>

          {authLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : user ? (
            <>
              <Tooltip title="Menú de Usuario">
                <IconButton onClick={handleOpenUserMenu} color="inherit">
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUserMenu}
                open={Boolean(anchorElUserMenu)}
                onClose={handleCloseUserMenu}
                slotProps={{ paper: { className: "mt-2 shadow-lg" } }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem component={RouterLink} to="/mi-cuenta" onClick={handleCloseUserMenu} className="min-w-[180px]">
                  <AccountCircleIcon className="mr-2" /> Mi Cuenta
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon className="mr-2" /> Cerrar Sesión
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/login" color="inherit" variant="outlined" startIcon={<LoginIcon />}
                sx={{ borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white' } }}>
                Login
              </Button>
              <Button component={RouterLink} to="/register" sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.200' } }} variant="contained" startIcon={<AppRegistrationIcon />}>
                Registro
              </Button>
            </>
          )}

          <Tooltip title="Carrito de compras">
            <IconButton onClick={handleOpenCartMenu} color="inherit">
              <Badge badgeContent={cart.reduce((sum, item) => sum + item.quantity, 0)} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            id="cart-menu"
            anchorEl={anchorElCart}
            open={Boolean(anchorElCart)}
            onClose={handleCloseCartMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
              paper: {
                elevation: 3, 
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  minWidth: 350, 
                  maxWidth: { xs: 'calc(100vw - 32px)', sm: 400, md: 450 }, 
                  width: 'auto', 
                  padding: 2, 
                  '& .MuiAvatar-root': {
                    width: 56,
                    height: 56,
                    mr: 1.5,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
          >
            {isEmpty ? (
              <Typography align="center" className="py-4">El carrito está vacío</Typography>
            ) : (
              <>
                <Typography variant="h6" component="div" sx={{ pb: 1, fontWeight: 'bold' }}>
                  Tu Carrito
                </Typography>
                <Divider sx={{ mb: 1.5 }} />
                <List dense sx={{ maxHeight: 'calc(60vh - 100px)', overflowY: 'auto', pr: 1 }}>
                  {cart.map(keyboard => (
                    <ListItem
                      key={keyboard.id}
                      secondaryAction={
                        <Tooltip title="Eliminar del carrito">
                          <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(keyboard.id)} size="small">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      }
                      className="py-2"
                      disablePadding
                    >
                      <ListItemAvatar>
                        <Avatar variant="rounded" src={`/img/${keyboard.image}.jpg`} alt={keyboard.name} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{keyboard.name}</Typography>}
                        secondary={
                          <Box className="flex items-center mt-1">
                            <Tooltip title="Disminuir cantidad">
                              <IconButton 
                                size="small" 
                                onClick={() => decreaseQuantity(keyboard.id)} 
                                disabled={keyboard.quantity <= 1}
                                sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 0.3}}
                              >
                                <RemoveIcon fontSize="inherit" />
                              </IconButton>
                            </Tooltip>
                            <Typography variant="body2" className="mx-2 font-medium tabular-nums">{keyboard.quantity}</Typography>
                            <Tooltip title="Aumentar cantidad">
                              <IconButton 
                                size="small" 
                                onClick={() => increaseQuantity(keyboard.id)}
                                sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 0.3 }}
                              >
                                <AddIcon fontSize="inherit" />
                              </IconButton>
                            </Tooltip>
                            <Typography variant="body2" className="ml-auto font-semibold">
                              ${(keyboard.price * keyboard.quantity).toFixed(2)}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider className="my-2" />
                <Typography align="right" variant="h6" className="mb-2">
                  Total: <span className="font-bold">${cartTotal.toFixed(2)}</span>
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={clearCart}
                  className="mb-2"
                  startIcon={<DeleteIcon />}
                >
                  Vaciar Carrito
                </Button>
                {user ? (
                  <Button variant="contained" color="primary" fullWidth onClick={handlePlaceOrder}>
                    Realizar Pedido
                  </Button>
                ) : (
                  <Button variant="contained" color="secondary" fullWidth component={RouterLink} to="/login" onClick={handleCloseCartMenu}>
                    Inicia sesión para pedir
                  </Button>
                )}
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
      </AppBar>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="notification-dialog-title"
        aria-describedby="notification-dialog-description"
      >
        <DialogTitle id="notification-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
          {dialogSeverity === 'success' ? 
            <CheckCircleOutlineIcon color="success" sx={{ mr: 1 }} /> : 
            <ErrorOutlineIcon color="error" sx={{ mr: 1 }} />
          }
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="notification-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}