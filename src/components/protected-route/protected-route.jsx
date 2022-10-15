import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ loggedUser = false, children, ...rest }) {
  const wasLogged = document.cookie.includes('refreshToken') ? true : false;
  if (wasLogged && !loggedUser) {
    return (
        <Redirect to={{ pathname: '/' }} />
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