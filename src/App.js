import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Checkout from './containers/Checkout/Checkout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Orders from './containers/Orders/Orders'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/" exact component={BurgerBuilder} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
