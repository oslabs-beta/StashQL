import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom';
import logo from '../images/logo1.png';
import {FaBars} from 'react-icons/fa';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaNpm } from "react-icons/fa";

const pages = ['Home', 'Docs', 'Demo', 'Team'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (

    <AppBar style={{ position: 'static', background: '#fefaf6', boxShadow: 'none'}} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color:'#9A51F7' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{textDecoration: "none", color: "black"}} to={`/${page}`}>
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link style={{textDecoration: "none", color: "black"}} to={`/${page}`}>
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1.5, display: { xs: 'none', md: 'flex' }}}>
            <Avatar alt="Remy Sharp" src={logo} style={{width: '125px'}} />
          </Box>

          <Box display={'flex'} style={{alignItems: 'center', gap: '10px'}}> 
            <TwitterIcon style={{color: 'black'}}/>
            <LinkedInIcon style={{color: 'black'}}/>
            <FaNpm style={{color: '#CC3534', fontSize: '35px'}}/>
            {/* <FontAwesomeIcon style={{color: 'black'}} icon={fanpm}></FontAwesomeIcon> */}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 