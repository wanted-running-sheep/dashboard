import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ManagementInputProps {
  title: string;
  children: ReactNode;
}

const ManagementInput = ({ title, children }: ManagementInputProps) => {
  return (
    <InputWrapper>
      <Label>{title}</Label>
      <InputContainer>{children}</InputContainer>
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
