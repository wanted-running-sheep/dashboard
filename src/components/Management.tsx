import React, { useRef, useState } from 'react';
import { MANAGEMENT_STATUS } from '@/constants';
import { format } from 'date-fns';
import { AdvertisementInterface } from 'request';
import styled from 'styled-components';
import ManagementForm from './ManagementForm';
import ManagementHeader from './ManagementHeader';
import makePropsAdvertisement from '@/utils/makePropsAdvertisement';

interface ManagementProps {
  advertisements: AdvertisementInterface[];
}

const Management = ({ advertisements }: ManagementProps) => {
  const [isNewForm, setIsNewForm] = useState(false);

  const formContainerRef = useRef<HTMLDivElement>(null);

  const onClickNewForm = () => {
    setIsNewForm((prevState) => !prevState);
    formContainerRef.current?.scrollTo({ top: 0 });
  };

  return (
    <Wrapper>
      <ManagementHeader onClickNewForm={onClickNewForm} />

      <FormContainer ref={formContainerRef}>
        {isNewForm && <ManagementForm />}
        {advertisements.map((advertisement) => {
          return (
            <ManagementForm
              key={advertisement.id}
              advertisement={makePropsAdvertisement(advertisement)}
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
