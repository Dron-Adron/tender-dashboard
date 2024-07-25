import React, { useState, useRef, useEffect } from 'react';
import { CardProps } from '../types';
import { Box, Stack, Typography, Modal, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CARD_GRADIENT, SCROLLBAR_THUMB_COLOR, SCROLLBAR_TRACK_COLOR, SHOW_MORE_BUTTON_TEXT, WE_SIGNED_TEXT } from '../const';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Card: React.FC<CardProps & { onModalOpen: () => void, onModalClose: () => void }> = ({ data, borderColor, index, onModalOpen, onModalClose }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen(true);
    onModalOpen();
  };

  const handleClose = () => {
    setOpen(false);
    onModalClose();
  };

  const formatTextWithLineBreaks = (text: string) => {
    return text.split('Perenos').join('<br/>');
  };

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement) {
      const maxHeight = 6 * parseInt(getComputedStyle(textElement).lineHeight || '16px');
      if (textElement.scrollHeight > maxHeight) {
        setIsTruncated(true);
      }
    }
  }, [data.column6]);

  return (
    <Box p={2}>
      <Box className={classes.mainCard} sx={{ border: `2px solid ${borderColor}` }} boxShadow={5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" pb={0.5}>
          <Box
            className={classes.columnIndex}
            sx={{ backgroundColor: borderColor }}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            {index + 1}
          </Box>
          <Typography className={`${classes.whiteTextColor} ${classes.breakWord}`} variant="body2">
            {data.column1}
          </Typography>
        </Stack>
        <Typography variant="body2" pb={0.5}>
          <Box className={`${classes.titleFont} ${classes.breakWord}`}>{data.column2}</Box>
        </Typography>
        <Typography variant="body2" pb={1}>
          <Box className={`${classes.whiteTextColor} ${classes.breakWord}`}>{data.column3}</Box>
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography className={`${classes.whiteTextColor} ${classes.breakWord}`} variant="body2">
            {data.column7 === 'True' ? 
              <Stack direction="row" justifyContent="flex-start" alignItems="center">
                <CheckCircleIcon sx={{color: '#79ff00', fontSize: '1.2rem'}}/>
                <Typography variant="body2" sx={{color: '#79ff00', fontSize: '0.7rem', }}>
                    {WE_SIGNED_TEXT}
                </Typography>
              </Stack>
             : 
              data.column4}
          </Typography>
          <Typography className={`${classes.priceFont} ${classes.breakWord}`} variant="body2">
            {`${data.column5}₽`}
          </Typography>
        </Stack>
      </Box>
      {data.column6 && (
        <Box className={classes.secondCard}  boxShadow={5}>
          <Typography
            ref={textRef}
            className={`${classes.whiteTextColor} ${classes.truncateText} ${classes.breakWord}`}
            variant="body2"
            dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(data.column6) }}
            sx= {{ fontStyle: 'italic' }}
          />
          {isTruncated && (
            <Box className={classes.showMoreContainer}>
              <Link className={classes.showMore} onClick={handleOpen} variant="body2">
                {SHOW_MORE_BUTTON_TEXT}
              </Link>
            </Box>
          )}
          <Modal open={open} onClose={handleClose}>
            <Box className={classes.modalBox}>
              <Typography
                variant="body2"
                className={`${classes.whiteTextColor} ${classes.breakWord}`}
                dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(data.column6) }}
              />
            </Box>
          </Modal>
        </Box>
      )}
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  whiteTextColor: {
    color: 'white',
  },
  titleFont: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  textFont: {
    color: 'white',
    textAlign: 'right',
  },
  priceFont: {
    color: '#0CEC59',
  },
  mainCard: {
    borderRadius: 10,
    background: CARD_GRADIENT,
    marginBottom: -10,
    position: 'relative',
    zIndex: 2,
    padding: 5,
  },
  secondCard: {
    borderRadius: 10,
    backgroundColor: '#303444',
    position: 'relative',
    zIndex: 1,
    alignSelf: 'center',
    padding: 10,
  },
  columnIndex: {
    borderRadius: 100,
    width: '1.5rem',
    height: '1.5rem',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: 'white',
  },
  breakWord: {
    wordBreak: 'break-word',
  },
  showMoreContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  showMore: {
    cursor: 'pointer',
    color: 'white',
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  truncateText: {
    display: '-webkit-box',
    WebkitLineClamp: 6,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: '50vh',
    backgroundColor: '#303444',
    border: '2px solid #000',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.2)',
    padding: 16,
    borderRadius: 10,
    overflowY: 'auto',
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
}));

export default Card;
