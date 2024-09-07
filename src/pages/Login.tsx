import { Box, Button, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hook';
import { getUiUxState, setPostCategory, setPostData } from '../slices/ui';
import { ContentBox } from '../components/StyledComponents/CommonStyle';
import SignUp from '../components/forms/SignUp';
import SignIn from '../components/forms/SignIn';
import { getUserData, setUserData } from '../slices/user';
import { useGetPostsCategoryQuery } from '../services/postsCategory.service';
import { useGetPostsQuery } from '../services/posts.service';

const Login = () => {
  const { navBar, postCategory, postData } = useAppSelector(getUiUxState);

  // const { data: postCategories, isLoading: categoryLoading } =
  //   useGetPostsCategoryQuery({});
  // useEffect(() => {
  //   if (!postCategories || postCategories.status !== 200) return;
  //   dispatch(
  //     setPostCategory({
  //       data: postCategories.data,
  //     })
  //   );
  // }, [postCategories]);
  // const { data: postdata, isLoading } = useGetPostsQuery(
  //   postCategory.selectedCategory,
  //   {
  //     skip: Object.values(postCategory.selectedCategory).length === 0,
  //   }
  // );

  // useEffect(() => {
  //   if (!postdata || postdata.status !== 200) return;

  //   dispatch(
  //     setPostData({
  //       data: postdata,
  //     })
  //   );
  // }, [postdata]);

  const { user } = useAppSelector(getUserData);
  const dispatch = useAppDispatch()
  const storedTokens = localStorage.getItem("authTokens");
  useEffect(() => {
    if (!storedTokens) {
      dispatch(
        setUserData({
          user_id: '',
          is_superuser: false,
          email: '',
          first_name: '',
          last_name: ''
        })
      )
    }
  }, [storedTokens])

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