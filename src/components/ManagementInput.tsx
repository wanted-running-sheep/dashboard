import React, { useState, memo } from 'react';
import styled from 'styled-components';

interface ManagementInputProps {
  title: string;
  value: string;
  inputName: string;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ManagementInput = ({
  title,
  value,
  inputName,
  onChangeInput,
}: ManagementInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  return (
    <InputWrapper>
      <Label>{title}</Label>
      <InputContainer>
        <Input
          type="text"
          value={inputValue}
          onChange={onChangeInput}
          name={inputName}
        />
      </InputContainer>
    </InputWrapper>
  );
};

export default memo(ManagementInput);

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
