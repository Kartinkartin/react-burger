import React from 'react';
import { useLocation, Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ loggedUser = false, children, ...rest }) {
  const location = useLocation();
  const wasLogged = document.cookie.includes('refreshToken');
  /* защита роутинга для страниц входа, регистрации, восстановления пароля  */
  if (wasLogged && !loggedUser) {
    return (
        <Redirect to='/' />
      )
  }

  if (!wasLogged && loggedUser) {
    return (
        <Redirect to={{ pathname: '/login', state: { from: location.pathname }}} />
      )
  }

  /* защита роутинга для страниц профиля и истории заказов */
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
