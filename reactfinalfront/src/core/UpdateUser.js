import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UpdateUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
    date_of_birth: "",
  });
  const navigate= useNavigate()
  const userId = sessionStorage.getItem('userId')

  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/${userId}/`)
      .then(response => {
        const userData = response.data;
        setUserData(userData);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  const [errors, setErrors] = useState({
    password: "",
    email: "",
    phone: "",
    date_of_birth:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password && userData.password.length < 3) {
        setErrors({ ...errors, password: "Password must be at least 3 characters long." });
        return;
      }
    
   
      if (!userData.email || userData.email.length === 0 || userData.email.length > 50) {
        setErrors({ ...errors, email: "Email is required and cannot exceed 50 characters." });
        return;
      }
    
      
      if (!userData.phone || userData.phone.length === 0 || userData.phone.length !== 10 || isNaN(userData.phone)) {
        setErrors({ ...errors, phone: "Phone number is required and must be a 10-digit number." });
        return;
      }

      const dob = new Date(userData.date_of_birth);
      if (isNaN(dob.getTime())) {
        setErrors({ ...errors, date_of_birth: "Please enter a valid date of birth." });
        return;
      }

      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
    
      if (age < 16) {
        setErrors({ ...errors, date_of_birth: "Age must be at least 16 years old." });
        return;
      }

    axios.put(`http://localhost:8000/api/user/${userId}/`, userData)
      .then(response => {
       
        console.log("User updated successfully:", response.data);
       
        alert("Changes updated successfully")
        navigate("/")
      })
      .catch(error => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="container">
    <div className="row justify-content-center mx-auto">
     
        <div className="card " style={{ width: '35rem' }}>
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Update User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" className="form-control" name="name" value={userData.name} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" name="email" value={userData.email} onChange={handleChange} />
              </div>
              {errors.email && <div className="alert alert-danger">{errors.email}</div>}
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input type="password" className="form-control" name="password" value={userData.password} onChange={handleChange} />
              </div>
              {errors.password && <div className="alert alert-danger">{errors.password}</div>}
              <div className="mb-3">
                <label className="form-label">Gender:</label>
                <select className="form-select" name="gender" value={userData.gender} onChange={handleChange}>
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Phone:</label>
                <input type="text" className="form-control" name="phone" value={userData.phone} onChange={handleChange} />
              </div>
              {errors.phone && <div className="alert alert-danger">{errors.phone}</div>}
              <div className="mb-3">
                <label className="form-label">Address:</label>
                <input type="text" className="form-control" name="address" value={userData.address} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth:</label>
                <input type="date" className="form-control" name="date_of_birth" value={userData.date_of_birth} onChange={handleChange} />
              </div>
              {errors.date_of_birth && <div className="alert alert-danger">{errors.date_of_birth}</div>}
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      
    </div>
  </div>

  );
};

export default UpdateUser;
