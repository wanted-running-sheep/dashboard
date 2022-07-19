import React, { ChangeEvent, FormEvent, useState } from 'react';
import { MANAGEMENT_INPUT_TITLE } from '@/constants';
import styled from 'styled-components';
import ManagementInput from './ManagementInput';
import adsFormValidate from '@/utils/adsFormValidate';
import { AdvertisementInterface } from 'request';
import { useAdvertisementModel } from '@/api/models/useAdvertisementModel';
import setPostReqVal from '@/utils/setPostReqVal';
import makeViewData, { checkNumberVale } from '@/utils/makeViewData';

interface ManagementFormProps {
  advertisement?: { [key: string]: string | number };
  nextId?: number;
  setIsNewForm?: React.Dispatch<React.SetStateAction<boolean>>;
  setAdvertisementList?: React.Dispatch<
    React.SetStateAction<AdvertisementInterface[]>
  >;
}
const ManagementForm = ({
  advertisement,
  nextId,
  setIsNewForm,
  setAdvertisementList,
}: ManagementFormProps) => {
  const isNewForm = !advertisement;
  const { postAdvertisement } = useAdvertisementModel();
  const [requestValue, setRequestValue] = useState<{
    [key: string]: string | number;
  }>({ status: 'active' });

  const onNewFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { notValidationTitle, validation } = adsFormValidate(requestValue);

    if (!validation) {
      alert(`${notValidationTitle}값 은 필수 입력 값 입니다.`);
    }

    if (isNewForm && nextId && setIsNewForm && setAdvertisementList) {
      const postData = setPostReqVal(requestValue, nextId);
      postAdvertisement(postData);
      setAdvertisementList((prevAds) => [...prevAds, postData]);
      setIsNewForm((prevIsNewForm) => !prevIsNewForm);
    }
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

  return (
    <Form onSubmit={onNewFormSubmit}>
      <FormTitle>
        <Input
          value={isNewForm ? requestValue.title : advertisement.title}
          onChange={onChangeInput}
          placeholder="광고 제목"
          autoFocus={isNewForm}
          name="title"
        />
      </FormTitle>
      {Object.keys(MANAGEMENT_INPUT_TITLE).map((inputName) => {
        const { title, value, onlyNumber } = makeViewData(
          inputName,
          advertisement
        );

        return (
          <ManagementInput
            key={inputName}
            title={title}
            value={(isNewForm ? requestValue[inputName] : value) as string}
            inputName={inputName}
            onChangeInput={onChangeInput}
            isNewForm={isNewForm}
            onlyNumber={onlyNumber}
          />
        );
      })}

      <ButtonWrapper>
        <EditButton type="submit">
          {isNewForm ? '만들기' : '수정하기'}
        </EditButton>
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
