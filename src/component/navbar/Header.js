import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Container, Drawer, Hidden, ListItemText, MenuList, Stack } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledListItemText = styled(ListItemText)({
  '&.active': {
    borderBottom: '2px solid black',
  },
});

export default function Header() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 3 }}  >
      <AppBar position="static" sx={{ background: "var(--color-bg)" }}>
        <Container maxWidth="xl">
          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Hidden lgUp>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Box>
              <Typography
                variant="h6"
                component="div"
              >
                Logo
              </Typography>
            </Box>
            <Stack direction="row">
              <Hidden mdDown>
                <MenuList sx={{ display: "flex" }} className='navItem'>
                  <MenuItem component={Link} to="/" className='navItem'>
                    <StyledListItemText className={location.pathname === '/' ? 'active' : ''}>Shop</StyledListItemText>
                  </MenuItem>
                  <MenuItem component={Link} to="/men">
                    <StyledListItemText className={location.pathname === '/men' ? 'active' : ''}>Men</StyledListItemText>
                  </MenuItem>
                  <MenuItem component={Link} to="/women">
                    <StyledListItemText className={location.pathname === '/women' ? 'active' : ''}>Women</StyledListItemText>
                  </MenuItem>
                  <MenuItem component={Link} to="/kids">
                    <StyledListItemText className={location.pathname === '/kids' ? 'active' : ''}>Kids</StyledListItemText>
                  </MenuItem>
                </MenuList>
              </Hidden>
            </Stack>
            <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <Box >
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: "black",
                    color: "#fff",
                    fontWeight: 700,
                    '&:hover': {
                      backgroundColor: "#FFF",
                      color: "black"
                    },
                  }}
                >
                  Login
                </Button>
              </Box>
            </Stack>

          </Box>
        </Container>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ width: '400px' }}
      >
        <MenuList className='navItem'>
          <MenuItem component={Link} to="/" className='navItem' onClick={toggleDrawer}>
            <StyledListItemText className={location.pathname === '/' ? 'active' : ''}>Shop</StyledListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/men" onClick={toggleDrawer}>
            <StyledListItemText className={location.pathname === '/men' ? 'active' : ''}>Men</StyledListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/women" onClick={toggleDrawer}>
            <StyledListItemText className={location.pathname === '/women' ? 'active' : ''}>Women</StyledListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/kids" onClick={toggleDrawer}>
            <StyledListItemText className={location.pathname === '/kids' ? 'active' : ''}>Kids</StyledListItemText>
          </MenuItem>
        </MenuList>
      </Drawer>
    </Box>
  );
}