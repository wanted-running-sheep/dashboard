import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import useDrawer from '@/hooks/useDrawer';
import Header from './Header';
import NavigationBar from './NavigationBar';

const Layout = () => {
  const { isOpened, toggleDrawer } = useDrawer();

  return (
    <Wrapper>
      <NavigationBar isOpened={isOpened} />
      <Content>
        <Header toggleDrawer={toggleDrawer} />
        <Article>
          <Outlet />
        </Article>
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
  padding: 0px 20px;
`;
const Article = styled.article`
  box-sizing: border-box;
  padding: 20px;
  height: calc(100% - 55px);
  overflow-y: auto;
`;
