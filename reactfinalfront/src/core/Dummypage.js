import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/dummypage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { addItemToCart } from '../core/helper/Carthelper';
import { removeItemFromCart } from '../core/helper/Carthelper';
import Card from "../Components/Card";
import Sidebar from "../Components/sideBar";
function Dummypage() {
  const navigate = useNavigate()
  
  const removefromcart =false
  const { id } = useParams();

  const [product, setProduct] = useState({});

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { isAuthenticated,userId,cartItemCount, updateCartItemCount } = useContext(AuthContext);
  // const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    console.log(id);
    const fetchProduct = () => {
      try {
        axios
          .get(`http://127.0.0.1:8000/api/product/${id}/`)
          .then((response) => {
            console.log(response);
            setProduct(response.data);
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  //   if (!product) {
  //     return <div>Loading...</div>;
  //   }
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

  // const removeFromCartHandler = () => {
  //   console.log("Product removed from cart");
  //   setIsAddedToCart(false);
  // };
  const removeFromCartHandler = () => {
    removeItemFromCart(product.id);
    updateCartItemCount(cartItemCount - 1);
    console.log("Product removed from cart");
    setIsAddedToCart(false);
  };
  const navigateToCart = () => {

    if(isAuthenticated){
      if (!isAddedToCart) {
        addItemToCart(product, () => {
          updateCartItemCount(cartItemCount + 1);
          console.log("Added to cart");
          setIsAddedToCart(true);
          navigate('/cart');
        });
      } else {
        navigate('/cart');
      }
    }
    else{
      alert("please login to buy an item.")
    }
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://127.0.0.1:8000/api/product/');
              if (!response.ok) {
                  throw new Error('Failed to fetch products');
              }
              const data = await response.json();
              setProducts(data);
          } catch (error) {
              setError(error.message);
          }
      };

      fetchData();
  }, []);

  const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  };
  const numberOfProductsToShow = 4;
 

  const shuffledProducts = shuffleArray(products);

  
  
  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar}/>
        
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div className="row pt-3">
        <div className="col">
          <div className="d-flex flex-column justify-content-center p-2">
            <div className="d-flex flex-row justify-content-center p-3">
              <div className=" single-product-card">
                <img
                  className="p-1"
                  src={product.image}
                  alt=""
                  id="single-product-img"
                />
              </div>
            </div>
            {/* <div className="d-flex flex-row gap-2 justify-content-center">
              <div className="p-2 small-img-outer-div">
                <div className="small-single-product-card">
                  <img
                    className="small-product-img "
                    src="https://rukminim2.flixcart.com/image/832/832/ks99aq80/shoe/r/u/p/9-805-green-waan-black-green-original-imag5v9kgunazwnq.jpeg?q=70"
                    alt=""
                    id="single-small-img-1"
                  />
                </div>
              </div>
              <div className="p-2 small-img-outer-div">
                <div className="small-single-product-card">
                  <img
                    className="small-product-img "
                    src="https://rukminim2.flixcart.com/image/832/832/ks99aq80/shoe/w/h/q/9-805-green-waan-black-green-original-imag5v9kc2tbzv3v.jpeg?q=70"
                    alt=""
                    id="single-small-img-2"
                  />
                </div>
              </div>
              <div className="p-2 small-img-outer-div">
                <div className="small-single-product-card">
                  <img
                    className="small-product-img "
                    src="https://rukminim2.flixcart.com/image/832/832/ks99aq80/shoe/7/y/1/9-805-green-waan-black-green-original-imag5v9kknrzzphp.jpeg?q=70"
                    alt=""
                    id="single-small-img-3"
                  />
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="col d-flex flex-column justify-content-center">
          <div className="p-3 shadows py-4">
            <div className="d-flex flex-column justify-content-center py-3">
              <div>
                <p className="text-muted px-2">
                  Product Stock: <span>{product.stock}</span>
                </p>
                
                <h2 className="fw-bold px-2">{product.name}</h2>
                <p className="px-2">{product.description}</p>
              </div>
              <div className="px-2">
                <p className="text-muted fw-bolder lead">RS : {product.price}</p>
              </div>

              <div className="d-flex flex-row gap-3">
  {product.availability ? (
    <div className="d-flex gap-3">
      <button onClick={navigateToCart} className="btn btn-outline-dark buy-now-btn">
        <div className="add-to-cart-div">
          <div>
            <span className="fw-700">Buy Now</span>
          </div>
        </div>
      </button>
      
      <div className="add-to-cart-div">
        <div>
        {isAddedToCart || removefromcart ? (
                  <button onClick={removeFromCartHandler} className="btn btn-outline-dark">RemoveItem</button>
                ) : (
                  <button onClick={addToCartHandler} className="btn btn-outline-dark">AddToCart</button>
                )}
        </div>
      </div>

    </div>
  ) : (
    <div>
      <button className="btn btn-outline-dark" disabled>
        <div className="add-to-cart-div">
          <div>
            <span className="fw-700">Out of Stock</span>
          </div>
        </div>
      </button>
    </div>
  )}
  {/* <div>
    
  </div> */}
</div>

            </div>
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="py-3">
          <h2 className="px-3 fw-bold">Featured Products</h2>
        </div>
        <div>
        <div className="row px-3">
                {shuffledProducts.slice(0, numberOfProductsToShow).map((product, index) => (
                    <div key={index} className='col mb-4 d-flex justify-content-center'>
                        <Card product={product}/>
                    </div>
                ))}
                 {/* {products.slice(0, numberOfProductsToShow).map((product, index) => (
                    <div key={index} className='col mb-4 d-flex justify-content-center'>
                        <Card product={product}/>
                    </div>
                ))} */}
            </div>
        </div>
      </div>
      

      <Footer />
    </div>
  );
}

export default Dummypage;
