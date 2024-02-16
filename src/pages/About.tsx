import { Box } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../app/hook';
import { getNavBarState } from '../slices/ui';

const About = () => {
  const {navBar} = useAppSelector(getNavBarState);
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