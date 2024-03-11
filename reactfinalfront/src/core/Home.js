import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Card from '../Components/Card';
import Carousels from '../Components/Carousels';
import "../assets/styles/Home.css";
import hundredper from "../assets/asset_images/100-percent.png"
import fast from "../assets/asset_images/fast.png"
import order from "../assets/asset_images/order.png"
import price from "../assets/asset_images/price-tag.png"
import security from "../assets/asset_images/security.png"
import Sidebar from '../Components/sideBar';
function Home() {
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
   
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const shuffledProducts = shuffleArray(products);
    return (
        <>
        <Navbar toggleSidebar={toggleSidebar}/>
        
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        
        <div className='row pt-4'>
            <div className='col-6'>
            <Carousels/>
            </div>
            <div className='col-6 d-flex flex-column justify-content-center'>
                <div>
                    <h1 className='text-center fw-bold'>ENJOY SHOPPING</h1>
                    <h3 className='text-center text-muted'>with cool offers and discounts on various products, weekly sales.</h3>

                </div>
            </div>
        </div>

        <div className="container-fluid bg-light mt-4 pb-2">
  <div className="text-center fs-2 fw-bold p-4">
    <p>Why Shop With Us</p>
  </div>
  <div className="row">
    <div className="col-md text-center">
      <div>
        <img
          src={hundredper}
          alt=""
          className="feature-img"
        />
      </div>
      <div>
        <p className="fw-bold">Verified</p>
        <p className="text-muted feature-desc">
          100% Genuine and verified products
        </p>
      </div>
    </div>
    <div className="col-md text-center">
      <div>
        <img src={security} alt="" className="feature-img" />
      </div>
      <div>
        <p className="fw-bold">Security</p>
        <p className="text-muted feature-desc">
          Ensures safety and customer privay
        </p>
      </div>
    </div>
    <div className="col-md text-center">
      <div>
        <img
          src={price}
          alt=""
          className="feature-img"
        />
      </div>
      <div>
        <p className="fw-bold">Discounts</p>
        <p className="text-muted feature-desc">
          Up to 70% discount on products
        </p>
      </div>
    </div>
    <div className="col-md text-center">
      <div>
        <img src={fast} alt="" className="feature-img" />
      </div>
      <div>
        <p className="fw-bold">Fast Delivery</p>
        <p className="text-muted feature-desc">Fast door step delivary</p>
      </div>
    </div>
    <div className="col-md text-center">
      <div>
        <img src={order} alt="" className="feature-img" />
      </div>
      <div>
        <p className="fw-bold">Refund</p>
        <p className="text-muted feature-desc">
          100% refunds and 5 day replacement policy
        </p>
      </div>
    </div>
  </div>
</div>

       
            <div className='px-3 py-2 pt-5'>
                <h2 className='py-3'>PRODUCTS</h2>
            </div>
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
            <div>
        <div className="carousels">
  <div className="logos"></div>
  <div className="mask"></div>
</div>
        </div>
            <Footer/>
        </>
    );
}

export default Home;
