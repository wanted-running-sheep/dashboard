import React, { ChangeEvent, useRef, useState } from 'react';
import { AdvertisementInterface } from 'request';
import styled from 'styled-components';
import ManagementForm from './ManagementForm';
import ManagementHeader from './ManagementHeader';
import makePropsAdvertisement from '@/utils/makePropsAdvertisement';
import getNewId from '@/utils/getNewId';

interface ManagementProps {
  advertisements: AdvertisementInterface[];
}

const Management = ({ advertisements }: ManagementProps) => {
  const [isNewForm, setIsNewForm] = useState(false);
  const [advertisementList, setAdvertisementList] = useState(advertisements);
  const [advertisementsForRender, setAdvertisementsForRender] =
    useState<AdvertisementInterface[]>(advertisements);
  const nextId = getNewId(advertisements);

  const formContainerRef = useRef<HTMLDivElement>(null);

  const onClickNewForm = () => {
    setIsNewForm((prevState) => !prevState);
    formContainerRef.current?.scrollTo({ top: 0 });
  };

  const onChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (value === 'all') {
      setAdvertisementsForRender([...advertisementList]);
      return;
    }

    setAdvertisementsForRender(
      advertisementList.filter(
        (advertisement) => advertisement.status === value
      )
    );
  };

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
            nextId={nextId}
            setIsNewForm={setIsNewForm}
            setAdvertisementList={setAdvertisementList}
            setAdvertisementsForRender={setAdvertisementsForRender}
          />
        )}
        {advertisementsForRender
          .sort((a, b) => b.id - a.id)
          .map((advertisement) => {
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
