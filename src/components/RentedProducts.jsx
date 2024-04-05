import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BlockIcon from '@mui/icons-material/Block';
import LensIcon from '@mui/icons-material/Lens';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useUser } from "../hooks/UserContext";
import axios from "axios";
import '../styles/OwnedProducts.css'

export const RentedProducts = () => {
    const [rentedProducts, setRentedProducts] = useState([]);
    const { user } = useUser();

    const fetchRentedProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BOOKING_SERVICE}/getRentedProductsByUserId`, {
                params: { userId: user.user_id }
            });
            setRentedProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching rented products:', error);
        }
    };

    useEffect(() => {
        if (user.user_id) {
            fetchRentedProducts();
        }
    }, [user.user_id]);

    const handleUpdateProductStatus = async (productId,transactionId, status) => {
        try {
            await axios.get(`${process.env.REACT_APP_BOOKING_SERVICE}/returnProduct?productId=${productId}&transactionId=${transactionId}`, {
                productId,
                transactionId
            });
            fetchRentedProducts();
            // Update UI to reflect new status
            setRentedProducts(rentedProducts.map(product =>
                product.id === productId ? { ...product, status } : product
            ));
        } catch (error) {
            console.error('Error updating product status:', error);
        }
    };

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="space-y-4"
        >
            <div className="flex md:flex-row container">
                {rentedProducts.map((productInfo) => (
                    <Card key={productInfo.product.id}
                          className={`max-w-md mx-auto manage-product-card ${productInfo.product.status === 'Inactive' ? 'opacity-50' : ''}`}>
                        <CardMedia
                            component="img"
                            image={productInfo.product.image}
                            alt={productInfo.product.title}
                            className='product-image-card'
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {productInfo.product.title}
                            </Typography>
                            <Typography variant="body2" className='pd-description' color="text.secondary" component="div">
                                {productInfo.product.description}
                            </Typography>
                            {productInfo.active === false && (
                                <div className="text-red-500">
                                    <LensIcon color="error" fontSize="small" /> Returned
                                </div>
                            )}
                            {productInfo.active === true && (
                                <div className="text-green-500">
                                    <LensIcon color="success" fontSize="small" /> Booked
                                </div>
                            )}
                        </CardContent>
                        <CardActions className="justify-center">
                            {productInfo.active === false && (
                                <Button size="small" color="secondary" >
                                    Rate Product
                                </Button>
                            )}
                            {productInfo.active === true && (
                                <Button size="small" color="secondary" onClick={()=>{handleUpdateProductStatus(productInfo.product.product_id,productInfo.transaction_id)}}>
                                    Return
                                </Button>
                            )}

                        </CardActions>
                    </Card>
                ))}
            </div>

        </motion.div>
    );
};
