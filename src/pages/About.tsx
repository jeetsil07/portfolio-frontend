import { Box } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../app/hook';
import { getUiUxState } from '../slices/ui';

const About = () => {
  console.log('about')
  const {navBar} = useAppSelector(getUiUxState);
  return (
    <Box sx={{
        width: '100%',
        minHeight:'150vh',
        backgroundColor:'blue',
        marginTop: `${navBar.height}px`
    }}></Box>
  )
}

export default About