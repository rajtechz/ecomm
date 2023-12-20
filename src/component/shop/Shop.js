import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import hero_image from "../../assets/hero_image.png"
import p1 from "../../assets/p1.png"
import p2 from "../../assets/p2.png"
import p3 from "../../assets/p3.png"
import p4 from "../../assets/p4.png"
import Carousel from 'react-material-ui-carousel'
import './shop.css';

const items = [
    {
        image: p1,
        title: 'Item 1',
        description: 'Description for Item 1',
    },
    {
        image: p2,
        title: 'Item 2',
        description: p3,
    },
    {
        image: p4,
        title: 'Item 3',
        description: 'Description for Item 3',
    },
];

export default function Shop() {
    const imageStyle = {
        maxWidth: '100%',
        height: '300px',
        objectFit: 'cover',
    };
    const hero = {
        maxWidth: '100%',
        height: '400px',
        objectFit: 'cover',
    }
    return (
        <>
            <Container maxWidth="xl" >
                <Paper sx={{
                    background: 'var(--color-bg-variant)',
                    p: 3
                }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <Stack>

                                <Typography variant='h2' className='mainText'>
                                    New
                                </Typography>
                                <Typography variant='h2' className='mainText'>
                                    Collection
                                </Typography>
                                <Typography variant='h2' className='mainText'>
                                    For everyone
                                </Typography>
                                <Box p={3}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            borderRadius: "20px",
                                            backgroundColor: "var(--color3)",
                                            color: "black",
                                            fontWeight: 700,
                                            '&:hover': {
                                                backgroundColor: "black",
                                                color: "#fff"
                                            },
                                        }}
                                    >
                                        Latest collection
                                    </Button>
                                </Box>
                            </Stack>

                        </Grid>
                        <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <img src={hero_image} alt="" style={hero} />
                        </Grid>
                    </Grid>
                </Paper>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper elevation={3} style={{ padding: 16 }}>
                            <Typography variant="body1">Main Content</Typography>
                            <img src={p1} alt="" style={imageStyle} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper elevation={3} style={{ padding: 16 }}>
                            <Typography variant="body1">Main Content</Typography>
                            <img src={p2} alt="" style={imageStyle} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper elevation={3} style={{ padding: 16 }}>
                            <Typography variant="body1">Additional Content</Typography>
                            <img src={p3} alt="" style={imageStyle} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper elevation={3} style={{ padding: 16 }}>
                            <Typography variant="body1">Additional Content</Typography>
                            <img src={p4} alt="" style={imageStyle} />
                        </Paper>
                    </Grid>
                </Grid>
                <Carousel>
                    {
                        items.map((item, index) => {
                            return (
                                <Box>
                                    <img src={item.image} alt="" />
                                </Box>
                            )
                        })
                    }
                </Carousel>
            </Container>
        </>
    )
}
