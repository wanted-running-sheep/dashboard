import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  BUTTON_TYPE,
  DEFAULT_DATE_FORMAT,
  MANAGEMENT_INPUT_TITLE,
  MANAGEMENT_STATUS,
  MANAGEMENT_STATUS_KOR_TO_ENG,
  MSG_UPDATE_COMPLETE,
  MSG_UPDATE_FAILED,
} from '@/constants';
import styled from 'styled-components';
import ManagementInput from './ManagementInput';
import CalendarInput from './CalendarInput';
import { useAdvertisementModel } from '@/api/models/useAdvertisementModel';
import { AdvertisementDataType, AdvertisementUpdateDataType } from 'request';
import adsFormValidate from '@/utils/adsFormValidate';
import { AdvertisementInterface } from 'request';
import setPostReqVal from '@/utils/setPostReqVal';
import makeViewData, { checkNumberVale } from '@/utils/makeViewData';
import { format } from 'date-fns';
import Dropdown from './Dropdown';

interface ManagementFormProps {
  advertisement?: AdvertisementDataType;
  nextId?: number;
  setIsNewForm?: React.Dispatch<React.SetStateAction<boolean>>;
  setAdvertisementList?: React.Dispatch<
    React.SetStateAction<AdvertisementInterface[]>
  >;
  setAdvertisementsForRender?: React.Dispatch<
    React.SetStateAction<AdvertisementInterface[]>
  >;
}

const ManagementForm = ({
  advertisement,
  nextId,
  setIsNewForm,
  setAdvertisementList,
  setAdvertisementsForRender,
}: ManagementFormProps) => {
  const isNewForm = !advertisement;

  const { postAdvertisement } = useAdvertisementModel();
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [requestValue, setRequestValue] = useState<AdvertisementDataType>({
    ...advertisement,
    status: isNewForm ? 'active' : advertisement.status,
    startDate: isNewForm
      ? format(new Date(), DEFAULT_DATE_FORMAT)
      : advertisement.startDate,
  });

  const { patchAdvertisements } = useAdvertisementModel();

  const onNewFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { notValidationTitle, validation } = adsFormValidate(requestValue);
    const VALIDATION_MESSAGE = `${notValidationTitle}값 은 필수 입력 값 입니다.`;
    if (!validation) {
      alert(VALIDATION_MESSAGE);
      return;
    }

    if (
      isNewForm &&
      nextId &&
      setIsNewForm &&
      setAdvertisementList &&
      setAdvertisementsForRender
    ) {
      const postData = setPostReqVal(requestValue, nextId);
      postAdvertisement(postData);
      setAdvertisementList((prevAds) => [...prevAds, postData]);
      setAdvertisementsForRender((prevAds) => [...prevAds, postData]);
      setIsNewForm((prevIsNewForm) => !prevIsNewForm);
    }
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    let { value, name } = event.target;

    console.log(name, value);
    if (checkNumberVale(name)) {
      value = value.replace(/[^0-9]/g, '');
    }
    setRequestValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const onChangeCalendar = (name: string, value: string) => {
    setRequestValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const clickedEditAndCacnelButton = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsReadOnly((prevState) => {
      if (!prevState) setRequestValue({ ...advertisement });
      return !prevState;
    });
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
      status: String(requestValue.status),
      budget: Number(requestValue.budget),
      startDate: String(requestValue.startDate),
      report: {
        cost: Number(requestValue.cost),
        convValue: Number(requestValue.convValue),
        roas: getNumberWithoutPercent(requestValue.roas),
      },
    };
    try {
      await patchAdvertisements<AdvertisementUpdateDataType>(
        requestData.id,
        requestData
      );
      alert(MSG_UPDATE_COMPLETE);
    } catch (error) {
      alert(MSG_UPDATE_FAILED);
    }

    setIsReadOnly((prevState) => !prevState);
  };

  return (
    <Form onSubmit={onNewFormSubmit}>
      <FormTitle>
        <Input
          value={isNewForm ? requestValue.title : advertisement.title}
          onChange={onChangeInput}
          placeholder="광고 제목"
          autoFocus={isNewForm}
          name="title"
          readOnly={!isNewForm && isReadOnly}
        />
      </FormTitle>
      {Object.keys(MANAGEMENT_INPUT_TITLE).map((inputName) => {
        const { title, value, onlyNumber } = makeViewData({
          inputName,
          advertisement,
          isReadOnly,
          requestValue,
          isNewForm,
        });

        if (inputName === 'status' && (isNewForm || !isReadOnly)) {
          return (
            <ManagementInput key={inputName} title={title}>
              <Dropdown
                key={inputName}
                dataList={Object.entries(MANAGEMENT_STATUS)}
                onChange={onChangeInput}
                name={inputName}
                defaultValue={MANAGEMENT_STATUS_KOR_TO_ENG[value]}
              />
            </ManagementInput>
          );
        }

        if (inputName === 'startDate') {
          return (
            <CalendarInput
              key={inputName}
              title={title}
              date={
                isNewForm ? format(new Date(), 'yyyy-MM-dd') : (value as string)
              }
              disabled={!isNewForm && isReadOnly}
              inputName={inputName}
              onChangeCalendar={onChangeCalendar}
            />
          );
        }

        return (
          <ManagementInput key={inputName} title={title}>
            <Input
              type="text"
              value={value || ''}
              onChange={onChangeInput}
              name={inputName}
              readOnly={!isNewForm && isReadOnly}
            />
          </ManagementInput>
        );
      })}

      <ButtonWrapper>
        {isNewForm ? (
          <EditButton type="submit" buttonType={BUTTON_TYPE.EDIT}>
            만들기
          </EditButton>
        ) : isReadOnly ? (
          <EditButton
            onClick={clickedEditAndCacnelButton}
            buttonType={BUTTON_TYPE.EDIT}
          >
            수정하기
          </EditButton>
        ) : (
          <>
            <EditButton
              onClick={clickedEditCompleteButton}
              buttonType={BUTTON_TYPE.COMPLETE}
            >
              수정완료
            </EditButton>
            <EditButton
              onClick={clickedEditAndCacnelButton}
              buttonType={BUTTON_TYPE.CANCEL}
            >
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

const EditButton = styled.button<{ buttonType: string }>`
  padding: 10px 20px 10px 20px;
  background-color: ${({ theme, buttonType }) => {
    switch (buttonType) {
      case BUTTON_TYPE.EDIT:
        return theme.color.background.white;
      case BUTTON_TYPE.COMPLETE:
        return theme.color.button.blue;
      case BUTTON_TYPE.CANCEL:
        return theme.color.button.red;
    }
  }};
  border: 1px solid ${({ theme }) => theme.color.border.lightgray};
  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
  margin-right: 1rem;
`;
