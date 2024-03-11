import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../assets/styles/Myorder.css'
import Sidebar from '../Components/sideBar';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/order/?user=${userId}`)
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, [userId]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <Navbar toggleSidebar={toggleSidebar}/>
        
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            <div className='py-4 px-3'>
            <h2 className='fw-bold'>MY ORDERS</h2>
            </div >
            
            {orders.length === 0 ? (
                <div>
                    <div className=''>
                        <h3 className='text-muted fw-bold text-center'>No new orders !</h3>
                    </div>
                    <div className='d-flex  justify-content-center'>
                        <a href="/allproducts" className='btn btn-dark'>BUY NOW</a>
                    </div>
                    
                    <div className='empty_div'>
                        <img src="https://cdn.dribbble.com/users/665029/screenshots/16162764/media/3ea69cb1655fba401acc6c4328d38633.gif" alt=""  />
                    </div>
                </div>
                
            ) : (
                <div className='px-3 mb-5'>
                    <div className='order_receive'>
                            <p className='text-center'>You will recieve your order with 3-4 working days.</p>
                    </div>
                    {orders.map(order => (
                        <div key={order.id} className='mb-2 flex-wrap p-5 d-flex justify-content-evenly rounded myorders_card'>
                            <div>{order.product_name}</div>
                            <div className='d-flex gap-1'><p className='text-muted'>QTY:</p>{order.total_products}</div>
                            <div className='d-flex gap-1'><p className='text-muted'>TxN ID:</p>{order.transaction_id}</div>
                            <div>RS.{order.total_amount}</div>
                            <div>{order.created_at}</div>
                            
                        </div>
                    ))}
                </div>
            )}
            <Footer />
        </>
    );
};

export default OrderList;
