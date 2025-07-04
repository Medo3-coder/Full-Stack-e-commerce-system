import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Divider,
    List,
    ListItem,
    ListItemText,
    Avatar,
    Grid,
    Paper
} from '@mui/material';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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

    if (!order) return <Box mt={6} textAlign="center"><Typography>Loading...</Typography></Box>;

    return (
        <Container maxWidth="sm">
            <Box my={5}>
                <Paper elevation={4} sx={{ borderRadius: 3, p: 3 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            {/* <ShoppingCartIcon /> */}
                        </Avatar>
                        <Typography variant="h4" fontWeight="bold">
                            Order #{order.id}
                        </Typography>
                    </Box>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        Total: <b>${order.total}</b>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        Products
                    </Typography>
                    <List>
                        {order.products.map(product => (
                            <ListItem key={product.id} sx={{ px: 0 }}>
                                <ListItemText
                                    primary={
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography fontWeight="medium">{product.name}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography color="text.secondary">
                                                    x{product.pivot.quantity}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography color="primary">
                                                    ${product.pivot.price_at_order}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
        </Container>
    );
};

export default OrderDetailsPage;
