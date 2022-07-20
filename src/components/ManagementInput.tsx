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
