import React from 'react';
import styled from 'styled-components';

interface DropdownProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  dataList: string[] | [string, string][];
  defaultValue?: string;
  optionValue?: string;
  name?: string;
}

const Dropdown = ({
  onChange,
  dataList,
  name = '',
  defaultValue = '',
}: DropdownProps) => {
  return (
    <SelectList name={name} onChange={onChange} defaultValue={defaultValue}>
      {dataList.map((data, index) => {
        let optionTitle = data;
        let optionVal = data;

        if (Array.isArray(data)) {
          const [val, title] = data;
          optionTitle = title;
          optionVal = val;
        }

        return (
          <option key={index} value={optionVal}>
            {optionTitle}
          </option>
        );
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
