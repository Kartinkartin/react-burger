import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ loggedUser = false, children, ...rest }) {
  const wasLogged = document.cookie.includes('refreshToken');
  if (wasLogged && !loggedUser) {
    return (
        <Redirect to='/' />
      )
  }

  return (
    <Route
      {...rest}
      render={() => (
        children
      )
      }
    />
  );
}
