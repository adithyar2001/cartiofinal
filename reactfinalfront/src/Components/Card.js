
import React, { useState ,useContext} from 'react';
import "../assets/styles/Card.css";
import { Link } from 'react-router-dom';
import { addItemToCart } from '../core/helper/Carthelper';
import { removeItemFromCart } from '../core/helper/Carthelper';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
function Card({ product, addtoCart = true, removefromcart = false }) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  const { isAuthenticated,userId,cartItemCount, updateCartItemCount } = useContext(AuthContext);

  const navigate = useNavigate()

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };


  console.log("isauthenticated",isAuthenticated);
  const addToCartHandler = () => {
    if(isAuthenticated){
      addItemToCart(product,()=>{})
      updateCartItemCount(cartItemCount + 1);
      console.log("Added to cart");
      setIsAddedToCart(true);
      
      
    } else {
      alert("Please login")
      console.log("Please login");
    }
  };


  //   console.log("Product removed from cart");
  //   setIsAddedToCart(false);
  // };
  const removeFromCartHandler = () => {
    removeItemFromCart(product.id);
    if (cartItemCount !== 0) {
      updateCartItemCount(cartItemCount - 1);
    }
    console.log("Product removed from cart");
    setIsAddedToCart(false);
  };

  const navigateToCart = () => {
    if(isAuthenticated){
      if (!isAddedToCart) {
        addItemToCart(product, () => {
          console.log("Added to cart");
          updateCartItemCount(cartItemCount + 1);
          setIsAddedToCart(true);
          navigate('/cart');
        });
      } else {
        navigate('/cart');
      }
    }
    else{
      alert("You are not logged in. Please log in.")  
    }
    
  };


  return (
    <>
      <div className="card">
        <Link to={`/dummy/${product.id}`}>
          <img src={product.image} className="card-img-top" alt="..." />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{truncateText(product.name, 20)}</h5>
          <p className="card-text">{truncateText(product.description, 25)}</p>
          <h5 className="card-title">RS : {product.price}</h5>
          {product.availability ? (
            <div className="row">
              <div className="col-6">
                
                {isAddedToCart || removefromcart ? (
                  <button onClick={removeFromCartHandler} className="btn btn-outline-dark">RemoveItem</button>
                ) : (
                  <button onClick={addToCartHandler} className="btn btn-outline-dark">AddToCart</button>
                )}
              </div>
              <div className="col-6">
                <button onClick={navigateToCart} className="btn btn-outline-dark">BUY</button>
              </div>
            </div>
          ) : (
            <div>
              <h4 className='text-muted'>Out of Stock!</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;

