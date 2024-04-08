import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { errorMessages, loadingMessages } from '../../utils/messages';

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        // Function to fetch product details from the API
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${productId}`);
                if (!response.ok) {
                    throw new Error(errorMessages.fetchProductDetails);
                }
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                setError(errorMessages.fetchProductDetails);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    // Render product details or error message based on loading and error states
    if (!loading && !product) {
        return <div className="alert alert-info">{errorMessages.productNotFound}</div>;
    }

    return (
        <div className="container">
            <ErrorBoundary error={error}>
                {loading && <div className="alert alert-info">{loadingMessages.fetchProductDetails}</div>}
                {!loading && (
                    <div className="row d-flex justify-content-center align-items-center vh-100">
                        <div className="col-md-6">
                            <div className="card">
                                <img className="card-img-top" src={product.images[0]} alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text">Price: ${product.price}</p>
                                    {product.discountPercentage && (
                                        <p className="card-text">Discount: {product.discountPercentage}%</p>
                                    )}
                                    <p className="card-text">Rating: {product.rating}</p>
                                    <p className="card-text">Brand: {product.brand}</p>
                                    <p className="card-text">Category: {product.category}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </ErrorBoundary>
        </div>
    )
}

export default ProductDetails
