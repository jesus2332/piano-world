// frontend/src/pages/MyAccountPage.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import apiClient from '../services/api';
import type { Order } from '../types';
import { Link } from 'react-router';

export default function MyAccountPage() {
    const { user, isLoading: authLoading, logout } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [ordersLoading, setOrdersLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
                })
                .finally(() => setOrdersLoading(false));
        }
    }, [user]);

    if (authLoading) return <p className="text-center py-5">Cargando datos de usuario...</p>;
    // Esta comprobación ya la hace ProtectedRoute, pero es bueno tenerla por si acaso
    if (!user) return <p className="text-center py-5">Por favor, <Link to="/login">inicia sesión</Link> para ver tu cuenta.</p>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Mi Cuenta</h2>
                <button onClick={logout} className="btn btn-outline-danger">Cerrar Sesión</button>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Información del Usuario</h5>
                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Mis Pedidos</h5>
                    {ordersLoading && <p>Cargando pedidos...</p>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {!ordersLoading && !error && orders.length === 0 && (
                        <p>No tienes pedidos realizados aún. <Link to="/">¡Explora nuestra colección!</Link></p>
                    )}
                    {!ordersLoading && !error && orders.length > 0 && (
                        <div className="list-group">
                            {orders.map(order => (
                                <div key={order.id} className="list-group-item mb-3">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h6 className="mb-1">Pedido #{order.id}</h6>
                                        <small>Fecha: {new Date(order.created_at).toLocaleDateString()}</small>
                                    </div>
                                    <p className="mb-1"><strong>Total:</strong> ${parseFloat(order.total_amount).toFixed(2)}</p>
                                    <p className="mb-1"><strong>Estado:</strong> <span className={`badge bg-${order.status === 'completed' ? 'success' : order.status === 'pending' ? 'warning' : 'secondary'}`}>{order.status}</span></p>
                                    <small><strong>Artículos:</strong></small>
                                    <ul className="list-unstyled ms-3">
                                        {order.pianos.map(pianoItem => ( 
                                            <li key={pianoItem.id}>
                                                {pianoItem.name} (x{pianoItem.pivot.quantity}) - ${parseFloat(pianoItem.pivot.price_at_purchase.toString()).toFixed(2)} c/u
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}