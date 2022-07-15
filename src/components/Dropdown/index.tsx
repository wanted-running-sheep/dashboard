import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useTotalDataManagement } from '@/api/models/useTotalDataManagement';
import changeOriginalDateFormat from '@/utils/changeOriginalDateFormat';

interface DropdownProps {
  getSpecificWeekData: (datesOfWeek: string[]) => void;
}

const Dropdown = ({ getSpecificWeekData }: DropdownProps) => {
  const { weekList, getTotalData } = useTotalDataManagement();

  useEffect(() => {
    getTotalData();
  }, []);

  const clickedWeekList = (event: React.MouseEvent<HTMLElement>) => {
    const selectedDate = event.currentTarget.textContent as string;
    getSpecificWeekData(changeOriginalDateFormat(selectedDate));
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
                <StyledMenuItem key={index} onClick={clickedWeekList}>
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
    /* left: 0px !important; */
  }
`;
const StyledMenuItem = styled(MenuItem)`
  font-size: 12px;
`;
export default Dropdown;
