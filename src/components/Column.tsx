import React, { useState } from 'react';
import { ColumnData } from '../types';
import Card from './Card';
import { Box, Paper, Typography } from '@mui/material';
import { BORDER_COLORS, SCROLLBAR_THUMB_COLOR, SCROLLBAR_TRACK_COLOR } from '../const';
import { makeStyles } from '@mui/styles';
import useAutoScroll from '../hooks/useAutoScroll';

const Column: React.FC<{ data: ColumnData, index: number }> = ({ data, index }) => {
  const borderColor = BORDER_COLORS[index % BORDER_COLORS.length];
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollContainerRef, handleUserInteraction } = useAutoScroll([data, isModalOpen]);

  return (
    <Box className={classes.column}>
      <Paper sx={{
        background: '#303444',
        height: "8vh",
        padding: '1rem',
        position: 'relative',
        textAlign: 'center',
        zIndex: 'tooltip',
        borderRadius: 0,
        borderRight: '2px solid white',
        borderLeft: '2px solid white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        "::before": { 
          content: '""',
          position: 'absolute',
          height: '8px',
          backgroundColor: borderColor,
          left: '10%',
          width: '80%',
          bottom: 0,
        },
      }}>
        <Typography variant="h6" color="white" fontWeight="bold">
          {`${data.header} (${data.cards.length})`}
        </Typography>
      </Paper>
      <Box
        ref={scrollContainerRef}
        className={classes.cardsContainer}
        onMouseEnter={() => handleUserInteraction(true)}
        onMouseLeave={() => handleUserInteraction(false)}
        onTouchStart={() => handleUserInteraction(true)}
        onTouchEnd={() => handleUserInteraction(false)}
      >
        {data.cards.map((card, cardIndex) => (
          <Card 
            key={cardIndex} 
            data={card} 
            borderColor={borderColor} 
            index={cardIndex} 
            onModalOpen={() => setIsModalOpen(true)} 
            onModalClose={() => setIsModalOpen(false)} 
          />
        ))}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '20vw',
    overflow: 'hidden',
    padding: 0,
    marginTop: '1rem',
    '@media (max-width: 768px)': {
      maxWidth: '40vw',
    },
    '@media (max-width: 480px)': {
      maxWidth: '80vw',
    },
  },
  cardsContainer: {
    overflowY: 'auto',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginTop: '1rem',
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: SCROLLBAR_THUMB_COLOR,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: SCROLLBAR_TRACK_COLOR,
    },
  },
}));

export default Column;