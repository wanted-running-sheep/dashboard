import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTotalDataManagement } from '@/api/models/useTotalDataManagement';

const Dropdown = () => {
  const { weekList, getTotalData } = useTotalDataManagement();

  useEffect(() => {
    getTotalData();
  }, []);

  const clickedWeekList = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget.textContent);
  };

  return (
    <SelectList name="">
      <option>2022년03월07일 ~ 2022년03월13일</option>
      <option>2022년03월07일 ~ 2022년03월13일</option>
      <option>2022년03월07일 ~ 2022년03월13일</option>
    </SelectList>
  );
};

export default Dropdown;

const SelectList = styled.select`
  background: transparent;
  font-size: 15px;
  padding: 5px;
`;
