import { Box, Button, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hook';
import { getUiUxState } from '../slices/ui';
import { ContentBox } from '../components/StyledComponents/CommonStyle';
import SignUp from '../components/forms/SignUp';
import SignIn from '../components/forms/SignIn';
import { getUserData, setUserData } from '../slices/user';

const Login = () => {
  
  const { user } = useAppSelector(getUserData);
  const dispatch = useAppDispatch()
  const storedTokens = localStorage.getItem("authTokens");
  useEffect(() => {
    if (!storedTokens) {      
      dispatch(
        setUserData({
          user_id: '',
          is_superuser: false,
          email:'',
          first_name:'',
          last_name:''
        })
      )
    }
  },[storedTokens])

  const { navBar } = useAppSelector(getUiUxState);
  return (
    <>
      <ContentBox topmargin={navBar.height}>
        <Grid container spacing={5} justifyContent={'center'} mt={5} mb={8}>
          <Grid item sm={5} xs={12}>
            <SignUp />
          </Grid>
          <Grid item sm={5} xs={12}>
            <SignIn />
          </Grid>
        </Grid>

      </ContentBox>
    </>
  )
}

export default Login