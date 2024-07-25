import React from 'react';
import { Box, Grid } from '@mui/material';
import Column from './Column';
import BottomFooter from './BottomFooter';
import { BLUE_TO_BLACK, DASHBOARD_HEIGHT } from '../const';
import useCSVParser from '../hooks/useCSVParser';
import { ColumnData } from '../types';

const Dashboard: React.FC = () => {
  const columns = useCSVParser({
    fileName: 'tpl.csv',
    columns: ['Index', 'NameCustomer', 'NameContracts', 'DateEndTime', 'StartingPrice', 'Comments']
  }) as ColumnData[];

  return (
    <Grid container direction='column' sx={{ background: BLUE_TO_BLACK }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: DASHBOARD_HEIGHT }}>
        {columns.map((column, index) => (
          <Column key={index} data={column} index={index} />
        ))}
      </Box>
      <BottomFooter />
    </Grid>
  );
};

export default Dashboard;
