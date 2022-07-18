import React from 'react';
import styled from 'styled-components';

interface DropdownProps {
  getSpecificWeekData: (datesOfWeek: string) => void;
  weekList: string[];
}

const Dropdown = ({ getSpecificWeekData, weekList }: DropdownProps) => {
  const selectedWeekList = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDate = event.target.value;
    getSpecificWeekData(selectedDate);
  };

  return (
    <SelectList name="" onChange={selectedWeekList}>
      {weekList.map((week, index) => {
        return <option key={index}>{week}</option>;
      })}
    </SelectList>
  );
};

export default Dropdown;

const SelectList = styled.select`
  background: transparent;
  font-size: 15px;
  padding: 5px;
`;
