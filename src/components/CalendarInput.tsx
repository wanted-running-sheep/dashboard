import React, { useState } from 'react';
import styled from 'styled-components';

import { changeDateFormat } from '@/utils/changeDateFormat';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';

registerLocale('ko', ko);

interface CalendarInputProps {
  title: string;
  date: string;
  disabled: boolean;
  inputName: string;
  onChangeCalendar: (name: string, value: string) => void;
}

const CalendarInput = ({
  title,
  date,
  disabled,
  inputName,
  onChangeCalendar,
}: CalendarInputProps) => {
  const [startDate, setStartDate] = useState(new Date(date));

  const handleChangedDate = (date: Date) => {
    setStartDate(date);
    onChangeCalendar(inputName, changeDateFormat(date));
  };

  return (
    <InputWrapper>
      <Label>{title}</Label>
      <InputContainer>
        <CustomDatePicker
          locale="ko"
          dateFormat="yyyy-MM-dd"
          name={inputName}
          selected={startDate}
          disabled={disabled}
          onChange={handleChangedDate}
        />
      </InputContainer>
    </InputWrapper>
  );
};

export default CalendarInput;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border.lightgray};
  input {
    font-size: 16px;
  }

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

const CustomDatePicker = styled(DatePicker)`
  background-color: ${({ theme }) => theme.color.background.white};
`;
