import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import * as actions from '../../store/actions'

class Checkout extends Component {
   componentWillMount = () => {
      this.props.onInitPurchase()
   }

   checkoutCancelledHandler = () => {
      this.props.history.goBack()
   }

   checkoutContinuedHandler = () => {
      this.props.history.replace('/checkout/contact-data')
   }

   render() {
      let summary = <Redirect to="/" />
      if (this.props.ings) {
         const purchasedRedirect = this.props.purchased ? (
            <Redirect to="/" />
         ) : null
         summary = (
            <>
               {purchasedRedirect}
               <CheckoutSummary
                  ingredients={this.props.ings}
                  checkoutCanceled={this.checkoutCancelledHandler}
                  checkoutContinued={this.checkoutContinuedHandler}
               />
               <Route
                  path={this.props.match.path + '/contact-data'}
                  component={ContactData}
               />
            </>
         )
      }
      return summary
   }
}

const mapStateToProps = (state) => {
   return {
      ings: state.burgerBuilder.ingredients,
      purchased: state.order.purchased,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onInitPurchase: () => dispatch(actions.purchaseInit()),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
