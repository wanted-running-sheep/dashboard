import { BUTTON_TYPE } from '@/constants';
import React from 'react';
import styled from 'styled-components';

interface ManagementButtonProps {
  isNewForm: boolean;
  isReadOnly: boolean;
  clickedEditAndCacnelButton: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  clickedEditCompleteButton: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

const ManagementButton = ({
  isNewForm,
  isReadOnly,
  clickedEditAndCacnelButton,
  clickedEditCompleteButton,
}: ManagementButtonProps) => {
  return (
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
  );
};

export default ManagementButton;

const ButtonWrapper = styled.div`
  padding: 30px 0px 30px 0px;
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
