import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './ProductList.css'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { errorMessages, loadingMessages } from '../../utils/messages';

function ProductList() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const PRODUCTS_PER_PAGE = 10;

    // Function to fetch products from the API
    const fetchProducts = async (page) => {
        const skip = (page - 1) * PRODUCTS_PER_PAGE;
        const url = `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(errorMessages.fetchProducts);
            }
            return await response.json();
        } catch (error) {
            throw new Error(errorMessages.fetchProducts);
        }
    };

    useEffect(() => {
        // Fetch products when the component mounts or page changes
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts(page);
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    // Function to handle next page navigation
    const nextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    // Function to handle previous page navigation
    const prevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="container">
            <ErrorBoundary error={error}>
                <h1 className="mt-4 mb-3">Products</h1>
                {loading && <div className="alert alert-info">{loadingMessages.fetchProducts}</div>}
                {!loading && !error && (
                    <>
                        <div className="row justify-content-center">
                            {products && products.products.map((product) => (
                                <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                                    <div className="card h-100">
                                        <Link to={`/products/${product.id}`}>
                                            <img className="card-img-top product-image" src={product.thumbnail} alt={product.title} />
                                        </Link>
                                        <div className="card-body">
                                            <h4 className="card-title justify-content-center">
                                                <Link to={`/products/${product.id}`}>{product.title}</Link>
                                            </h4>
                                            <p className="card-text">Price: ${product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12 btn-container">
                                <button type='button' className="btn btn-primary mr-2" onClick={prevPage} disabled={page === 1} >Previous Page</button>
                                <button type='button' className='btn btn-primary' onClick={nextPage}>Next Page</button>
                            </div>
                        </div>
                    </>
                )}
            </ErrorBoundary>
        </div>
    );
};


export default ProductList
