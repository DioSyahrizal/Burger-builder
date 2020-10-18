import React from 'react'
import { useFormik } from 'formik'
import { connect } from 'react-redux'

import Button from 'components/UI/Button/Button'
import Input from 'components/UI/Input/Input'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import withErrorHandler from '../../../components/withErrorHandler/withErrorHandler'
import * as action from '../../../store/actions/index'

const ContactData = (props) => {
   const submitData = (value) => {
      const order = {
         ingredients: props.ings,
         price: props.price,
         customer: {
            ...value,
         },
         deliveryMethod: 'fastest',
      }

      props.onOrderBurger(order)
      props.history.push('/orders')
   }

   const innerForm = () => {
      const formik = useFormik({
         initialValues: {
            name: '',
            email: '',
            street: '',
            postal: '',
         },
         onSubmit: submitData,
      })
      return (
         <form onSubmit={formik.handleSubmit}>
            <Input
               inputtype="input"
               type="text"
               name="name"
               placeholder="Your Name"
               onChange={formik.handleChange}
               value={formik.values.name}
            />
            <Input
               inputtype="input"
               type="email"
               name="email"
               placeholder="Your Mail"
               onChange={formik.handleChange}
               value={formik.values.email}
            />
            <Input
               inputtype="input"
               type="text"
               name="street"
               placeholder="Street"
               onChange={formik.handleChange}
               value={formik.values.street}
            />
            <Input
               inputtype="input"
               type="text"
               name="postal"
               placeholder="Postal Code"
               onChange={formik.handleChange}
               value={formik.values.postal}
            />
            <Button btnType="Success" type="submit">
               ORDER HERE
            </Button>
         </form>
      )
   }

   return (
      <div className={classes.ContactData}>
         <h4> Enter your Contact Data </h4>

         {innerForm()}
      </div>
   )
}

const mapStateToProps = (state) => {
   return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      loading: state.order.loading,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onOrderBurger: (orderData) => dispatch(action.purchaseBurger(orderData)),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(ContactData, axios))
