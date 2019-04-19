import React from 'react';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredient)
        .map(igKey =>{
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredient[igKey]}
                </li>
            )
        });

    return(
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue on Checkout</p>
        </React.Fragment>
    )
};

export default orderSummary;