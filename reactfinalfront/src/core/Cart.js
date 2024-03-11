import React, { useState, useEffect } from "react";
import { removeItemFromCart, loadCart } from "./helper/Carthelper";
import "../assets/styles/Cart.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import del from '../assets/asset_images/delete.png'
import { addItemToCart } from "./helper/Carthelper";
import Payment from "./Payment";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import Sidebar from "../Components/sideBar";
function Cart() {
  const { cartItemCount, updateCartItemCount } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [forceRender, setForceRender] = useState(false);
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  
  useEffect(() => {
    const items = loadCart();
    setCartItems(items);
  }, [forceRender]);

  const handleRemoveItem = (itemId) => {
    removeItemFromCart(itemId);
    if(cartItemCount !==0){
      updateCartItemCount(cartItemCount - 1);
    }
    
    setForceRender(!forceRender) 
  };
  console.log("cart item count ",cartItemCount);

  const handleAddToCart = (item) => {
    addItemToCart(item); 
    updateCartItemCount(cartItemCount + 1);
    setForceRender(!forceRender);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Navbar cartItemCount={cartItemCount} toggleSidebar={toggleSidebar} />
        
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div className="container my-5">
        <h2 className="mb-4">Cart Items</h2>
        {cartItems.length === 0 ? (
          <div className="container">
            <p>Your cart is empty</p>
            <div>
              <a href="/allproducts" className="btn btn-dark"> Buy Now</a>
            </div>
            <div className="d-flex justify-content-center">
              <img
                className="without_item_img"
                src="https://media.licdn.com/dms/image/D4E12AQGsGxbVZEGuZw/article-cover_image-shrink_600_2000/0/1672420736505?e=2147483647&v=beta&t=GmWwAd3QitE555sAftcwEHoEuzjQ8ZUmE44wlvaoGc4"
                alt=""
              />
            </div>
          </div>
        ) : (
          <div className="row">

            {cartItems.map((item, index) => (
              <div key={index} className="col-12 mb-4">
                
                <div className="d-flex cart_items px-3 align-item-baseline">
                  <div>
                    <img
                      src={item.image}
                      className="cart-img"
                      alt={item.name}
                    />
                  </div>
                  <div>
                    <p>{item.name}</p>
                  </div>
                  <div>
                    <p>RS. {item.price}</p>
                  </div>
                  {/* <div className="d-flex qty_btn" >
                    <button onClick={decreaseQuantity} variant="primary" className="btn btn-dark">
                      -
                    </button>
                    <div>{quantity}</div>
                    <button onClick={increaseQuantity} variant="primary" className="btn btn-dark">
                      +
                    </button>
                  </div> */}
                  <div className="d-flex align-item-center">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="btn btn-danger d-flex align-item-center py-3"
                    >
                      <img src={del} alt="" style={{height:"15px"}} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row">
      <div>
        {cartItems.length>0 ?(
          <Payment cartItems = {cartItems}/>
        ):(
          <h2>
            
          </h2>
        )}
      </div>
      </div>
      
      <Footer />
    </>
  );
}

export default Cart;
