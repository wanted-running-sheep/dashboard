import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AdvertismentStatusType } from 'request';
import styled from 'styled-components';
import ManagementForm from './ManagementForm';
import ManagementHeader from './ManagementHeader';
import makePropsAdvertisement from '@/utils/makePropsAdvertisement';
import { useAdvertisementModel } from '@/api/models/useAdvertisementModel';
import createRenderAds from '@/utils/createRenderAds';

const Management = () => {
  const { advertisements, getAdvertisements } = useAdvertisementModel();
  const [isNewForm, setIsNewForm] = useState(false);
  const [advertisementsStatus, setAdvertisementsStatus] =
    useState<AdvertismentStatusType>('all');
  const formContainerRef = useRef<HTMLDivElement>(null);

  const onClickNewForm = () => {
    setIsNewForm((prevState) => !prevState);
    formContainerRef.current?.scrollTo({ top: 0 });
  };

  const onChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setAdvertisementsStatus(value as AdvertismentStatusType);
  };

  useEffect(() => {
    getAdvertisements();
  }, []);

  if (!advertisements.length) return null;

  return (
    <Wrapper>
      <ManagementHeader
        onClickNewForm={onClickNewForm}
        isNewForm={isNewForm}
        onChangeStatus={onChangeStatus}
      />

      <FormContainer ref={formContainerRef}>
        {isNewForm && (
          <ManagementForm
            setIsNewForm={setIsNewForm}
            getAdvertisements={getAdvertisements}
          />
        )}
        {createRenderAds(advertisements, advertisementsStatus)
          .sort((a, b) => b.id - a.id)
          .map((advertisement) => {
            return (
              <ManagementForm
                key={advertisement.id}
                advertisement={makePropsAdvertisement(advertisement)}
                getAdvertisements={getAdvertisements}
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
