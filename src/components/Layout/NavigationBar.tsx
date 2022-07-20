import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import styled from 'styled-components';

import { findClickedMenu } from '@/utils/findClickedMenu';
import { navigationList } from '@/routes';

interface NavigationBarProps {
  isOpened: boolean;
}
const NavigationBar = ({ isOpened }: NavigationBarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Drawer isOpened={isOpened}>
      <Title>
        광고<span>센터</span>
      </Title>
      {navigationList.map(({ Icon, title, path }) => (
        <MenuWrapper
          key={title}
          menuIndex={findClickedMenu(pathname)}
          onClick={() => navigate(path)}
        >
          <Icon />
          <span>{title}</span>
        </MenuWrapper>
      ))}
    </Drawer>
  );
};

export default NavigationBar;

const Drawer = styled.nav<{ isOpened: boolean }>`
  ${({ theme }) => theme.mixins.boxShadow()}
  width: 180px;
  height: 100%;
  padding: 20px 15px;
  display: ${({ isOpened }) => (isOpened ? 'block' : 'none')};

  ${({ theme }) => theme.media.mobile`
    width: 67px;
    padding: 20px 10px;
  `}
`;
const Title = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.color.font.lightgray};
  margin-bottom: 12px;
  line-height: 1.2em;
  span {
    display: inline-block;
  }
  ${({ theme }) => theme.media.mobile`
      text-align: center;
  `}
`;
const MenuWrapper = styled.div<{ menuIndex: number }>`
  display: flex;
  align-items: center;
  padding: 10px 10px;
  border-radius: 10px;
  cursor: pointer;

  &:nth-child(${({ menuIndex }) => menuIndex}) {
    background: ${({ theme }) => theme.color.background.lightgray};
    color: ${({ theme }) => theme.color.font.lightblue};
  }
  &:hover {
    color: ${({ theme }) => theme.color.font.darkblue};
  }
  span {
    margin-left: 7px;
    ${({ theme }) => theme.media.mobile`
      display: none;
    `}
  }
`;
