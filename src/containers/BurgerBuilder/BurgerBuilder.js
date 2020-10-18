import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../axios-orders'
import * as burgerActionTypes from '../../store/actions/burgerBuilder.action'

import Burger from 'components/Burger/Burger'
import Modal from 'components/UI/Modal/Modal'
import Spinner from 'components/UI/Spinner/Spinner'
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary'
import BuildControls from 'components/Burger/BuildControls/BuildControls'
import withErrorHandler from 'components/withErrorHandler/withErrorHandler'

class BurgerBuilder extends Component {
   state = {
      purchasing: false,
      error: false,
   }

   componentDidMount = () => {
      this.props.onInitIngredients()
   }

   updatePurchasState(ingredients) {
      const sum = Object.keys(ingredients)
         .map((igKey) => {
            return ingredients[igKey]
         })
         .reduce((sum, el) => {
            return sum + el
         }, 0)
      return sum > 0
   }

   purchaseHandler = () => {
      this.setState({ purchasing: true })
   }

   purchaseCancelHandler = () => {
      this.setState({ purchasing: false })
   }

   purchaseContinueHandler = () => {
      this.props.history.push('/checkout')
   }

   render() {
      const disabledInfo = {
         ...this.props.ings,
      }
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0
      }
      let orderSummary = null
      let burger = this.props.error ? (
         <p>Ingredient can't be loaded</p>
      ) : (
         <Spinner />
      )
      if (this.props.ings) {
         burger = (
            <React.Fragment>
               <Burger ingredients={this.props.ings} />
               <BuildControls
                  ingredientAdded={this.props.onIngredientAdded}
                  ingredientRemoved={this.props.onIngredientRemoved}
                  price={this.props.price}
                  purchasable={this.updatePurchasState(this.props.ings)}
                  disabled={disabledInfo}
                  ordered={this.purchaseHandler}
               />
            </React.Fragment>
         )
         orderSummary = (
            <OrderSummary
               ingredient={this.props.ings}
               totalPrice={this.props.price}
               purchaseCanceled={this.purchaseCancelHandler}
               purchaseContinued={this.purchaseContinueHandler}
            />
         )
      }

      return (
         <React.Fragment>
            <Modal
               show={this.state.purchasing}
               modalClosed={this.purchaseCancelHandler}>
               {orderSummary}
            </Modal>
            {burger}
         </React.Fragment>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      error: state.burgerBuilder.error,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onIngredientAdded: (ingName) =>
         dispatch(burgerActionTypes.addIngredient(ingName)),
      onIngredientRemoved: (ingName) =>
         dispatch(burgerActionTypes.removeIngredient(ingName)),
      onInitIngredients: () => dispatch(burgerActionTypes.initIngredients()),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
