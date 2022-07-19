import React from 'react';
import styled from 'styled-components';

interface ManagementInputProps {
  title: string;
  value: string;
}

const ManagementInput = ({ title, value }: ManagementInputProps) => {
  return (
    <InputWrapper>
      <Label>{title}</Label>
      <InputContainer>
        <Input type="text" value={value} />
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
`;

const InputContainer = styled.div`
  flex-grow: 1;
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
`;
