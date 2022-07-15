import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import NavigationBar from './NavigationBar';
import useDrawer from '@/hooks/useDrawer';

const Layout = () => {
  const { isOpened, toggleDrawer } = useDrawer();

  return (
    <Wrapper>
      <NavigationBar isOpened={isOpened} />
      <Content>
        <Header toggleDrawer={toggleDrawer} />
        <Outlet />
      </Content>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
`;
const Content = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.color.background.lightgray};
`;
