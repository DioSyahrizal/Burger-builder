import React, { Component } from 'react'
import axios from '../../axios-orders'
import Order from 'components/Order/Order'
import withErrorHandler from 'components/withErrorHandler/withErrorHandler'

class Orders extends Component {
   state = {
      orders: [],
      loading: true
   }

   componentDidMount = () => {
      axios
         .get('orders.json')
         .then(res => {
            const fetchOrders = []
            for (let key in res.data) {
               fetchOrders.push({
                  ...res.data[key],
                  id: key
               })
            }
            this.setState({ loading: false, orders: fetchOrders })
         })
         .catch(err => {
            this.setState({ loading: false })
         })
   }

   render() {
      return (
         <React.Fragment>
            {this.state.orders.map(order => (
               <Order
                  key={order.id}
                  ingredients={order.ingredients}
                  price={order.price}
               />
            ))}
         </React.Fragment>
      )
   }
}

export default withErrorHandler(Orders, axios)
