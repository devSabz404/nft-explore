import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/forms/paymentform";
import PayApp from "../components/payment/payment";
import {loadStripe} from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE)
export default function Home(){

  return(
    <Elements stripe={stripePromise}>
      <PaymentForm/>
    </Elements>


  )
}