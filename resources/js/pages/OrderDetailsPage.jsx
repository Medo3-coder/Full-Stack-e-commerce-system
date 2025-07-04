import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

const OrderDetailsPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`/orders/${id}`);
                setOrder(response.data);
            } catch (err) {
                alert('Error loading order');
            }
        };

        fetchOrder();
    }, [id]);

    if (!order) return <p>Loading...</p>;

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4">Order #{order.id}</Typography>
                <Typography variant="h6">Total: ${order.total}</Typography>
                <Box mt={2}>
                    {order.products.map(product => (
                        <Box key={product.id} my={1}>
                            <Typography>
                                {product.name} - {product.pivot.quantity} x ${product.pivot.price_at_order}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

export default OrderDetailsPage;
