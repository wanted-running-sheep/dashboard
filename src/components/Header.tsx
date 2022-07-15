import React, { useState } from 'react';
import styled from 'styled-components';

import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MuiIconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircle from '@mui/icons-material/AccountCircle';

interface HeaderProps {
  toggleDrawer: () => void;
}
const Header = ({ toggleDrawer }: HeaderProps) => {
  const [isAnchor, setIsAnchor] = useState(false);

  const handleAnchorMenu = () => {
    setIsAnchor((previewAnchor) => !previewAnchor);
  };

  return (
    <Box>
      <AppBar>
        <Toolbar
          variant="dense"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex' }}>
            <IconButton size="large">
              <NotificationsNoneIcon />
            </IconButton>
            <IconButton size="large">
              <SettingsIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleAnchorMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={isAnchor}
              onClose={handleAnchorMenu}
            >
              <MenuItem>프로필</MenuItem>
              <MenuItem>내 계정</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

const IconButton = styled(MuiIconButton)`
  color: ${({ theme }) => theme.color.font.primary};
  &:hover {
    color: ${({ theme }) => theme.color.font.lightblue};
  }
`;

const AppBar = styled(MuiAppBar)`
  position: static;
  background-color: ${({ theme }) => theme.color.background.primary};
`;
