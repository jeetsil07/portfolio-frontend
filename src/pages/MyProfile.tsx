import { Box, Button, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hook';
import { getUiUxState } from '../slices/ui';
import { ContentBox } from '../components/StyledComponents/CommonStyle';
import { useNavigate } from 'react-router-dom';
import routes from '../util/routes';
import { getUserData, setUserData } from '../slices/user';

const MyProfile = () => {
  console.log('MyProfile')
  const { navBar } = useAppSelector(getUiUxState);
  const navigate = useNavigate()
  const hadleLogout = ()=>{
    localStorage.removeItem('authTokens');
    navigate(routes.login)
  }
  const { user } = useAppSelector(getUserData);
  const dispatch = useAppDispatch()
  const storedTokens = localStorage.getItem("authTokens");
  useEffect(() => {
    if (storedTokens) {
      const { user } = JSON.parse(storedTokens);
      if (user) {
        dispatch(
          setUserData({
            user_id: user.user_id,
            is_superuser: user.is_superuser,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name
          })
        )
      }
    }
  },[storedTokens])
  return (
    <>
      <ContentBox topmargin={navBar.height}>
        <Grid container spacing={5} justifyContent={'center'} mt={5} mb={8}>
          <Grid item sm={5} xs={12}>
           <button
            onClick={hadleLogout}
           >Logout</button>
          </Grid>
          <Grid item sm={5} xs={12}>
           
          </Grid>
        </Grid>

      </ContentBox>
    </>
  )
}

export default MyProfile