import React from 'react'
import "../assets/styles/navbar.css"
import logo from '../assets/asset_images/online-shopping.png'
import { Link ,useLocation} from 'react-router-dom'
import { useState,useEffect} from 'react'
import axios from 'axios'
import cartlogo from '../assets/asset_images/grocery-store.png'
import { AuthContext } from '../AuthContext'
import { useContext } from 'react'


function Navbar({toggleSidebar}) {
  const {cartItemCount, userName,userId } = useContext(AuthContext);
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const cartItemCount = sessionStorage.getItem('cartItemCount');
    const stateUserId = location.state && location.state.userId;
    const stateUserName = location.state && location.state.userName;
    if (token ) {
      setIsLoggedIn(true);
      
    }
  }, [location.state]);

  const handleLogout = () => {
    if (userId) {
      axios.get(`http://127.0.0.1:8000/api/user/logout/${userId}/`)
        .then(() => {
          console.log("Logout successful");
         
          setIsLoggedIn(false);
        })
        .catch(error => {
          console.error("Error logging out:", error);
        });
    }
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('userName')
    setIsLoggedIn(false);
    window.location.reload();
  };

  
  const handleSearchInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim() !== '') {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/product/`);
        const filteredProducts = response.data.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
        setSearchResults(filteredProducts);
      } catch (error) {
        console.error('Error searching:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    
    <>
    
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
    <img src={logo} alt="" width="30" height="24" className="d-inline-block align-text-top"/>
      CARTIO
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className='nav-link' to="/">Home</Link>
        </li>
        <li className="nav-item">
        <Link className='nav-link'to={{ pathname: '/allproducts', state: { userId: userId, userName: userName } }}>All Products</Link>
        </li>
        <li className="nav-item">
        <Link className='nav-link' to="/contact">Contact</Link>
        </li>
        <li className="nav-item">
        <Link className='nav-link' to="/aboutus">About</Link>
        </li>

        <li className="nav-item">
        {isLoggedIn && (
        <Link to="/myorder" className="nav-link" tabIndex="-1" aria-disabled="true">
          My Orders
        </Link>
      )}
        </li>

        <li className="nav-item" >
        {isLoggedIn && (
        <Link to="/cart" style={{position:"relative"}} className="nav-link" tabIndex="-1" aria-disabled="true">
          <img src={cartlogo} alt="" style={{ height: "20px" }} />
          
          <span className='p-1 px-2' style={{color:"white",fontSize:"10px",background:"black",borderRadius:"100%",position:"absolute",top:"0%"}}>{cartItemCount}</span>
        </Link>
      )}
        </li>
        
        
      </ul>
      <form className="d-flex">
      <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
            onChange={handleSearchInputChange}
            />
        
      </form>
      {searchResults.length > 0 && searchQuery.trim() !== '' && (
          <div className="search-results rs">
            <ul className=' list-group'>
              {searchResults.map((result) => (
                <li key={result.id} className='list-group-item'>
                  <Link to={`/dummy/${result.id}`}>
                    <img src={result.image} alt=""  height={30} className='px-2'/>
                    {result.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )
          }
      
      <div className='p-1'></div>
      <div className='d-flex gap-2'>
            {isLoggedIn ? (
              <>
               <span onClick={toggleSidebar} className='btn btn-outline-dark fw-bold'>{userName}</span> 
                <button onClick={handleLogout} className='btn btn-outline-dark fw-bold'>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className='btn btn-outline-dark fw-bold'>Login</Link>
                <Link to="/signin" className='btn btn-outline-dark fw-bold'>Sign In</Link>
              </>
            )}
          </div>
        
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar