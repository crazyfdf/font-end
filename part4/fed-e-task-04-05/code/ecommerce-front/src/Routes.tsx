import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './components/core/Home'
import { Shop } from './components/core/Shop'
import Singin from './components/core/SignIn'
import Singup from './components/core/SignUp'

export const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/shop" component={Shop}/>
        <Route path="/singin" component={Singin}/>
        <Route path="/singup" component={Singup}/>
      </Switch>
    </HashRouter>
  )
}
