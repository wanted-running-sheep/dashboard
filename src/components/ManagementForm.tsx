import React, { ChangeEvent, FormEvent } from 'react';
import {
  BUTTON_TYPE,
  MANAGEMENT_INPUT_TITLE,
  MANAGEMENT_STATUS,
  MANAGEMENT_STATUS_KOR_TO_ENG,
  MSG_UPDATE_COMPLETE,
  MSG_UPDATE_FAILED,
} from '@/constants';
import styled from 'styled-components';
import ManagementInput from './ManagementInput';
import CalendarInput from './CalendarInput';
import { AdvertisementDataType, AdvertisementUpdateDataType } from 'request';
import adsFormValidate from '@/utils/adsFormValidate';
import setPostReqVal from '@/utils/setPostReqVal';
import makeViewData, { checkNumberVale } from '@/utils/makeViewData';
import { format } from 'date-fns';
import Dropdown from './Dropdown';
import useManagement from '@/hooks/useManagement';
import ManagementButton from './ManagementButton';

interface ManagementFormProps {
  advertisement?: AdvertisementDataType;
  setIsNewForm?: React.Dispatch<React.SetStateAction<boolean>>;
  getAdvertisements: () => Promise<void>;
}

const ManagementForm = ({
  advertisement,
  setIsNewForm,
  getAdvertisements,
}: ManagementFormProps) => {
  const {
    isNewForm,
    requestValue,
    postAdvertisement,
    setRequestValue,
    setIsReadOnly,
    patchAdvertisements,
    isReadOnly,
    createReqData,
  } = useManagement(advertisement);

  const onNewFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { notValidationTitle, validation } = adsFormValidate(requestValue);
    const VALIDATION_MESSAGE = `${notValidationTitle}값 은 필수 입력 값 입니다.`;
    if (!validation) {
      alert(VALIDATION_MESSAGE);
      return;
    }

    const postData = setPostReqVal(requestValue);
    await postAdvertisement(postData);
    await getAdvertisements();
    setIsNewForm && setIsNewForm((prevIsNewForm) => !prevIsNewForm);
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    let { value, name } = event.target;

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

  const clickedEditCompleteButton = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const requestData: AdvertisementUpdateDataType = createReqData();
    try {
      await patchAdvertisements<AdvertisementUpdateDataType>(
        requestData.id,
        requestData
      );
      await getAdvertisements();
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
          value={requestValue.title || ''}
          onChange={onChangeInput}
          placeholder="광고 제목"
          autoFocus={isNewForm}
          name="title"
          readOnly={!isNewForm && isReadOnly}
        />
      </FormTitle>
      {Object.keys(MANAGEMENT_INPUT_TITLE).map((inputName) => {
        const { title, value } = makeViewData({
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

      <ManagementButton
        isNewForm={isNewForm}
        isReadOnly={isReadOnly}
        clickedEditAndCacnelButton={clickedEditAndCacnelButton}
        clickedEditCompleteButton={clickedEditCompleteButton}
      />
    </Form>
  );
};

export default ManagementForm;

const Form = styled.form`
  padding: 5px 30px;
  border: 1px solid ${({ theme }) => theme.color.border.lightgray};
  border-radius: 10px;

  ${({ theme }) => theme.media.mobile`
    width: 100%;
    padding: 10px 20px;
  `}
`;

const FormTitle = styled.div`
  padding: 30px 0px;
  font-weight: bold;
  font-size: 16px;

  border-bottom: 1px solid ${({ theme }) => theme.color.border.lightgray};
  ${({ theme }) => theme.media.mobile`
    padding: 20px 0px;
  `}
  & > input {
    font-family: 'GothicA1-Medium', sans-serif;
    font-size: 20px;
    font-weight: 700;

    ${({ theme }) => theme.media.mobile`
      font-size: 18px;
    `}
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
`;

const ButtonWrapper = styled.div`
  padding: 30px 0px 30px 0px;
  ${({ theme }) => theme.media.mobile`
    padding: 25px 0px 10px 0px;
  `}
`;

const EditButton = styled.button<{ buttonType: string }>`
  border: 1px solid ${({ theme }) => theme.color.border.lightgray};
  border-radius: 10px;
  font-size: 15px;
  margin-right: 0.6rem;
  padding: 10px 20px;
  font-weight: 600;
  background-color: ${({ theme, buttonType }) => {
    switch (buttonType) {
      case BUTTON_TYPE.EDIT:
        return theme.color.button.black;
      case BUTTON_TYPE.COMPLETE:
        return theme.color.button.blue;
      case BUTTON_TYPE.CANCEL:
        return theme.color.button.red;
    }
  }};
  color: ${({ theme }) => theme.color.font.white};
`;
