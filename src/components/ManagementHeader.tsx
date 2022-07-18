import React from 'react';
import styled from 'styled-components';

const ManagementHeader = () => {
  return (
    <Wrapper>
      <Button>전체 광고</Button>
      <Button>광고 만들기</Button>
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
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.color.button.lightblue};
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.font.white};
  font-weight: bold;
  font-size: 14px;
`;