import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getUiUxState } from "../slices/ui";
import { ContentBox } from "../components/StyledComponents/CommonStyle";
import SignUp from "../components/forms/SignUp";
import SignIn from "../components/forms/SignIn";
import { setUserData } from "../slices/user";

const Login = () => {
  const { navBar } = useAppSelector(getUiUxState);

  const dispatch = useAppDispatch();
  const storedTokens = localStorage.getItem("authTokens");
  useEffect(() => {
    if (!storedTokens) {
      dispatch(
        setUserData({
          user_id: "",
          is_superuser: false,
          email: "",
          first_name: "",
          last_name: "",
        })
      );
    }
  }, [storedTokens]);

  return (
    <>
      <ContentBox topmargin={navBar.height}>
        <Grid container spacing={5} justifyContent={"center"} mt={5} mb={8}>
          <Grid item sm={5} xs={12}>
            <SignUp />
          </Grid>
          <Grid item sm={5} xs={12}>
            <SignIn />
          </Grid>
        </Grid>
      </ContentBox>
    </>
  );
};

export default Login;
