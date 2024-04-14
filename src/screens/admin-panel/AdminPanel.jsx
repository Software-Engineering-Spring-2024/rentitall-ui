import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from '@mui/icons-material/Cancel';
import * as PropTypes from "prop-types";
import '../../styles/AdminPanel.css'


CancelIcon.propTypes = { style: PropTypes.shape({ color: PropTypes.string }) };
export const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedCities, setSelectedCities] = useState({}); // Tracks selected locations for each product

    const fetchProducts = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_ADMIN_SERVICE + "/getUnApprovedProducts");
            console.log('/getUnApprovedProducts', response.data);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    };
    const getProducts = async () => {
        const productList = await fetchProducts();
        setProducts(productList);
    };

    const fetchStoreLocations = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_ADMIN_SERVICE + "/getStoreLocations");
            console.log('/getStoreLocations', response.data);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching store locations:', error);
            return [];
        }
    }

    const getStoreLocations = async () => {
        const locationsList = await fetchStoreLocations();
        setLocations(locationsList)
    }

    useEffect(() => {
        getStoreLocations()
        getProducts();
    }, []);

    const handleCityChange = (productId, city) => {
        setSelectedCities(prev => ({ ...prev, [productId]: city }));
    };
    const handleApprove = async (productId) => {
        try {
            const selectedCity = selectedCities[productId];
            if (!selectedCity) {
                alert('Please select a city before approving.');
                return;
            }
            const response = await axios.get(process.env.REACT_APP_ADMIN_SERVICE+ "/approve?productId=" +productId+"&locationId="+selectedCity);
            console.log(response.data);
            await getProducts();
        } catch (error) {
            console.error('Error Approving products:', error);
            return [];
        }
    };
    const handleReject = async (productId) => {
        try {
            const response = await axios.get(process.env.REACT_APP_ADMIN_SERVICE + "/reject?productId=" + productId);
            console.log(response.data);
            await getProducts();
        } catch (error) {
            console.error('Error Rejecting products:', error);
            return [];
        }
    };

    return (
        <div className="bg-dark-teal min-h-screen py-10">
            <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
                <h1 className="text-4xl font-bold mb-8 text-center text-white">Products Approval</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {Array.isArray(products) && products.map((product) => (
                        <motion.div
                            key={product.product_id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col bg-white rounded-xl overflow-hidden shadow-md transition duration-300 ease-in-out"
                            style={{ minHeight: '350px' }} // Ensures consistency in card size
                        >
                            <img
                                className="w-full object-cover"
                                style={{ height: '160px' }} // Adjusted for aspect ratio
                                src={product.image}
                                alt={product.title}
                            />
                            <div className="p-4 flex-grow">
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{product.title}</h3>
                                <div
                                    className="text-gray-700 text-sm mb-3"
                                    style={{ maxHeight: '4rem', overflowY: 'scroll' }} // Scrollable description
                                >
                                    {product.description}
                                </div>
                                <p className="text-gray-600">Price/day: <span
                                    className="font-semibold">${product.price_per_day}</span></p>
                                <p className="text-gray-600">Owner: <span
                                    className="font-semibold capitalize">{product.owner.firstName} {product.owner.lastName}</span>
                                </p>
                                <select
                                    value={selectedCities[product.product_id] || ''}
                                    onChange={(e) => handleCityChange(product.product_id, e.target.value)}
                                    className=" mt-2 p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                >
                                    <option value="" disabled>Select a city</option>
                                    {locations.map((location) => (
                                        <option key={location.id} value={location.id}>{location.city}</option>
                                    ))}
                                </select>
                            </div>
                            <CardActions className="justify-around pb-4">
                                <IconButton
                                    onClick={() => handleApprove(product.product_id)}
                                    // style={{ backgroundColor: 'green', marginRight: '8px' }} // Green background
                                    aria-label="approve"
                                >
                                    <CheckCircleIcon className='approve' />
                                </IconButton>
                                <IconButton
                                    onClick={() => handleReject(product.product_id)}
                                    // style={{ backgroundColor: "red" }} // Red background
                                    aria-label="reject"
                                >
                                    <CancelIcon className='reject' />
                                </IconButton>
                            </CardActions>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
