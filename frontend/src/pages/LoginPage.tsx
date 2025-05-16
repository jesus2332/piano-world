import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link as RouterLink } from 'react-router';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper'; 

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error: authError, clearError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            clearError();
        };
    }, [clearError]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        clearError();
        try {
            await login({ email, password });
            navigate('/mi-cuenta');
        } catch (err) {
            console.error('Login failed on component:', err);
        }
    };

    return (
        <Container component="main" maxWidth="xs" className="py-8 md:py-16 flex items-center min-h-[calc(100vh-150px)]"> 
            <Paper elevation={6} className="p-6 sm:p-8 rounded-xl w-full"> 
                <Box className="flex flex-col items-center">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
                        <LockOutlinedIcon fontSize="large" />
                    </Avatar>
                    <Typography component="h1" variant="h5" className="mb-4 font-semibold">
                        Iniciar Sesión
                    </Typography>
                    {authError && (
                        <Alert severity="error" className="w-full mb-4">
                            {authError}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleSubmit} noValidate className="w-full space-y-4"> 
                        <TextField
                            required
                            fullWidth
                            id="email-login"
                            label="Correo Electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            error={!!authError && (authError.toLowerCase().includes('email') || authError.toLowerCase().includes('credenciales'))}
                        />
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password-login"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            error={!!authError && (authError.toLowerCase().includes('password') || authError.toLowerCase().includes('credenciales'))}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={isLoading}
                            className="py-3 font-semibold" 
                            sx={{ mt: 2, mb: 1 }} 
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Ingresar'}
                        </Button>
                        <Grid container justifyContent="flex-end"> 
                            <Grid> 
                                <Link component={RouterLink} to="/register" variant="body2" className="text-amber-900 hover:text-amber-700">
                                    {"¿No tienes una cuenta? Regístrate"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}