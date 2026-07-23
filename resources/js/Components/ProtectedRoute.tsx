import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Navigate, Route } from 'react-router-dom';




interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  roles: string[];
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, roles, ...rest }) => {
  const { props } = usePage<any>();
  const { user } = props;

  return (
    <Route
      {...rest}
      element={
        user && user.roles.includes(user.role.name) ? (
          <Component {...rest} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;