import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  MANAGEMENT_INPUT_TITLE,
  MANAGEMENT_STATUS_KOR_TO_ENG,
} from '@/constants';
import getCommaLocalString from '@/utils/getCommaLocalString';
import styled from 'styled-components';
import ManagementInput from './ManagementInput';
import { useAdvertisementModel } from '@/api/models/useAdvertisementModel';
import { AdvertisementDataType, AdvertisementUpdateDataType } from 'request';

interface ManagementFormProps {
  advertisement?: AdvertisementDataType;
  isNewForm: boolean;
}

const ManagementForm = ({ advertisement, isNewForm }: ManagementFormProps) => {
  const [title, setTitle] = useState(advertisement ? advertisement.title : '');
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [requestValue, setRequestValue] = useState<AdvertisementDataType>({
    ...advertisement,
  });
  const { patchAdvertisements } = useAdvertisementModel();

  const titleRef = useRef<HTMLInputElement>(null);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setRequestValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const clickedEditAndCacnelButton = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsReadOnly((prevState) => !prevState);
  };

  const getNumberWithoutPercent = (strValue: string | number): number => {
    return Number(String(strValue).split(' ')[0]);
  };

  const clickedEditCompleteButton = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    // 데이터 가공 필요
    const requestData: AdvertisementUpdateDataType = {
      id: Number(requestValue.id),
      title: String(requestValue.title),
      status: MANAGEMENT_STATUS_KOR_TO_ENG[requestValue.status],
      budget: Number(requestValue.budget),
      startDate: String(requestValue.startDate),
      report: {
        cost: Number(requestValue.cost),
        convValue: Number(requestValue.convValue),
        roas: getNumberWithoutPercent(requestValue.roas),
      },
    };

    await patchAdvertisements<AdvertisementUpdateDataType>(
      requestData.id,
      requestData
    );
    setIsReadOnly((prevState) => !prevState);
  };

  return (
    <Form>
      <FormTitle>
        <Input
          value={requestValue.title || ''}
          onChange={onChangeInput}
          ref={titleRef}
          placeholder="광고 제목"
          autoFocus={isNewForm}
          name="title"
          readOnly={isReadOnly}
        />
      </FormTitle>
      {Object.keys(MANAGEMENT_INPUT_TITLE).map((inputName, i) => {
        let title = MANAGEMENT_INPUT_TITLE[inputName];
        let value =
          !isNewForm && requestValue ? String(requestValue[inputName]) : '';

        if (typeof value === 'number' && value > 10000)
          value = `${getCommaLocalString(Math.round(value / 10000))} 만원`;
        if (typeof value === 'number' && value < 10000)
          value = `${getCommaLocalString(Math.round(value))} 원`;

        return (
          <ManagementInput
            key={i}
            title={title}
            value={value}
            inputName={inputName}
            onChangeInput={onChangeInput}
            isReadOnly={isReadOnly}
          />
        );
      })}

      <ButtonWrapper>
        {isReadOnly ? (
          <EditButton onClick={clickedEditAndCacnelButton}>수정하기</EditButton>
        ) : (
          <>
            <EditButton onClick={clickedEditCompleteButton}>
              수정완료
            </EditButton>
            <EditButton onClick={clickedEditAndCacnelButton}>
              수정취소
            </EditButton>
          </>
        )}
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
