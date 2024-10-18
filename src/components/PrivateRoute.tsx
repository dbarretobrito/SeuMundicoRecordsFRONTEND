// src/components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem('adminToken');
  
  return token ? children : <Navigate to="/admin/login" />;
};
