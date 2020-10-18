import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
   return {
      type: actionTypes.PURCHASE_BURGER_SUCCESS,
      orderId: id,
      orderData,
   }
}

export const purchaseBurgerFail = (error) => {
   return {
      type: actionTypes.PURCHASE_BURGER_FAILED,
      error,
   }
}

export const purchaseBurgerStart = () => {
   return {
      type: actionTypes.PURCHASE_BURGER_START,
   }
}

export const purchaseBurger = (orderData) => {
   return (dispatch) => {
      dispatch(purchaseBurgerStart())
      axios
         .post('/orders.json', orderData)
         .then((response) => {
            dispatch(purchaseBurgerSuccess(response.data, orderData))
         })
         .catch((error) => {
            dispatch(purchaseBurgerFail(error))
         })
   }
}

export const purchaseInit = () => {
   return {
      type: actionTypes.PURCHASE_INIT,
   }
}
