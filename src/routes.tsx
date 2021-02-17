import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import AuthPage from './pages/AuthPage'
import MessagesPage from './pages/MessagesPage'

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/messages' exact component={MessagesPage} />
        <Route render={() => <Redirect to={{ pathname: '/messages' }} />} />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path='/login' exact component={AuthPage} />
        <Route render={() => <Redirect to={{ pathname: '/login' }} />} />
      </Switch>
    )
  }
}
