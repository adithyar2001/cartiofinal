import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from './helper/Carthelper';
import { getPtoken } from './helper/paymenthelper';
import { payemntProcess } from './helper/paymenthelper';
import { createOrder } from './helper/Orderhelper';
import DropIn from "braintree-web-drop-in-react"
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';

const Payment = ({cartItems}) => {
    const navigate=useNavigate()
    const [forceRender, setForceRender] = useState(false);
    const [succes,setSucces]=useState(false)
    const [instance, setInstance] = useState(null);
    const token = sessionStorage.getItem('token');
    const { isAuthenticated,userId,cart,cartItemCount } = useContext(AuthContext);
    const [info,setInfo]=useState({
        loading:false,
        success:false,
        clientToken:null,
        error:"",
        instance:{}
    });
    console.log("payment token",token);
    console.log("payment auth",isAuthenticated);
    console.log("payment userid",userId);
    const getToken = (userId, token)=>{
        getPtoken(userId,token)
        .then(info=>{
            if(info.error){
                setInfo({
                    ...info,error:info.error
                });
                
            }
            else{
                const clientToken = info.clientToken;
                setInfo({clientToken})
            }
        })
    }
    useEffect(()=>{
        getToken(userId,token);
    },[])

    useEffect(() => {
        
        if(succes){
                    
            navigate('/cart')
        }

    }, [succes]);


    

    const getAmount=()=>{
        let amount = 0;
        cartItems.map(p=>{
            amount= amount + parseInt(p.price)
        })
        return amount;
    }
    const showbtnDropIn = ()=>{
        return(
            <>
            {
                info.clientToken!== null && cartItems.length >0 ?(
                    <div>
                        <DropIn options={{authorization:info.clientToken}} onInstance={setInstance}>
                            
                        </DropIn>
                        <button onClick={onPurchase} className='btn btn-block btn-dark'>Pay Now</button>
                    </div>
                ):
            (
                <div>Please login first or add something cart</div>

            )}
            </>
        )
    }
    // const onPurchase = ()=>{
    //     setInfo({loading:true})
    //     let nonce;
    //     let getNonce = info.instance.requestPaymentMethod()
    //     .then(data=>{
    //         nonce = data.nonce;
    //         const paymentData = {
    //             paymentMethodNonce:nonce,
    //             amount:getAmount()
    //         };
    //         payemntProcess(userId,token,paymentData)
    //         .then(response=>{
    //             if(!response.error){
    //                 if(response.code == "1"){
    //                     console.log("payment failed");
    //                 }
    //             }
    //             else{
    //                 setInfo({...info,
    //                 success:response.success,loading:false})
    //             }
    //             console.log("payment success");
    //             let product_name = ""
    //             cartItems.forEach(function(item){
    //                 product_name += item.name + ","
    //             });
    //             const orderData = {
    //                 products:product_name,
    //                 transaction_id:response.transaction_id,
    //                 amount:response.transaction_amount
    //             }
    //             createOrder(userId,token,orderData)
    //         })
    //         .then(response =>{
    //             if(response.error){
    //                 if(response.code=="1"){
    //                     console.log("order Failed");
    //                 }
    //             }
    //             else{
    //                 if(response.success == true){
    //                     console.log("order placed");
    //                 }
    //             }
    //         })
    //         .catch(err=>{
    //             setInfo({loading:false,success:false})
    //             console.log("order failed",err);
    //         })
    //         emptyCart(()=>{
    //             console.log("Cart is empty now");
    //         })

    //     })
    //     .catch(err=>console.log(err))
    // }
    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        if (instance) {
            instance.requestPaymentMethod()
                .then(data => {
                    nonce = data.nonce;
                    const paymentData = {
                        paymentMethodNonce: nonce,
                        amount: getAmount()
                        
                    };
                    
                    payemntProcess(userId, token, paymentData)
                        .then(response => {
                            if (!response.error) {
                                if (response.code === "1") {
                                    console.log("Payment failed");
                                    alert("payment failed.")
                                } else {
                                    console.log("Payment success");
                                    alert("payment successfull.")
                                    let product_name = "";
                                    cartItems.forEach(function (item) {
                                        product_name += item.name + ",";
                                    });

                                    const orderData = {
                                        products: product_name,
                                        transaction_id: response.transaction.id,
                                        amount: getAmount()
                                    };
                                    console.log("orderdata",orderData);
                                    createOrder(userId, token, orderData)
                                        .then(response => {
                                            if (response.error) {
                                                if (response.code === "1") {
                                                    console.log("Order failed");
                                                    alert("Order Failed! Please try again")
                                                    // navigate('/cart')
                                                }
                                            } else {
                                                if (response.success === true) {
                                                    console.log("Order placed");
                                                    alert('Order placed successfully! thank you for shopping with us !')
                                                    navigate('/cart')
                                                    
                                                    
                                                }
                                            }
                                        })
                                        .catch(err => {
                                            console.log("Error creating order:", err);
                                        });
                                        navigate('/cart')
                                        emptyCart(() => {
                                            console.log("Cart is empty now");
                                            sessionStorage.removeItem('cartItemCount');
                                            window.location.reload();
                                        });

                                }
                            } else {
                                console.log("Payment process error:", response.error);
                                alert("failed to process payment. please try again !!")
                            }
                        })
                        .catch(err => {
                            console.log("Error processing payment:", err);
                        })
                        .finally(() => {
                            emptyCart(() => {
                                console.log("Cart is empty now");
                            });
                        });
                })
                .catch(err => {
                    setInfo({ loading: false, success: false });
                    console.log("Error in requesting payment method:", err);
                });
        } else {
            console.log("Error: DropIn instance is not available.");
            setInfo({ loading: false, success: false });
        }
    };
    
    return (
        <>
       
        <div>
            <h3 className='text-muted px-5'>your total bill is <b>RS.{getAmount()}</b></h3>
            <div className='px-5 pb-5'>
            {showbtnDropIn()}
            </div>
        </div>
        </>
    );
};

export default Payment;
