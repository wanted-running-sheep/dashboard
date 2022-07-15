import { useState } from 'react';

const useDrawer = () => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleDrawer = () => {
    setIsOpened(!isOpened);
  };

  return {
    isOpened,
    toggleDrawer,
  };
};

export default useDrawer;
