import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { primaryColor, secondaryColor } from "../../util/constant";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLoginUserMutation } from "../../services/login.service";
import routes from "../../util/routes";
import { useNavigate } from "react-router-dom";
import { ClosePasswordIcon, LoginButton, LoginFormError, LoginFormPaper, LoginFormTitle, ShowPasswordIcon, StyledLoginField } from "../StyledComponents/LoginStyle";

const SignIn = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [fieldError, setFieldError] = useState("");
  const [passwordFieldType, setPasswordFieldType] = useState("password");

  const handleLoginData = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginData((prevState) => ({
      ...prevState, // Preserve the existing fields
      [field]: e.target.value, // Update the specific field (email or password)
    }));
  };

  const [userLogin, { isLoading }] = useLoginUserMutation();

  const handleLoginSubmit = async () => {
    try {
      if (loginData.email === "" || loginData.password === "") {
        setFieldError("All Fields are required");
        return;
      }
      if (loginData.email !== "" && loginData.password !== "") {
        setFieldError("");
      }
      const response = await userLogin(loginData).unwrap();
      console.log("response", response);
      localStorage.setItem("authTokens", JSON.stringify(response.data)); // Store the token
      // Proceed with further actions like redirecting or fetching user data
      navigate(routes.profile);
      // Scroll to top after navigation
      window.scrollTo(0, 0);
    } catch (error: any) {
      console.log("error", error);
      // Handle client errors (status code 400)
      if (error.status === 400) {
        console.log("check1");
        setFieldError(
          error.data.data.email
            ? error.data.data.email[0]
            : "Invalid credentials."
        );
      }

      // Handle server errors (status codes 500, 502, 503, etc.)
      else if ([500, 502, 503, 504].includes(error.status)) {
        setFieldError("The server is currently unavailable.");
      }
      // Handle any other errors
      else {
        setFieldError(
          "An unexpected error occurred. Try again after some time..."
        );
      }
    }
  };

  return (
    <>
      <LoginFormPaper
        elevation={3}
      >
        <LoginFormTitle variant="h5">
          Sign in
        </LoginFormTitle>
        {fieldError !== "" && (
          <LoginFormError
            variant="caption"
          >
            {fieldError}
          </LoginFormError>
        )}
        <StyledLoginField
          variant="outlined"
          placeholder="Enter User Valid Email"
          label={"Email"}
          fullWidth
          onChange={(e) => handleLoginData("email", e)}
          value={loginData.email}
        />
        <StyledLoginField
          variant="outlined"
          type={passwordFieldType}
          placeholder="Enter Valid Password"
          label={"Password"}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {passwordFieldType === "password" ? (
                  <IconButton onClick={() => setPasswordFieldType("text")}>
                    <ShowPasswordIcon/>
                  </IconButton>
                ) : (
                  <IconButton onClick={() => setPasswordFieldType("password")}>
                    <ClosePasswordIcon/>
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleLoginData("password", e)}
          value={loginData.password}
        />
        <LoginButton
          variant="contained"
          onClick={handleLoginSubmit}
        >
          {isLoading ? "Loading..." : "Sign in"}
        </LoginButton>
      </LoginFormPaper>
    </>
  );
};

export default SignIn;
