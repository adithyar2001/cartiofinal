import React from 'react'
import "../assets/styles/Carousels.css"
function Carousels() {
  return (
    <>
        <div className="container-fluid">
  
  <div
    id="carouselExampleIndicators"
    className="carousel slide"
    data-ride="carousel"
  >
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img
          src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="d-block w-100"
          
        />
        
      </div>
      <div className="carousel-item">
        <img
          src="https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="d-block w-100"
          
        />
        
      </div>
      <div className="carousel-item">
        <img
          src="https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="d-block w-100"
          
        />
      </div>
    </div>
    <a
      className="carousel-control-prev"
      href="#carouselExampleIndicators"
      role="button"
      data-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="sr-only">Previous</span>
    </a>
    <a
      className="carousel-control-next"
      href="#carouselExampleIndicators"
      role="button"
      data-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="sr-only">Next</span>
    </a>
  </div>
</div>

    </>
  )
}

export default Carousels