import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({
    redirectPath = '/login',
    children,
  }) => {
    let { user } = useContext(AuthContext)
    console.log("Private route")
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  };

export default PrivateRoute