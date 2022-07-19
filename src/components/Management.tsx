import { MANAGEMENT_STATUS } from '@/constants';
import { format } from 'date-fns';
import React from 'react';
import { AdvertisementInterface } from 'request';
import styled from 'styled-components';
import ManagementForm from './ManagementForm';
import ManagementHeader from './ManagementHeader';

interface ManagementProps {
  advertisements: AdvertisementInterface[];
}

const Management = ({ advertisements }: ManagementProps) => {
  const DATE_FORMAT = 'yyyy-MM-dd';
  return (
    <Wrapper>
      <ManagementHeader />
      <FormContainer>
        {advertisements.map((advertisement) => {
          const startDate = format(
            new Date(advertisement.startDate),
            DATE_FORMAT
          );

          const propsAdverTisement = {
            title: advertisement.title,
            status: MANAGEMENT_STATUS[advertisement.status],
            startDate,
            budget: advertisement.budget,
            roas: `${advertisement.report.roas} %`,
            convValue: advertisement.report.convValue,
            cost: advertisement.report.cost,
          };

          return (
            <ManagementForm
              key={advertisement.id}
              advertisement={propsAdverTisement}
            />
          );
        })}
      </FormContainer>
    </Wrapper>
  );
};

export default Management;

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  background-color: ${({ theme }) => theme.color.background.white};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.mixins.boxShadow};

  padding: 20px;

  display: flex;
  flex-direction: column;

  /* position: relative; */
`;

const FormContainer = styled.div`
  padding: 10px 0px 10px 0px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  overflow-y: scroll;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
