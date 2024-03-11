import React from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useState,useEffect } from 'react';
import Card from '../Components/Card';
import Carousels from '../Components/Carousels';
import Sidebar from '../Components/sideBar';
function Allproductpage() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://127.0.0.1:8000/api/product/');
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch products');
    //             }
    //             const data = await response.json();
    //             setProducts(data);
    //         } catch (error) {
    //             setError(error.message);
    //         }
    //     };

    //     fetchData();
    // }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await fetch('http://127.0.0.1:8000/api/category/');
                if (!categoryResponse.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const categoryData = await categoryResponse.json();
                setCategories(categoryData);

                const productResponse = await fetch('http://127.0.0.1:8000/api/product/');
                if (!productResponse.ok) {
                    throw new Error('Failed to fetch products');
                }
                const productData = await productResponse.json();
                setProducts(productData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const shuffleArray1 = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    
    
    const numberOfProductsToShow = 4;

    const shuffledProducts = shuffleArray1(products);
    const filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  return (
    <>
    <Navbar toggleSidebar={toggleSidebar}/>
        
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    <div className='px-3 pt-1'>
                <h2 className='py-3'>ALL PRODUCTS</h2>
            </div>
            <div className="px-3 pb-5">
                <label htmlFor="categorySelect" className="form-label">Select Category:</label>
                <select id="categorySelect" className="form-select w-25"  value={selectedCategory} onChange={(e) => setSelectedCategory(parseInt(e.target.value))}>
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            
            <div className="row px-3">
                {shuffleArray1(filteredProducts).map((product, index) => (
                    <div key={index} className='col mb-4'>
                        <Card product={product} />
                    </div>
                ))}
            </div>
            <div className=''>
                <h2 className='fw-bold px-4 py-4'>Featured Products</h2>
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

            <div className="row pt-3 px-3">
                {shuffledProducts.slice(0, numberOfProductsToShow).map((product, index) => (
                    <div key={index} className='col mb-4 d-flex justify-content-center'>
                        <Card product={product}/>
                    </div>
                ))}
            </div>
            <Footer/>
    </>
  )
}

export default Allproductpage