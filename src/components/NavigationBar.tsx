import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BarChartIcon from '@mui/icons-material/BarChart';

import { DRAWER_WIDTH } from '@/constants';

interface NavigationBarProps {
  isOpened: boolean;
}

const ICON_WIDTH = 20;
const NavigationBar = ({ isOpened }: NavigationBarProps) => {
  const navigate = useNavigate();
  const navigationItems = [
    {
      Icon: QueryStatsIcon,
      title: '대시보드',
      onClickMenu: () => navigate('/dashboard'),
    },
    {
      Icon: BarChartIcon,
      title: '광고관리',
      onClickMenu: () => navigate('/management'),
    },
  ];

  return (
    <MenuDrawer $openflag={isOpened} variant="permanent">
      <List>
        {navigationItems.map(({ Icon, title, onClickMenu }) => {
          return (
            <ListItem key={title}>
              <MenuButton onClick={onClickMenu}>
                <Icon width={ICON_WIDTH} />
                <MenuName primary={title} />
              </MenuButton>
            </ListItem>
          );
        })}
      </List>
    </MenuDrawer>
  );
};

export default NavigationBar;

const MenuDrawer = styled(Drawer)<{ $openflag: boolean }>`
  & .MuiDrawer-paper {
    box-sizing: border-box;
    width: ${({ $openflag }) => {
      return $openflag ? `${DRAWER_WIDTH}px` : '0px';
    }};
  }
`;
const MenuName = styled(ListItemText)`
  width: 100%;
  margin-left: 10px;
`;
const MenuButton = styled(ListItemButton)`
  &:hover {
    color: ${({ theme }) => theme.color.font.lightblue};
  }
`;
