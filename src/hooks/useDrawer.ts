import { useState } from 'react';

const useDrawer = () => {
  const [isOpened, setIsOpened] = useState(true);

  const toggleDrawer = () => {
    setIsOpened(!isOpened);
  };

  return {
    isOpened,
    toggleDrawer,
  };
};

export default useDrawer;
