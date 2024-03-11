import { Route, Navigate } from 'react-router-dom';
import { useVparmitraController } from '@/context';

export function ProtectedRoute({ element, ...rest }) { 
  const [controller] = useVparmitraController(); 
  const { userSession } = controller; 
  if (!userSession) {
    return <Navigate to="/" />;
  }
  return <>{element}</>;
}