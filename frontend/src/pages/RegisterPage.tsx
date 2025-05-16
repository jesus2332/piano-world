// frontend/src/pages/RegisterPage.tsx
import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link as RouterLink } from 'react-router';

// MUI Imports
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid'; 
import Box from '@mui/material/Box';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const { register, isLoading, error: authError, clearError } = useAuth();
    const navigate = useNavigate();

    const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            clearError();
            setFormError(null);
        };
    }, [clearError]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        clearError();
        setFormError(null);

        if (!name.trim()) {
            setFormError("El nombre es requerido.");
            return;
        }
        if (password !== passwordConfirmation) {
            setFormError("Las contraseñas no coinciden.");
            return;
        }
        if (password.length < 8) {
            setFormError("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        try {
            await register({ name, email, password, password_confirmation: passwordConfirmation });
            navigate('/mi-cuenta');
        } catch (err) {
            console.error('Registration failed on component:', err);
        }
    };

    const hasEmailError = !!(authError && (authError.toLowerCase().includes('email') || authError.toLowerCase().includes('correo')));

    return (
        <Container component="main" maxWidth="xs" className="py-8 md:py-16 flex items-center min-h-[calc(100vh-150px)]">
            <Paper elevation={6} className="p-6 sm:p-8 rounded-xl w-full">
                <Box className="flex flex-col items-center">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
                        <PersonAddAlt1Icon fontSize="large" />
                    </Avatar>
                    <Typography component="h1" variant="h5" className="mb-4 font-semibold">
                        Crear Cuenta
                    </Typography>
                    {(authError || formError) && (
                        <Alert severity="error" className="w-full mb-4">
                            {authError || formError}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleSubmit} noValidate className="w-full space-y-3">
                        <TextField
                            required
                            fullWidth
                            id="name-register"
                            label="Nombre Completo"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isLoading}
                        />
                         <TextField
                            required
                            fullWidth
                            id="email-register"
                            label="Correo Electrónico"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            error={hasEmailError}
                            helperText={hasEmailError ? "Este correo ya está en uso o es inválido." : ""}
                        />
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password-register"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            helperText="Mínimo 8 caracteres."
                        />
                        <TextField
                            required
                            fullWidth
                            name="passwordConfirmation"
                            label="Confirmar Contraseña"
                            type="password"
                            id="password-confirmation-register"
                            autoComplete="new-password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            disabled={isLoading}
                            error={password !== passwordConfirmation && passwordConfirmation !== ""}
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
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Crear Cuenta'}
                        </Button>
                        <Grid container justifyContent="flex-end"> 
                            <Grid> 
                                <Link component={RouterLink} to="/login" variant="body2" className="hover:underline">
                                    ¿Ya tienes una cuenta? Inicia sesión
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}