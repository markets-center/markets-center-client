import * as React from 'react';
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import Review from './Review';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";
import { payment } from '../../redux/actions/a.order'


const stripePromise = loadStripe("pk_test_51KrNS9BcSGVJjPzhJcb9v599F0HLdJl9aAF87RBVZY1gIwHyC1zegNKiyvDXTjuAdH3hyn7eSsCE82Vw3blNIfx400EZ4eeSGc")

const CARD_ELEMENTS_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "#333",
      fontSize: "18px",
      "::placeholder": {
        color: "#000000"
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238"
      }
    }
  }
}


const CheckoutForm = ({ back, next, amount }) => {
  
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const handleSubmit = async(event) => {
    event.preventDefault()

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
    })

    dispatch(payment(paymentMethod))

  if(!error){
      try {
          const { data } = await axios.post("/api/private/payment", {
              id: paymentMethod.id,
              amount: amount * 100,
          })
          console.log(data)
          console.log(paymentMethod)
          
          elements.getElement(CardElement).clear()
          if(data.success) navigate('/Thanks')
      } catch (error) {
          console.log(error)
      }
    }
}
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CardElement options={CARD_ELEMENTS_OPTIONS}/>
        </Grid>
        <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button disabled={false} type="button" onClick={back} variant="primary" color="primary" sx={{ mt: 3, ml: 1 }}>Back</Button>
          <Button disabled={false} type="submit" variant="primary" color="primary" sx={{ mt: 3, ml: 1 }} >Next</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export function PaymentForm({ back, next, amount }) {
  const { input , paymentMethod } = useSelector(state => state.payment)
  
  return (
    <>
      <Elements stripe={stripePromise}>
      <Review amount={amount}/>
      <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>
        Payment method
      </Typography>
        <CheckoutForm back={back} next={next} amount={amount}/>
      </Elements>
      {/* <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
  </Grid>*/}
    </>
  );
}

export default PaymentForm;