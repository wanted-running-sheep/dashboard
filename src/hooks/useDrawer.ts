import { useState, useEffect } from 'react';

const useDrawer = () => {
  const [isOpened, setIsOpened] = useState(true);
  useEffect(() => {
    const MIN_MOBILE_SIZE = 480;
    const resizeListener = () => {
      setIsOpened(window.innerWidth > MIN_MOBILE_SIZE);
    };
    window.addEventListener('resize', resizeListener);
  });

  const toggleDrawer = () => {
    setIsOpened(!isOpened);
  };

  return {
    isOpened,
    toggleDrawer,
  };
};

export default useDrawer;
