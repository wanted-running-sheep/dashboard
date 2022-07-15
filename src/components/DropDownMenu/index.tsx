import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useTotalDataManagement } from '@/api/models/useTotalDataManagement';

const DropDownMenu = () => {
  const { weekList, getTotalData } = useTotalDataManagement();

  useEffect(() => {
    getTotalData();
  }, []);

  const clickedWeekList = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget.textContent);
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Dashboard
          </Button>
          <StyledMenu {...bindMenu(popupState)}>
            {weekList.map((week, index) => {
              return (
                <StyledMenuItem
                  key={index}
                  onClick={clickedWeekList}
                  style={{ fontSize: '12px' }}
                >
                  {week}
                </StyledMenuItem>
              );
            })}
          </StyledMenu>
        </>
      )}
    </PopupState>
  );
};

const StyledMenu = styled(Menu)`
  height: 200px;
  div {
    left: 0px !important;
  }
`;
const StyledMenuItem = styled(MenuItem)`
  font-size: 14px;
`;
export default DropDownMenu;
