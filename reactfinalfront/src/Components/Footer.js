import React from 'react'
import { useState } from 'react'
import '../assets/styles/Footer.css'
import axios from 'axios';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/send-email/', {
        email: email 
      });
      if (response.status === 200) {
        console.log('Email sent successfully');
        setEmail('');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('http://127.0.0.1:8000/api/user/send-email/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email }),
  //     });
  //     if (response.ok) {
  //       console.log('Email sent successfully');
  //       // Optionally, you can show a success message or reset the form
  //       setEmail('');
  //     } else {
  //       console.error('Failed to send email');
  //       // Handle error, show error message, etc.
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     // Handle error, show error message, etc.
  //   }
  // };

  return (
    <>

  <footer className="pt-5 px-5">
    <div className="row">
      <div className="col-6 col-md-2 mb-3">
        <h5>Pages</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">Home</a></li>
          <li className="nav-item mb-2"><a href="/aboutus" className="nav-link p-0 text-muted">Features</a></li>
          <li className="nav-item mb-2"><a href="/allproducts" className="nav-link p-0 text-muted">Pricing</a></li>
          <li className="nav-item mb-2"><a href="/contact" className="nav-link p-0 text-muted">FAQs</a></li>
          <li className="nav-item mb-2"><a href="/aboutus" className="nav-link p-0 text-muted">About</a></li>
        </ul>
      </div>


      <div className="col-6 col-md-2 mb-3">
        <h5>About Us</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Welcome to Cartio</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Your ultimate eCommerce destination. </a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Explore, shop, and enjoy hassle-free shopping with us.</a></li>
          {/* <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li> */}
        </ul>
      </div>

      <div className="col-6 col-md-2 mb-3">
        <h5>Contact</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">cartioestore@gmail.com</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted d-flex align-items-center gap-1">  Cartio E-store, M.G Road Kochi Ernakulam</a></li>
          {/* <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted ps-3"></a></li> */}
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">+91 234-245-7710</a></li>
          <li className="nav-item mb-2"><a href="/contact" className="nav-link p-0 text-muted">Click Here</a></li>
        </ul>
      </div>

      <div className="col-md-5 offset-md-1 mb-3">
        <form onSubmit={handleSubmit}>
          <h5>Subscribe to our newsletter</h5>
          <p>Monthly digest of what's new and exciting from us.</p>
          <div className="d-flex flex-column flex-sm-row w-100 gap-2">
            <label for="newsletter1" className="visually-hidden">Email address</label>
            <input id="newsletter1" type="text" className="form-control" placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">Subscribe</button>
          </div>
        </form>
      </div>
    </div>

    <div className="d-flex flex-column flex-sm-row justify-content-between border-top">
      <p>2024 Company, Inc. All rights reserved.</p>
      <ul className="list-unstyled d-flex gap-2">
      <>
  <li classname="">
    <a classname="link-dark" href="#">
    <svg height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
    </a>
  </li>
  <li classname="">
    <a classname="link-dark" href="#">
    <svg height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
    </a>
  </li>
  <li classname="">
    <a classname="link-dark" href="#">
    <svg height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z"/></svg>
    </a>
  </li>
  <li classname="">
    <a classname="link-dark" href="#">
    <svg height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
    </a>
  </li>
  <li classname="">
    <a classname="link-dark" href="#">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
    </a>
  </li>
  <li classname="">
    <a classname="link-dark" href="#">
    <svg height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/></svg>
    </a>
  </li>
</>

      </ul>
    </div>
  </footer>


    </>
  )
}

export default Footer