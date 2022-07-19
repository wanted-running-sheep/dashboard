import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MANAGEMENT_INPUT_TITLE } from '@/constants';
import getCommaLocalString from '@/utils/getCommaLocalString';
import styled from 'styled-components';
import ManagementInput from './ManagementInput';

interface ManagementFormProps {
  advertisement?: { [key: string]: string | number };
}
const ManagementForm = ({ advertisement }: ManagementFormProps) => {
  const isNewForm = !advertisement;
  const [requestValue, setRequestValue] = useState<{
    [key: string]: string;
  }>({});

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setRequestValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  console.log(requestValue);
  return (
    <Form>
      <FormTitle>
        <Input
          value={requestValue.title || ''}
          onChange={onChangeInput}
          placeholder="광고 제목"
          autoFocus={isNewForm}
          name="title"
        />
      </FormTitle>
      {Object.keys(MANAGEMENT_INPUT_TITLE).map((inputName, i) => {
        let title = MANAGEMENT_INPUT_TITLE[inputName];
        let value = !isNewForm && advertisement ? advertisement[inputName] : '';

        if (typeof value === 'number' && value > 10000)
          value = `${getCommaLocalString(Math.round(value / 10000))} 만원`;
        if (typeof value === 'number' && value < 10000)
          value = `${getCommaLocalString(Math.round(value))} 원`;

        return (
          <ManagementInput
            key={i}
            title={title}
            value={isNewForm ? requestValue[inputName] : (value as string)}
            inputName={inputName}
            onChangeInput={onChangeInput}
          />
        );
      })}

      <ButtonWrapper>
        <EditButton>수정하기</EditButton>
      </ButtonWrapper>
    </Form>
  );
};

export default ManagementForm;

const Form = styled.form`
  padding: 10px 40px 10px 40px;
  border: 1px solid ${({ theme }) => theme.color.border.lightgray};
  border-radius: 10px;
`;

const FormTitle = styled.div`
  padding: 40px 0px 40px 0px;
  font-weight: bold;
  font-size: 16px;

  border-bottom: 1px solid ${({ theme }) => theme.color.border.lightgray};
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  padding: 30px 0px 30px 0px;
`;

const EditButton = styled.button`
  padding: 10px 20px 10px 20px;
  background-color: ${({ theme }) => theme.color.background.white};
  border: 1px solid ${({ theme }) => theme.color.border.lightgray};
  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
`;
