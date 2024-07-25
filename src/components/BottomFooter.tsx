import React from 'react';
import { Grid, Box, Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { BLACK_TO_BLUE, BOTTOM_FOOTER_HEIGHT, BOTTOM_FOOTER_LEFT_TEXT, CARD_GRADIENT, COUNT_COMPLETED_CONTRACTS_TEXT, COUNT_CONTRACTS_TEXT, DIVIDER_GRADIENT, SCROLLBAR_THUMB_COLOR, SCROLLBAR_TRACK_COLOR } from '../const';
import useCSVParser from '../hooks/useCSVParser';
import { CardData } from '../types';
import useAutoScroll from '../hooks/useAutoScroll';

const BottomFooter: React.FC = () => {
  const classes = useStyles();
  const columnsFooterWeek = useCSVParser({
    fileName: 'week.csv',
    columns: ['NameCustomer', 'NameContracts'],
    forFooter: true
  }) as CardData[];
  const columnsFooterCic = useCSVParser({
    fileName: 'cic.csv',
    columns: ['NameCustomer'],
    forFooter: true
  }) as CardData[];
  const { scrollContainerRef: scrollContainerLeftRef, handleUserInteraction: handleUserInteractionLeft } = useAutoScroll([columnsFooterWeek.length]);
  const { scrollContainerRef: scrollContainerRightRef, handleUserInteraction: handleUserInteractionRight } = useAutoScroll([columnsFooterCic.length]);

  const countMap: { [key: string]: number } = {};
  columnsFooterCic.forEach(card => {
    countMap[card.column1] = (countMap[card.column1] || 0) + 1;
  });
  const uniqueColumnsFooterCic = Object.keys(countMap).map(key => ({
    column1: key,
    count: countMap[key]
  }));

  const totalRowsCic = columnsFooterCic.length;

  return (
    <Grid container direction="row" justifyContent="space-around" alignItems="center" sx={{ height: BOTTOM_FOOTER_HEIGHT, background: BLACK_TO_BLUE }}>
      <Grid item xs={12} mb={-1}>
        <Divider className={classes.customDivider} />
      </Grid>
      <Grid item>
        <Box className={classes.leftBox}>
          <Typography variant="h6" pt={1}>
            <Box className={classes.leftSign}>
              {`${BOTTOM_FOOTER_LEFT_TEXT} (${columnsFooterWeek.length})`}
            </Box>
            <Box
              ref={scrollContainerLeftRef}
              className={classes.scrollContainerLeft}
              onMouseEnter={() => handleUserInteractionLeft(true)}
              onMouseLeave={() => handleUserInteractionLeft(false)}
              onTouchStart={() => handleUserInteractionLeft(true)}
              onTouchEnd={() => handleUserInteractionLeft(false)}
            >
              {columnsFooterWeek.map((card, index) => (
                <Box key={index} p={2} borderBottom={1} borderColor="white">
                  <Typography variant="body2" color="white">{card.column1}</Typography>
                  <Typography variant="body2" color="white">{card.column2}</Typography>
                </Box>
              ))}
            </Box>
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.rightBox}>
          <Box className={classes.sideBox} style={{ left: 0 }}>
            <span className={classes.sideText}>{COUNT_CONTRACTS_TEXT}</span>
          </Box>
          <Box className={classes.scrollContainerRight}
            ref={scrollContainerRightRef}
            onMouseEnter={() => handleUserInteractionRight(true)}
            onMouseLeave={() => handleUserInteractionRight(false)}
            onTouchStart={() => handleUserInteractionRight(true)}
            onTouchEnd={() => handleUserInteractionRight(false)}
          >
            {uniqueColumnsFooterCic.map((card, index) => (
              <Box key={index} pb={1} borderColor="white">
                <Typography variant="body2" color="white">{`${card.column1}:........${card.count}`}</Typography>
              </Box>
            ))}
          </Box>
          <Box className={classes.sideBox} style={{ right: 0 }}>
            <span className={classes.sideText}>{COUNT_CONTRACTS_TEXT}</span>
          </Box>
          <Box className={classes.bottomText}>
            <Typography
              textAlign='right'
              variant="body2"
              color="white"
              fontWeight='bold'
              // pr={8}
            >
              {`${COUNT_COMPLETED_CONTRACTS_TEXT} ${totalRowsCic}`}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} mt={-1}>
        <Divider className={classes.customDivider} />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  leftBox: {
    background: CARD_GRADIENT,
    borderRadius: 16,
    border: '2px solid #79ff00',
    width: '45vw',
    height: '15vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  rightBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 16,
    width: '45vw',
    height: '15vh',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  sideBox: {
    backgroundColor: 'white',
    width: '8%',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  sideText: {
    writingMode: 'vertical-rl',
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    transform: 'rotate(180deg)',
  },
  leftSign: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainerLeft: {
    overflowY: 'auto',
    maxHeight: '10vh',
    padding: '0 1rem',
    marginRight: '0.5rem',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: SCROLLBAR_THUMB_COLOR,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: SCROLLBAR_TRACK_COLOR,
    },
  },
  scrollContainerRight: {
    overflowY: 'auto',
    flex: 1,
    maxHeight: 'calc(100% - 24px)',
    paddingLeft: '10%',
    paddingRight: '10%',
    textAlign: 'right',
    zIndex: 1,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  bottomText: {
    height: '24px',
    zIndex: 1,
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  customDivider: {
    height: 2,
    margin: '0 auto',
    background: DIVIDER_GRADIENT,
  },
}));

export default BottomFooter;
