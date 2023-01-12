import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Divider, Form,Input,Button,notification } from "antd";
import React, { useState } from "react";

const API_URL = process.env.REACT_APP_API_ENDPOINT
export default function PaymentForm(){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
   

    const stripe = useStripe()
    const elements = useElements()

    const openSuccess = () => {
        notification.open({
          message: 'Payment Successful',
          description:
            'Transaction has been completed.',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      };
      const openFail = () => {
        notification.open({
          message: 'Payment Failed',
          description:
            'Make sure the card details are correct',
       
        });
      };
    

    const creatSub = async ()=>{
        try {
            const paymentMethod = await stripe.createPaymentMethod({
                type:"card",
                card:elements.getElement('card'),
             });
                const response = await fetch(`${API_URL}/userinvite/subscribe`,{
                    method:"POST",
                    headers:{
                        "content-Type":'application/json'
                    },
                    body:JSON.stringify({
                        name,
                        email,
                        paymentMethod: paymentMethod.paymentMethod.id,
    
                    }),
                });
                if(!response.ok) return alert("Payment unsuccess");
                const data = await response.json();
                const confirm = await stripe.confirmCardPayment(data.clientSecret)
                if(confirm.error) return openFail()
                openSuccess();
                setTimeout(()=>{
                    window.location.replace('/register')
                },3000)

             
           
        } catch (error) {
            
           openFail()
            
        }
    }
    return(
       
        <div >
        <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                >
           <Form.Item label="Full Name">
           <Input
             type="text"
             value={name}
             onChange={(e) =>setName(e.target.value)}/>
           </Form.Item>

           <Form.Item label="Email">
           <Input
             type="email"
             value={email}
             onChange={(e) =>setEmail(e.target.value)}/>
           </Form.Item>
           <Divider/>
           <Form.Item label="Card Details">
           <CardElement/>
           </Form.Item>
           <Form.Item label="Pay">
       <Button
          onClick={creatSub}
          >Agree</Button>
        </Form.Item>

        </Form>
              

     
    </div>

    )
}