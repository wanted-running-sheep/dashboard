import { MANAGEMENT_STATUS } from '@/constants';
import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';

interface ManagementHeaderProps {
  onClickNewForm: () => void;
  isNewForm: boolean;
  onChangeStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ManagementHeader = ({
  onClickNewForm,
  isNewForm,
  onChangeStatus,
}: ManagementHeaderProps) => {
  return (
    <Wrapper>
      <Dropdown
        dataList={[['all', '전체광고'], ...Object.entries(MANAGEMENT_STATUS)]}
        onChange={onChangeStatus}
      />
      <Button onClick={onClickNewForm}>
        {isNewForm ? '광고 만들기 취소' : '광고 만들기'}
      </Button>
    </Wrapper>
  );
};

export default ManagementHeader;

const Wrapper = styled.div`
  width: inherit;
  max-width: inherit;
  display: flex;
  justify-content: space-between;

  padding: 10px 20px 10px 20px;
  position: sticky;

  ${({ theme }) => theme.media.mobile`
    padding: 5px;
  `}
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.color.button.lightblue};
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.font.white};
  font-weight: bold;
  font-size: 14px;
`;
