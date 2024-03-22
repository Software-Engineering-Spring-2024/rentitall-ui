import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const RentedProducts = () => {
    const [rentedProducts, setRentedProducts] = useState([]);

    useEffect(() => {
        // Placeholder for fetching rented products
        const fetchRentedProducts = async () => {
            // Replace this URL with your actual endpoint
            const response = await fetch('/api/rented-products');
            const data = await response.json();
            setRentedProducts(data);
        };

        fetchRentedProducts();
    }, []);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
            }}
            className="space-y-4"
        >
            {rentedProducts.map((product) => (
                <Card key={product.id} className="max-w-md mx-auto">
                    <CardMedia
                        component="img"
                        height="140"
                        image={product.image}
                        alt={product.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            View
                        </Button>
                        <Button size="small" color="primary">
                            Manage
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </motion.div>
    );
};
