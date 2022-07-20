import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { findClickedMenuTitle } from '@/utils/findClickedMenu';

interface TitleProps {
  children?: ReactNode;
}
const Title = ({ children }: TitleProps) => {
  const { pathname } = useLocation();
  return (
    <Wrapper>
      <h1>{findClickedMenuTitle(pathname)}</h1>
      {children ? children : <></>}
    </Wrapper>
  );
};

export default Title;

const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox('center', 'space-between')};
  padding: 15px 0px 40px 0px;

  ${({ theme }) => theme.media.tablet`
    display: block;
    padding: 20px 0px 30px 0px;
    h1{
      padding-bottom: 3px;
    }
  `};

  h1 {
    color: ${({ theme }) => theme.color.font.primary};
    font-weight: 700;
    font-size: 27px;

    ${({ theme }) => theme.media.mobile`
      font-size: 22px;
    `}
  }
`;
