import React, { ReactNode } from 'react';
import { MANAGEMENT_STATUS, MANAGEMENT_STATUS_KOR_TO_ENG } from '@/constants';
import { InputType } from '@/utils/makeViewData';
import styled from 'styled-components';
import Dropdown from './Dropdown';

interface ManagementInputProps {
  title: string;
  /*   value: string;
  inputName: string;
  onChangeInput: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onlyNumber: boolean;
  isReadOnly: boolean; */
  children: ReactNode;
}

const ManagementInput = ({ title, children }: ManagementInputProps) => {
  return (
    <InputWrapper>
      <Label>{title}</Label>
      <InputContainer>
        {children}
        {/* <Input
          type="text"
          value={value || ''}
          onChange={onChangeInput}
          name={inputName}
          readOnly={isReadOnly}
        /> */}
        {/* {inputName === 'status' ? (
          <Dropdown
            dataList={Object.entries(MANAGEMENT_STATUS)}
            onChange={onChangeInput}
            name={inputName}
            defaultValue={MANAGEMENT_STATUS_KOR_TO_ENG[value]}
          />
        ) : (
          <Input
            type="text"
            value={value || ''}
            onChange={onChangeInput}
            name={inputName}
            readOnly={isReadOnly}
          />
        )} */}
      </InputContainer>
    </InputWrapper>
  );
};

export default ManagementInput;

const InputWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox()}
  display: flex;
  padding: 20px 0px 20px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border.lightgray};

  ${({ theme }) => theme.media.mobile`
    padding: 15px 0px;
  `}
`;

const Label = styled.label`
  width: 30%;
  min-width: 85px;
  color: ${({ theme }) => theme.color.font.lightgray};
  font-size: 13px;
`;

const InputContainer = styled.div`
  flex-grow: 1;
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
`;
