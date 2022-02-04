import React from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
//Блок для отображения модальных окон и их кнопок окрытия
export default function Display({
  isVisible,
  openHandler,
  buttonText,
  children
}) {
  return (
    <Box sx={{mb:5}}>
      {isVisible && children}
      <Button variant="contained" onClick={openHandler}>{buttonText}</Button>
    </Box>
  );
}
