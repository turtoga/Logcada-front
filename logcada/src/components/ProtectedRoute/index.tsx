import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import type { DecodedToken } from '../../Context/AuthContext';


interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.role && allowedRoles.includes(decoded.role)) {
      return <Outlet />;
    } else {
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
