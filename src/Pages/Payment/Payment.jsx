import React, {useContext, useState} from 'react';
import classes from './Payment.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import {axiosInstance} from '../../Api/axios';
import {db} from "../../Utility/firebase";
import {ClipLoader} from "react-spinners"
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';


function Payment() {
 const [{user, basket }, dispatch] = useContext(DataContext);
 console.log(user);
 
 const tatalItem = basket?.reduce((amount, item) => {
  return item.amount + amount;
 }, 0);
const navigate = useNavigate()


 const total = basket.reduce((amount,item)=>{
  return item.price * item.amount + amount
},0)


const [cardError, setCardError] = useState(null)
const [processing, setProcessing] = useState(false)

 const stripe = useStripe();
 const elements = useElements();

const handleChange = (e) =>{
  console.log(e);
  e.error?.message? setCardError(e?.error?.message): setCardError("")
}

const handlePayment = async(e) => {

  e.preventDefault();
console.log("test");


  try {
        setProcessing(true)
    //1.backend || functions ---> contact to the client sectret

    const response = await axiosInstance({
      method: "POST",
      url: `/payment/creat?total=${total*100}`,
    });
    console.log(response.data);
    const clientSecret = response.data?.clientSecret;
    console.log(clientSecret);
    
    //2. client side (react side confermation)
    const {paymentIntent} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method:{
          card: elements.getElement(CardElement)
      },
      });

     console.log(paymentIntent);
      console.log(user);

      
      //3. after the comformation   order firestore database save, clear basket
       await db.collection("users")
       .doc(user.uid)
       .collection("orders")
       .doc(paymentIntent.id)
       .set({basket:basket,amount:paymentIntent.amount,created:paymentIntent.created});

       //empty basket 
      dispatch({type:Type.EMPITY_BASKET});

      navigate("/orders")
      setProcessing(false)
  } catch (error) {
    console.log(error);
    setProcessing(false)
    
  }


}
  return (

    <LayOut>
      {/* header  */}
      <div className={classes.payment__header}>checkout ({tatalItem}) items</div>

      {/* Payment method  */}
        <section className={classes.payment}>
          {/* address  */}
          <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>

          {user ? (
              <>
                <div>Email: {user.email}</div>
                <div>123 React Lane</div>
                <div>Chicago, IL</div>
              </>
            ) : (
              <div>Loading user information...</div> 
              // Placeholder for loading state
            )}

    {/* <div>Email: {user.email}</div>
             <div>123 React Lane</div>
             <div>Chicaco, Il</div> */}
          </div>
          </div>
          <hr />
          <br />
        {/* product */}
        <div className={classes.flex}>
          
          <h3>Review items and delivery</h3>
          <div>
            {
              basket?.map((item) =><ProductCard product={item} flex={true}/>)
            }
          </div>
        </div>
        <br />
          <hr />
            <br />
          {/* card form */}
          <div className={classes.flex}>
            <h3>Payment methods</h3>
            <div className={classes.payment__card__container}>
              <div className={classes.payment__details}>
                <form onSubmit={handlePayment}>
                  {/* error */}
                  {cardError &&  <small style={{color: "red"}}>{cardError}</small>}
                  {/* card element */}
                  <CardElement onChange={handleChange} />
                  {/* price */}
                  <div className={classes.payment__price}>
                    <div>
                      <span style={{display: "flex", gap: "10px"}}>
                       <p> Total Order |</p> <CurrencyFormat amount={total}/>
                      </span>
                    </div>
                    <button type="submit">
                      {
                        processing? (
                          <div className={classes.loading}>
                            <ClipLoader color="gray" size={12} /> 
                            <p>please wait ...</p>
                          </div>
                        ):" Pay Now"
                      }

                    </button>
                  </div>
                </form>
              </div> 
            </div>
          </div>
        </section>

    </LayOut>
    
  )
}

export default Payment