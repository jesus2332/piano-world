// frontend/src/pages/RegisterPage.tsx
import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const { register, isLoading, error: authError, clearError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            clearError();
        };
    }, [clearError]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        clearError();
        if (password !== passwordConfirmation) {
            alert("Las contraseñas no coinciden."); 
            return;
        }
        try {
            await register({ name, email, password, password_confirmation: passwordConfirmation });
            navigate('/mi-cuenta'); 
        } catch (err) {
            console.error('Registration failed on component:', err);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
                <h2 className="text-center mb-4">Crear Cuenta</h2>
                {authError && <div className="alert alert-danger">{authError}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name-register" className="form-label">Nombre Completo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name-register"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email-register" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email-register"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password-register" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password-register"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password-confirmation-register" className="form-label">Confirmar Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password-confirmation-register"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                            minLength={8}
                            disabled={isLoading}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                        {isLoading ? 'Registrando...' : 'Crear Cuenta'}
                    </button>
                </form>
                <p className="mt-3 text-center">
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </p>
            </div>
        </div>
    );
}