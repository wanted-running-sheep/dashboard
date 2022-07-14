<<<<<<< HEAD
import { useAdvertisementModel } from '@/modules/models/useAdvertisementModel';
import { useMediaModel } from '@/modules/models/useMediaModel';
import { useReportModel } from '@/modules/models/useReportModel';
import React, { useEffect } from 'react';

const DashboardPage = () => {
  const { reports, getReports } = useReportModel();
  const { media, getMedia } = useMediaModel();
  const { advertisements, getAdvertisements } = useAdvertisementModel();

  useEffect(() => {
    getReports();
    getMedia();
    getAdvertisements();
  }, []);

  console.log(reports);
  console.log(media);
  console.log(advertisements);

  return <div>DashboardPage</div>;
=======
import React from 'react';
import Layout from '@/components/Layout';

const DashboardPage = () => {
  return (
    <h1>DashboardPage</h1>
  );
>>>>>>> 528c0b286c76eade0d6d34b99db7c11ca64866a2
};

export default DashboardPage;
