import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';
import NavigationBar from './NavigationBar';
import styled from 'styled-components';

import useDrawer from '@/hooks/useDrawer';
import { DRAWER_WIDTH } from '@/constants';

const Layout = () => {
  const { isOpened, toggleDrawer } = useDrawer();

  return (
    <Box>
      <NavigationBar isOpened={isOpened} />
      <Container openFlag={isOpened}>
        <Header toggleDrawer={toggleDrawer} />
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;

const Container = styled.main<{ openFlag: boolean }>`
  margin-left: ${({ openFlag }) => (openFlag ? `${DRAWER_WIDTH}px` : '0px')};
`;
