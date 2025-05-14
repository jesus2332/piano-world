// frontend/src/pages/LoginPage.tsx
import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router';

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
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                {authError && <div className="alert alert-danger">{authError}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email-login" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email-login"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password-login" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password-login"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                        {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                    </button>
                </form>
                <p className="mt-3 text-center">
                    ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
}