import React from "react";
import "../assets/styles/Contact.css";
import email from "../assets/asset_images/email.png";
import location from "../assets/asset_images/location.png";
import phone from "../assets/asset_images/phone.png";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState } from "react";
import Sidebar from "../Components/sideBar";
function Contact() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Navbar toggleSidebar={toggleSidebar}/>
        
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div className="contact_us_text">
        <p>Contact Us</p>
      </div>
      <div className="for_gif"></div>
      
      <div className="cop ">
        <div className="cop1 ">
          <div>
            <img className="copimg" src={email} alt="" />
          </div>
          <div>
            <p>cartioestore@gmail.com</p>
          </div>
        </div>
        <div className="cop1 ">
          <div>
            <img className="copimg" src={location} alt="" />
          </div>
          <div>
            <p>
              Cartio E-store, M.G Road
              <br />
              Kochi Ernakulam
            </p>
          </div>
        </div>
        <div className="cop1 ">
          <div>
            <img className="copimg" src={phone} alt="" />
          </div>
          <div>
            <p>+91 234-245-7710</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
