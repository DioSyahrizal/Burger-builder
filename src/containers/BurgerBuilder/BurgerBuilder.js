import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICE = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7
}

class BurgerBuilder extends Component {
   state = {
      ingredients: null,
      totalPrice: 4,
      purchaseable: false,
      purchasing: false,
      error: false
   }

   componentDidMount = () => {
      axios
         .get('https://burger-builder-2c373.firebaseio.com/ingredients.json')
         .then(response => {
            this.setState({ ingredients: response.data })
         })
         .catch(error => {
            this.setState({ error: true })
         })
   }

   updatePurchaseable(ingredients) {
      const sum = Object.keys(ingredients)
         .map(igKey => {
            return ingredients[igKey]
         })
         .reduce((sum, el) => {
            return sum + el
         }, 0)
      this.setState({ purchaseable: sum > 0 })
   }

   addIngredientHandler = type => {
      const oldCount = this.state.ingredients[type]
      const updatedCounted = oldCount + 1
      const updatedIngredient = { ...this.state.ingredients }
      updatedIngredient[type] = updatedCounted
      const priceAddition = INGREDIENT_PRICE[type]
      const oldPrice = this.state.totalPrice
      const newPrice = oldPrice + priceAddition
      this.setState({
         totalPrice: newPrice,
         ingredients: updatedIngredient
      })
      this.updatePurchaseable(updatedIngredient)
   }

   removeIngredientHandler = type => {
      const oldCount = this.state.ingredients[type]
      if (oldCount <= 0) {
         return
      }
      const updatedCounted = oldCount - 1
      const updatedIngredient = { ...this.state.ingredients }
      updatedIngredient[type] = updatedCounted
      const priceAddition = INGREDIENT_PRICE[type]
      const oldPrice = this.state.totalPrice
      const newPrice = oldPrice - priceAddition
      this.setState({
         totalPrice: newPrice,
         ingredients: updatedIngredient
      })
      this.updatePurchaseable(updatedIngredient)
   }

   purchaseHandler = () => {
      this.setState({ purchasing: true })
   }

   purchaseCancelHandler = () => {
      this.setState({ purchasing: false })
   }

   purchaseContinueHandler = () => {
      // this.setState({loading: true});
      // const order = {
      //     ingredients: this.state.ingredients,
      //     price: this.state.totalPrice,
      //     customer: {
      //         name: 'Dio',
      //         address: {
      //             street: 'Candi Ngrimbi 21',
      //             zipcode: 65142,
      //             country: 'Indonesia'
      //         },
      //         email: 'diosyahrizal@gmail.com'
      //     },
      //     deliveryMethod: 'fastest'
      // }
      // axios.post('/orders.json', order)
      // .then( response => {
      //     this.setState({loading: false, purchasing: false});
      // })
      // .catch( error => {
      //     this.setState({loading: false, purchasing: false});
      // });
      const queryParams = []
      for (let i in this.state.ingredients) {
         queryParams.push(
            encodeURIComponent(i) +
               '=' +
               encodeURIComponent(this.state.ingredients[i])
         )
      }
      queryParams.push('price=' + this.state.totalPrice)
      const queryString = queryParams.join('&')
      this.props.history.push({
         pathname: '/checkout',
         search: '?' + queryString
      })
   }

   render() {
      const disabledInfo = {
         ...this.state.ingredients
      }
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0
      }
      let orderSummary = null
      let burger = this.state.error ? (
         <p>Ingredient can't be loaded</p>
      ) : (
         <Spinner />
      )
      if (this.state.ingredients) {
         burger = (
            <React.Fragment>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls
                  ingredientAdded={this.addIngredientHandler}
                  ingredientRemove={this.removeIngredientHandler}
                  price={this.state.totalPrice}
                  purchaseable={this.state.purchaseable}
                  disabled={disabledInfo}
                  ordered={this.purchaseHandler}
               />
            </React.Fragment>
         )
         orderSummary = (
            <OrderSummary
               ingredient={this.state.ingredients}
               totalPrice={this.state.totalPrice}
               purchaseCanceled={this.purchaseCancelHandler}
               purchaseContinued={this.purchaseContinueHandler}
            />
         )
      }
      if (this.state.loading) {
         orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios)
