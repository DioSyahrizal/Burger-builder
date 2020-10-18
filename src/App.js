import React, { Component } from 'react'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import Checkout from './containers/Checkout/Checkout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Orders from './containers/Orders/Orders'
import burgerBuilderReducer from './store/reducers/burgerBuilder.reducer'
import orderReducer from './store/reducers/order.reducer'

const rootReducer = combineReducers({
   burgerBuilder: burgerBuilderReducer,
   order: orderReducer,
})

const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(thunk))
)
class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <BrowserRouter>
               <Layout>
                  <Switch>
                     <Route path="/checkout" component={Checkout} />
                     <Route path="/orders" component={Orders} />
                     <Route path="/" exact component={BurgerBuilder} />
                  </Switch>
               </Layout>
            </BrowserRouter>
         </Provider>
      )
   }
}

export default App
