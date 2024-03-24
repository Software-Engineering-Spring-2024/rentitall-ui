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

export const OwnedProducts = () => {
    const [ownedProducts, setOwnedProducts] = useState([]);
    const { user } = useUser();

    const fetchOwnedProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_PRODUCT_SERVICE}/getProductsByUserId`, {
                params: { userId: user.user_id }
            });
            setOwnedProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching owned products:', error);
        }
    };

    useEffect(() => {
        if (user.user_id) {
            fetchOwnedProducts();
        }
    }, [user.user_id]);

    const handleUpdateProductStatus = async (productId, status) => {
        try {
            await axios.get(`${process.env.REACT_APP_PRODUCT_SERVICE}/set-active-status?productId=${productId}&status=${status}`, {
                productId,
                status
            });
            fetchOwnedProducts();
            // Update UI to reflect new status
            setOwnedProducts(ownedProducts.map(product =>
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
            <div className="flex md:flex-row">
                {ownedProducts.map((product) => (
                    <Card key={product.id}
                          className={`max-w-md mx-auto product-card ${product.status === 'Inactive' ? 'opacity-50' : ''}`}>
                        <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.title}
                            className='product-image-card'
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.title}
                            </Typography>
                            <Typography variant="body2" className='pd-description' color="text.secondary">
                                {product.description}
                            </Typography>
                            {product.status === 'Rejected' && (
                                <div className="text-red-500">
                                    <LensIcon color="error" fontSize="small" /> Rejected
                                </div>
                            )}
                            {product.status === 'Booked' && (
                                <div className="text-green-500">
                                    <LensIcon color="success" fontSize="small" /> Booked
                                </div>
                            )}
                            {product.status === 'Active' && (
                                <div className="text-grey">
                                    <LensIcon color='grey' fontSize="small" /> Active
                                </div>
                            )}
                            {product.status === 'Inactive' && (
                                <div className="text-grey">
                                    <LensIcon color='grey' fontSize="small" /> Inactive
                                </div>
                            )}
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">
                                View
                            </Button>
                            <Button size="small" color="primary">
                                Manage
                            </Button>
                            {product.status === 'Inactive' ? (
                                <IconButton size="small" color="primary" onClick={() => handleUpdateProductStatus(product.product_id, 'Active')}>
                                    <CheckCircleIcon /> {/* Enable icon */}
                                </IconButton>
                            ) : (
                                <IconButton size="small" color="secondary" onClick={() => handleUpdateProductStatus(product.product_id, 'Inactive')}>
                                    <BlockIcon /> {/* Disable icon */}
                                </IconButton>
                            )}
                        </CardActions>
                    </Card>
                ))}
            </div>

        </motion.div>
    );
};
