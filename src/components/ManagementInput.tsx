import { MANAGEMENT_STATUS } from '@/constants';
import { InputType } from '@/utils/makeViewData';
import React from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';

interface ManagementInputProps {
  title: string;
  value: string;
  inputName: string;
  onChangeInput: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  isNewForm: boolean;
  onlyNumber: boolean;
}

const ManagementInput = ({
  title,
  value,
  inputName,
  onChangeInput,
  isNewForm,
}: ManagementInputProps) => {
  return (
    <InputWrapper>
      <Label>{title}</Label>
      <InputContainer>
        {isNewForm && inputName === 'status' ? (
          <Dropdown
            dataList={Object.entries(MANAGEMENT_STATUS)}
            onChange={onChangeInput}
          />
        ) : (
          <Input
            type="text"
            value={value || ''}
            onChange={onChangeInput}
            name={inputName}
            readOnly={!isNewForm}
          />
        )}
      </InputContainer>
    </InputWrapper>
  );
};

export default ManagementInput;

const InputWrapper = styled.div`
  display: flex;
  padding: 20px 0px 20px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border.lightgray};
`;

const Label = styled.label`
  width: 30%;
  color: ${({ theme }) => theme.color.font.lightgray};
  font-size: 14px;
`;

const InputContainer = styled.div`
  flex-grow: 1;
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
`;
