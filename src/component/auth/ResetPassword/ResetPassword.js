import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [user, setUser] = useState("");
  const [changeText, setText] = useState('Send OTP');

  const [otpSent, setOtpSent] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    if (user !== "" && user !== null) {
      setOtpSent(true)
      setText('Enter OTP')
    }
  }
  return (
    <Container style={containerStyle}>
      <Card style={cardStyle}>
        <CardContent>
          <Box mb={2}>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ fontWeight: 700, color: '#279d85'  }}
            >
              Reset Password
            </Typography>
          </Box>
          <form style={formStyle} onSubmit={handleReset}>
            {otpSent ?
              <TextField
                label="Enter OTP"
                variant="outlined"
                fullWidth
                value=""
                onChange={(e) => null}
              />
              : <TextField
                placeholder="Email"
                fullWidth
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />}
         
            <Button
              type='submit'
              variant="contained"
              fullWidth
              sx={{
                background: "#279d85",
                // 'linear-gradient(310deg, rgb(20, 23, 39), rgb(58, 65, 111))',
                color: 'white',
                padding: '0.75rem 1.5rem',
                boxShadow:
                  'rgba(0, 0, 0, 0.11) 0rem 0.25rem 0.4375rem -0.0625rem, rgba(0, 0, 0, 0.07) 0rem 0.125rem 0.25rem -0.0625rem',
                '&:hover': {
                  background: "#279d85", // Explicitly set the hover background color to be the same as the default
                  boxShadow:
                    'rgba(0, 0, 0, 0.11) 0rem 0.25rem 0.4375rem -0.0625rem, rgba(0, 0, 0, 0.07) 0rem 0.125rem 0.25rem -0.0625rem', // If you want the same shadow on hover
                },
              }}
            >
                 {otpSent ? "Verify OTP" : changeText}
            </Button>
            {otpSent ? '' : <Link to="/"  style={{textAlign:"center", fontWeight: "bold", color: 'rgb(52, 71, 103)' }}>Back to login</Link>}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  width: "100vw",
};
const cardStyle = {
  width: "500px",
  padding: "16px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  borderRadius: "8px",
};
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

export default ResetPassword;
