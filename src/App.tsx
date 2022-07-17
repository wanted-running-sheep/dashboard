import React, { useEffect } from 'react';
import Router from '@/routes';
import { useTotalDataManagement } from './api/models/useTotalDataManagement';

function App() {
  const { weekList, getTotalData } = useTotalDataManagement();
  useEffect(() => {
    console.log('Apprender');
  }, []);

  return <Router />;
}

export default App;
