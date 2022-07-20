import React, { useState } from 'react';
import styled from 'styled-components';

import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircle from '@mui/icons-material/AccountCircle';

interface HeaderProps {
  toggleDrawer: () => void;
}
const Header = ({ toggleDrawer }: HeaderProps) => {
  return (
    <AppBar>
      <MenuIcon onClick={toggleDrawer} />
      <RightIconWrapper>
        <NotificationsNoneIcon />
        <SettingsIcon />
        <AccountCircle />
      </RightIconWrapper>
    </AppBar>
  );
};

export default Header;

const AppBar = styled.header`
  ${({ theme }) => theme.mixins.flexBox('center', 'space-between')}
  height: 55px;
  width: 100%;
  padding: 10px 20px;
  border-bottom: 1px solid #d1d1d1;
  color: ${({ theme }) => theme.color.font.primary};

  svg:hover {
    color: ${({ theme }) => theme.color.font.lightblue};
  }
  ${({ theme }) => theme.media.tablet`
    padding: 10px 5px;
  `}
`;
const RightIconWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox('center', 'space-between')}
  width: 100px;
`;
