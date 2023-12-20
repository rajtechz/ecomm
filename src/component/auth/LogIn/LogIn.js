import React, { useState } from 'react';

import {
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box,
    FormHelperText,

} from '@mui/material';
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const backendUrl = "hero";
export default function SignIn({ onLogin }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [userError, setUserError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const navigate = useNavigate();
    const validateUser = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@(wtf\.digital|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})$/;
        if (!emailRegex.test(email)) {
            setUserError("Invalid email format.");
            return false;
        }
        setUserError("");
        return true;
    };
    const validatePassword = (pwd) => {
        if (pwd.length < 6) {
            setPasswordError("Password should be at least 6 characters long.");
            return false;
        }
        setPasswordError("");
        return true;
    };
    const handleLogin = (e) => {
        e.preventDefault();
        const isUserValid = validateUser(user);
        const isPasswordValid = validatePassword(password);
        if (!isUserValid || !isPasswordValid) {
            return;
        }
        const data = {
            email: user,
            password: password
        };
        axios.post(`${backendUrl}/api/auth/login`, data)
            .then((response) => {
                console.log(response)
                if (response.data.success === true) {
                    const userTokenTosave = response.data.accessToken;
                    localStorage.setItem('authorization', userTokenTosave);
                    onLogin();
                    navigate("/dashboard/analytics");
                }
            })
            .catch((error) => {
                console.log(error)
                const errorMessage = error.response
                    ? error.response.data.message
                    : 'An error occurred';
                console.error(errorMessage);
                toast.error(errorMessage)
            });
    };
    return (
        <Container style={containerStyle}>
            <Toaster />
            <Card style={cardStyle}>
                <CardContent>
                    <Box mb={2}>
                        <Typography
                            variant="h5"
                            align="center"
                            gutterBottom
                            sx={{ fontWeight: 700, color: '#black' }}>
                            Log in
                        </Typography>
                    </Box>
                    <form style={formStyle} onSubmit={handleLogin}>
                        <TextField
                            placeholder="Email"
                            fullWidth
                            value={user}
                            error={Boolean(userError)}
                            helperText={userError}
                            onChange={(e) => {
                                setUser(e.target.value);
                                validateUser(e.target.value);
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: "#279d85",
                                },
                            }}
                        />
                        <FormControl sx={{
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: "#279d85",
                            },
                        }} variant="outlined" error={Boolean(passwordError)}>
                            <OutlinedInput
                                placeholder='password'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validatePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText>{passwordError}</FormHelperText>
                        </FormControl>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Link to="/resetPassword" underline="none" style={{ textAlign: "end", fontWeight: "bold", color: "black", }}>Forgot Password</Link>
                        </Box>
                        <Button
                            type='submit'
                            variant="contained"
                            onClick={handleLogin}
                            fullWidth
                            sx={{
                                p: 2,
                                backgroundColor: "black",
                                color: "#fff",
                                fontWeight: 700,
                                '&:hover': {
                                    backgroundColor: "black",
                                    color: "#fff"
                                },
                            }}
                        >
                            Login
                        </Button>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography>Don't have an account? <Link to="/signup"> <span style={{ fontWeight: "bold", color: 'rgb(52, 71, 103)' }}> Sign up </span> </Link></Typography>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}
const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
};
const cardStyle = {
    width: '500px',
    padding: '16px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
};
const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
};


