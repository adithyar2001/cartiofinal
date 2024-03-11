import React from "react";
import "../assets/styles/Signin.css";
import { signup } from "../auth/helper/Index";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Signin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
    date_of_birth: "",
    error: "",
    success: false,
  });
  const { name, email, password, gender, phone, address, date_of_birth, error, success } =
    values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    if (password.length < 3) {
      setValues({ ...values, error: "Password must be at least 3 characters long." });
      return;
    }
    const phonePattern = /^\d{10}$/;
  if (!phone.match(phonePattern)) {
    setValues({ ...values, error: "Please enter a valid 10-digit phone number." });
    return;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailPattern)) {
    setValues({ ...values, error: "Please enter a valid email address." });
    return;
  }
    

    if (!name || !email || !password || !gender || !phone || !address || !date_of_birth) {
      setValues({ ...values, error: "Please fill in all the required fields." });
      return;
    }

    const currentDate = new Date();
  const selectedDate = new Date(date_of_birth);
  const yearsDiff = currentDate.getFullYear() - selectedDate.getFullYear();

  if (yearsDiff < 16) {
    setValues({ ...values, error: "You must be at least 16 years old to sign up." });
    return;
  }
    

  axios.post("http://127.0.0.1:8000/api/user/", values)
      .then((response) => {
        console.log("Response:", response.data);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          gender: "",
          phone: "",
          address: "",
          date_of_birth: "",
          error: "",
          success: true,
        });
        navigate("/login")
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  
  return (
    <>
      <div className="signin_outer">
        <div className="container register_card">
          <h2 className="text-center fw-bold">SIGN IN</h2>
          <div>
          {error && <div className="alert alert-danger">{error}</div>}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group pb-3">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                required=""
                value={name}
                onChange={handleChange("name")}
              />
            </div>
            <div className="form-group pb-3">
              <label htmlFor="email">Email address:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                required=""
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            {error && error.includes("email") && (
            <div className="alert alert-danger">Please enter a valid email address.</div>
          )}
            <div className="form-group pb-3">
              <label>Gender:</label>
              <br />
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  defaultValue="M"
                  required=""
                  onChange={handleChange("gender")}
                  value="M"
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  defaultValue="F"
                  onChange={handleChange("gender")}
                  value="F"
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="other"
                  defaultValue="O"
                  value="other"
                  onChange={handleChange("gender")}
                />
                <label className="form-check-label" htmlFor="other">
                  Other
                </label>
              </div>
            </div>
            <div className="form-group pb-3">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Enter phone number"
                value={phone}
                onChange={handleChange("phone")}
              />
            </div>
            {error && error.includes("phone") && (
            <div className="alert alert-danger">Please enter a valid phone number.</div>
          )}
            
            <div className="form-group pb-3">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter your address"
                value={address}
                onChange={handleChange("address")}
              />
            </div>
            <div className="form-group pb-3">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                className="form-control"
                id="dob"
                value={date_of_birth}
                onChange={handleChange("date_of_birth")}
              />
            </div>
            {error && error.includes("date_of_birth") && (
            <div className="alert alert-danger">You must be at least 16 years old to sign up.</div>
          )}
            <div className="form-group pb-3">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                required=""
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            {error && error.includes("password") && (
            <div className="alert alert-danger">Password must be at least 6 characters long.</div>
          )}
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-dark">
                Sign In
              </button>
            </div>
            <div className="pt-3">
              <p className="text-center">
                Already a user ? <a href="/login">Login</a>
              </p>
            </div>
          </form>
          {/* <p>{JSON.stringify(values)}</p> */}
        </div>
      </div>
    </>
  );
}

export default Signin;
