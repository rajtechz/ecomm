import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, TextField, Button, Box, FormHelperText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
const backendUrl = "hero";
const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: "100vw"
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

export default function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Validation errors state
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = event => event.preventDefault();
    const handleClickShowConPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownConPassword = event => event.preventDefault();

    // Validation functions
    const validateName = name => {
        if (!name.trim()) {
            setNameError("Name is required.");
            return false;
        }
        setNameError("");
        return true;
    };

    const validateEmail = email => {
        // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@(wtf\.digital|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})$/;
        if (!emailRegex.test(email)) {
            setEmailError("Invalid email format.");
            return false;
        }
        setEmailError("");
        return true;
    };

    const validatePassword = password => {
        if (password.length < 6) {
            setPasswordError("Password should be at least 6 characters long.");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            return false;
        }
        setConfirmPasswordError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        const isNameValid = validateName(userName);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = validateConfirmPassword(password, confirmPassword);

        if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
            return;
        }

        const formData = {
            name: userName,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };

        try {
            const response = await axios.post(`${backendUrl}/api/auth/register`, formData);
            console.log(response)
            
            if (response.statusText === "OK") { 
                navigate("/");
            }
        } catch (error) {
            
            console.error('Registration error:', error);
            const errorMessage = error.response
            ? error.response.data.message
            : 'An error occurred';
       
        toast.error(errorMessage)
        }
    };

    return (
        <Container style={containerStyle}>
            <Toaster/>
            <Card style={cardStyle}>
                <CardContent>
                  
                    <Box mb={2}>
                        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 700, color: 'black' }}>
                            Register
                        </Typography>
                    </Box>
                    <form style={formStyle} onSubmit={handleSubmit}>
                        <TextField
                            placeholder="Name"
                            fullWidth
                            value={userName}
                            error={Boolean(nameError)}
                            helperText={nameError}
                            onChange={(e) => {
                                setUserName(e.target.value);
                                validateName(e.target.value);
                            }}
                        />
                        <TextField
                            placeholder="Email"
                            fullWidth
                            value={email}
                            error={Boolean(emailError)}
                            helperText={emailError}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateEmail(e.target.value);
                            }}
                        />
                        <FormControl variant="outlined">
                            <OutlinedInput
                                value={password}
                                error={Boolean(passwordError)}
                                helperText={passwordError}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validatePassword(e.target.value);
                                }}
                                placeholder='Password'
                                type={showPassword ? 'text' : 'password'}
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
                            <FormHelperText sx={{ color: "#d32f2f" }}>{passwordError}</FormHelperText>
                        </FormControl>
                        <FormControl variant="outlined">
                            <OutlinedInput
                                value={confirmPassword}
                                error={Boolean(confirmPasswordError)}
                                helperText={confirmPasswordError}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    validateConfirmPassword(password, e.target.value);
                                }}
                                placeholder='Confirm Password'
                                type={showConfirmPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConPassword}
                                            onMouseDown={handleMouseDownConPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText sx={{ color: "#d32f2f" }}>{confirmPasswordError}</FormHelperText>
                        </FormControl>
                        <Button
                            type='submit'
                            variant="contained"
                            fullWidth
                            sx={{
                                p: 2,
                                // borderRadius: "20px",
                                backgroundColor: "black",
                                color: "#fff",
                                fontWeight: 700,
                                '&:hover': {
                                    backgroundColor: "black",
                                    color: "#fff"
                                },
                            }}
                        >
                            signup
                        </Button>


                        <Box sx={{ textAlign: "center" }}>
                            <Typography>  Already have an account?  <Link to="/login"> <span style={{ fontWeight: "bold", color: 'rgb(52, 71, 103)' }}> Login</span> </Link></Typography>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}
