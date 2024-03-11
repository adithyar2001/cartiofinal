import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../assets/styles/aboutus.css";
import { useState } from "react";
import Sidebar from "../Components/sideBar";
function Aboutus() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Navbar toggleSidebar={toggleSidebar}/>
        
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <>
        <div className="row">
          <div className="col-lg-6 top-bimg top1">
          </div>
          <div className="col-lg-6 headline-text top1 bg-light">
            <div>
              <h2 className="fw-bold" style={{ fontSize: 40 }}>
                ABOUT US
              </h2>
            </div>
            <div className="py-2">
              <p className="text-muted" style={{ fontSize: 20 }}>
                We are a service provider who aims to provide the best quality
                products and better service to our customers than others. Enjoy
                shopping with huge offers and discounts on our e-store
              </p>
              <p className="text-muted fw-bolder" style={{ fontSize: 30 }}>
                LET'S SHOP
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-0">
          <div className="col-lg-6 headline-text top1 bg-light">
            <div>
              <h2 className="fw-bold" style={{ fontSize: 40 }}>
                OUR VISION
              </h2>
            </div>
            <div>
              <p className="text-muted" style={{ fontSize: 20 }}>
                We aim on making product shopping fully digital, making online
                shopping trusted among all individuals. <br />
                GO ! Fully digital in shopping. <br />
                Services available at your doorsteps
              </p>
            </div>
          </div>
          <div className="col-lg-6 top-bimg-ab2 top1"></div>
        </div>
        <div className="container-fluid p-4 pt-5">
          <div className="text-center">
            <p className="fs-2 fw-bolder" style={{ fontSize: 40 }}>Social Media Posts</p>
            <p className="text-muted" style={{ fontSize: 12 }}>
              Here's some of our popular trends and products share from our
              customers
            </p>
          </div>
          <div className="container pt-2">
            <div className="row py-3">
              <div className="col text-center">
                <img
                  src="https://rukminim2.flixcart.com/image/832/832/ktep2fk0/shopsy-sari/f/a/j/free-shopspsy-blue-keri-03-cottan-silk-400-uk-worlds-unstitched-original-imag6rbuzzc68th5.jpeg?q=70"
                  alt=""
                  className="social-post"
                />
              </div>
              <div className="col text-center">
                <img
                  src="https://rukminim2.flixcart.com/image/1080/1080/l5ld8y80/fabric/1/c/v/no-na-unstitched-na-jequred-saree-anuvrata-original-imagg8f6xb9u3u8r.jpeg?q=70"
                  alt=""
                  className="social-post"
                />
              </div>
              <div className="col text-center">
                <img
                  src="https://rukminim2.flixcart.com/image/792/792/kt0enww0/sari/f/b/1/free-vx-greenblack-prutha-fashions-unstitched-original-imag6gcfe7rgjpxn.jpeg?q=70"
                  alt=""
                  className="social-post"
                />
              </div>
              <div className="col text-center">
                <img
                  src="https://rukminim2.flixcart.com/image/821/821/l3os4280/sari/s/t/u/free-3077-abc-entprise-unstitched-original-imager4masawhfrp.jpeg?q=70"
                  alt=""
                  className="social-post"
                />
              </div>
              <div className="col text-center">
                <img
                  src="https://rukminim2.flixcart.com/image/832/832/xif0q/sari/2/g/i/free-kp-3031-ericaa-textile-unstitched-original-imaggurhhcmav4eu.jpeg?q=70"
                  alt=""
                  className="social-post"
                />
              </div>
            </div>
          </div>
        </div>
      </>

      <Footer />
    </>
  );
}

export default Aboutus;
