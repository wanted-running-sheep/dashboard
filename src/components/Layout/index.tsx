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
      <Content isOpened={isOpened}>
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
const Content = styled.section<{ isOpened: boolean }>`
  background: ${({ theme }) => theme.color.background.lightgray};
  padding: 0px 20px;
  width: ${({ isOpened }) => (isOpened ? 'calc(100% - 180px)' : '100%')};

  ${({ theme, isOpened }) => theme.media.mobile`
    padding: 0px 10px;
    width: ${isOpened ? 'calc(100% - 67px)' : '100%'};
  `}
`;
const Article = styled.article`
  box-sizing: border-box;
  padding: 20px;
  height: calc(100% - 55px);
  overflow-y: auto;
  ${({ theme }) => theme.mixins.noScrollBar}

  ${({ theme }) => theme.media.tablet`
    padding: 7px;
  `}
`;
