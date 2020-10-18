import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {
   return (
      <div className={classes.CheckoutSummary}>
         <h1>We Hope tasted well</h1>
         <div>
            <Burger ingredients={props.ingredients} />
         </div>
         <div style={{ display: 'inline-block' }}>
            <Button btnType="Danger" clicked={props.checkoutCanceled}>
               CANCEL
            </Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>
               CONTINUE
            </Button>
         </div>
      </div>
   )
}

export default checkoutSummary
