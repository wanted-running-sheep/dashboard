import React, {ReactNode} from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {Box, AppBar, Toolbar, Menu, List, ListItem} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiListItemText from '@mui/material/ListItemText';
import MuiListItemButton from '@mui/material/ListItemButton';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BarChartIcon from '@mui/icons-material/BarChart';
import Header from '@/components/Header';

interface LayoutProps {
  children: ReactNode;
}

const drawerWidth = 200;
const Layout = ({children}: LayoutProps) => {
  return (
    <Box>
      <Header />
      
      <Drawer variant="permanent" open={true}>
        <List>
          <ListItem>
            <ListItemButton>
              <QueryStatsIcon />
              <ListItemText primary={'대시보드'}/>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <BarChartIcon/>
              <ListItemText primary={'광고관리'}/>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Menu open={false}>
            
      </Menu>
    </Box>
  )
}

export default Layout;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});
const Drawer = styled(MuiDrawer)(
  ({ theme }) => ({
    '& .MuiDrawer-paper': openedMixin(theme),
  })
);

const ListItemText = styled(MuiListItemText) `
  margin-left: 10px;
`;
const ListItemButton = styled(MuiListItemButton)`
  &:hover{  
    color: #7282F3;
  }
`;