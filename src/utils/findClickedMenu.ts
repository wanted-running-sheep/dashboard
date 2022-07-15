import { navigationList } from '@/routes';
const findClickedMenu = (currentPath: string) => {
  //nth-child는 1부터 시작하며 div 위에 title이 있으므로 2번째 요소부터 div
  const NTH_CHILD_NUMBER = 2;
  const clickedMenuIndex = navigationList.findIndex(
    (navigation) => navigation.path === currentPath
  );

  return clickedMenuIndex + NTH_CHILD_NUMBER;
};

export default findClickedMenu;
