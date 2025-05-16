// frontend/src/App.tsx
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router';
import Header from "./components/Header";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyAccountPage from './pages/MyAccountPage';
import AppLoadingScreen from './components/AppLoadingScreen'; 
import { useAuth } from './hooks/useAuth';
import { Box, Container, Typography, CircularProgress } from '@mui/material';

function MainLayout() {
  return (
    <Box className="flex flex-col min-h-screen">
      <Header />
      <Container component="main" maxWidth="xl" className="flex-grow py-8">
        <Outlet />
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.customDark.main,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body1" color="white" align="center">
            Pianoworld - Todos los derechos Reservados
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

function RouteAuthLoading({ message }: { message: string }) {
  return (
    <Box className="flex flex-col justify-center items-center h-[70vh]">
      <CircularProgress />
      <Typography variant="h6" className="mt-4 text-gray-700">{message}</Typography>
    </Box>
  );
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <RouteAuthLoading message="Verificando acceso..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function GuestRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <RouteAuthLoading message="Cargando..." />;
  }

  if (user) {
    return <Navigate to="/mi-cuenta" replace />;
  }

  return children;
}


function App() {
  const { isLoading: authIsLoading } = useAuth();

  if (authIsLoading) {
      return <AppLoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
          <Route
            path="/mi-cuenta"
            element={
              <ProtectedRoute>
                <MyAccountPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;