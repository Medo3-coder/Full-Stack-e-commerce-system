import React, { useState ,useContext} from 'react';
import axios from '../api/axios';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Paper,
  Link,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  marginTop: theme.spacing(8),
}));

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await axios.post('/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            navigate('/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <Container maxWidth="xs">
            <StyledPaper elevation={3}>
                <Box textAlign="center" mb={4}>
                    <Typography variant="h4" component="h1" color="primary" gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Sign in to access your account
                    </Typography>
                </Box>

                <Box mb={3}>
                    <TextField
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        error={!!error}
                        autoFocus
                    />
                </Box>

                <Box mb={3}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        margin="normal"
                        error={!!error}
                    />
                </Box>

                {error && (
                    <Box mb={2}>
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    </Box>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handleLogin}
                    disabled={loading}
                    sx={{ height: 48, mb: 2 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </Button>

                <Box textAlign="center" mt={2}>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <Link href="/register" underline="hover">
                            Sign up
                        </Link>
                    </Typography>
                    <Typography variant="body2">
                        <Link href="/forgot-password" underline="hover">
                            Forgot password?
                        </Link>
                    </Typography>
                </Box>
            </StyledPaper>
        </Container>
    );
};

export default LoginPage;
