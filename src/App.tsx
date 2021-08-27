import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Main, AuthView } from './views'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/main">
          <Main />
        </Route>
        <Route path="/">
          <AuthView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
