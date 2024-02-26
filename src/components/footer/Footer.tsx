import { Box, Grid } from '@mui/material'
import React from 'react'
import { FooterContainer, GridContainer } from '../StyledComponents/CommonStyle'

const Footer = () => {
  return (
    <>
        <Box>
            <FooterContainer>
                 <Grid container>
                    <Grid item xs={2}>
                    </Grid>
                 </Grid>
            </FooterContainer>
        </Box>
    </>
  )
}

export default Footer