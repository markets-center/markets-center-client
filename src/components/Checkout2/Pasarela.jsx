import React from 'react';
import axios from 'axios';
import {CardElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import {useAuth} from '../../context/AuthContext'
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51KrNS9BcSGVJjPzhJcb9v599F0HLdJl9aAF87RBVZY1gIwHyC1zegNKiyvDXTjuAdH3hyn7eSsCE82Vw3blNIfx400EZ4eeSGc')

const CheckoutForm = () => {
    const {currentUser} = useAuth()
    const token= currentUser.auth.currentUser.accessToken
    const stripe = useStripe()
    const element = useElements()
    
    const handleSubmit = async (event) => {
        event.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: element.getElement(CardElement)
        })

        if(!error){
            try {
                const { data } = await axios.post("/api/public/payment", {
                    id: paymentMethod.id,
                    amount: 100
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                element.getElement(CardElement).clear()
            } catch (error) {
                console.log(error)
            }
    }
    }

    return <form onSubmit={handleSubmit}>
            <div>
                <CardElement />
            </div>
            <button disabled={!stripe}>BUY</button>
        </form>
}

const Pasarela = () => {
    return (
    <Elements stripe={stripePromise} >
        <div >
            
               
                    
        <CheckoutForm />
                      
        </div>
    </Elements>
    );
}

export default Pasarela;
