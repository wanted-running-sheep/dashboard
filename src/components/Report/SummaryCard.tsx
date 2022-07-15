import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const SummaryCard = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
