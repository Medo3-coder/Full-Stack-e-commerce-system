import React, { useEffect, useState ,useContext } from 'react';
import axios from '../api/axios';
import {
    Container,
    Grid,
    TextField,
    Button,
    Typography,
    Box,
    Card,
    CardContent,
    CardActions,
    InputLabel,
    Select,
    Pagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ search: '', min_price: '', max_price: '', category: '' });
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [pagination, setPagination] = useState({});
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchProducts = async (page = 1) => {
        try {
            const response = await axios.get('/products', { params: { ...filters, page } });
            setProducts(response.data.data);
            setPagination({
                currentPage: response.data.current_page,
                totalPages: response.data.last_page,
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        const quantity = parseInt(quantities[product.id]) || 1;
        if (quantity < 1) return;

        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity } : item));
        } else {
            setCart([...cart, { ...product, quantity }]);
        }
    };

    const handleRemove = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const handleOrderSubmit = async () => {
        try {
            const items = cart.map(item => ({
                id: item.id,
                quantity: item.quantity,
            }));
            const response = await axios.post('/orders', { products: items });
            alert('Order placed successfully!');
            navigate(`/orders/${response.data.order_id}`);
        } catch (error) {
            alert('Order failed!');
        }
    };

    const handleSearch = () => {
        fetchProducts(1);
    };

    const handlePageChange = (event , value) => {
        fetchProducts(value);
    }

    return (
        <Container>
            <Box my={4}>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <Button variant="outlined" color="error" onClick={() => { logout(); navigate('/'); }}>
                        Logout
                    </Button>
                </Box>

                <Typography variant="h4" gutterBottom>Products</Typography>

                <Grid container spacing={2} mb={2}>
                    <Grid item xs={3}>
                        <TextField label="Search Name" fullWidth value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField label="Min Price" fullWidth value={filters.min_price} onChange={(e) => setFilters({ ...filters, min_price: e.target.value })} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField label="Max Price" fullWidth value={filters.max_price} onChange={(e) => setFilters({ ...filters, max_price: e.target.value })} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField label="Category" fullWidth value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" fullWidth onClick={handleSearch}>Filter</Button>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    {products.map(product => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{product.name}</Typography>
                                    <Typography>Price: ${product.price}</Typography>
                                    <Typography>Stock: {product.stock_quantity}</Typography>
                                </CardContent>
                                <CardActions>
                                    <TextField
                                        type="number"
                                        size="small"
                                        value={quantities[product.id] || ''}
                                        onChange={(e) =>
                                            setQuantities({ ...quantities, [product.id]: e.target.value })
                                        }
                                        label="Quantity"
                                    />
                                    <Button onClick={() => handleAddToCart(product)} variant="contained">Add</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box display="flex" justifyContent="center" mt={4}>
                    <Pagination
                        count={pagination.totalPages}
                        page={pagination.currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
                <Box mt={4}>
                    <Typography variant="h5">Cart</Typography>
                    {cart.length === 0 ? (
                        <Typography>No items in cart</Typography>
                    ) : (
                        <Box>
                            {cart.map(item => (
                                <Box key={item.id} display="flex" justifyContent="space-between" my={1}>
                                    <Typography>{item.name} x {item.quantity}</Typography>
                                    <Button color="error" onClick={() => handleRemove(item.id)}>Remove</Button>
                                </Box>
                            ))}
                            <Button variant="contained" color="primary" onClick={handleOrderSubmit}>Submit Order</Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default ProductPage;
