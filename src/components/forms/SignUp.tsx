import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { primaryColor, secondaryColor } from "../../util/constant";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRegisterUserMutation } from "../../services/UserRegistration.service";
import { ClosePasswordIcon, ShowPasswordIcon, SignupButton, SignUpFormError, SignUpFormPaper, SignUpFormTitle, StyledSignUpField } from "../StyledComponents/SignupStyle";

const SignUp = () => {
  const [userRegisterData, setUserRegisterData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [cpass, setcpass] = useState("");
  const [passError, setPassError] = useState("");
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const [cpasswordFieldType, setCpasswordFieldType] = useState("password");
  const [fieldError, setFieldError] = useState("");
  useEffect(() => {
    const hasEmptyFields = Object.values(userRegisterData).some(value => value === "");
    
    if (!hasEmptyFields && passError === "") {
      setFieldError("");
    }
  }, [userRegisterData, passError]);
  const handleRegisterData = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserRegisterData((prevState) => ({
      ...prevState, // Preserve the existing fields
      [field]: e.target.value, // Update the specific field (email or password)
    }));
  };
  const handleConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setcpass(e.target.value);
  };

  useEffect(() => {
    if (cpass === userRegisterData.password) {
      setPassError("");
    }
    if (cpass !== userRegisterData.password) {
      setPassError("Please Confirm the Password");
    }
  }, [cpass, userRegisterData.password]);

  const [userRegister, { isLoading }] = useRegisterUserMutation();

  const handleRegisterSubmit = async () => {
    try {
      if (
        userRegisterData.first_name === "" ||
        userRegisterData.last_name === "" ||
        userRegisterData.email === "" ||
        userRegisterData.password === ""
      ) {
        setFieldError("All Fields are required");
        return;
      }
      if (passError !== "") {
        return;
      }
      if (
        userRegisterData.first_name === "" &&
        userRegisterData.last_name === "" &&
        userRegisterData.email === "" &&
        userRegisterData.password === ""
      ) {
        setFieldError("");
      }
      const response = await userRegister(userRegisterData).unwrap();
    } catch (error: any) {
      console.log("sign up error", error);
      if (error.status === 400) {
        // Validation errors from the server
        // Check if the error contains email-related errors
        if (error.data?.data.email) {
          setFieldError(error.data.data.email[0]); // Display the first email-related error
        } else {
          setFieldError("Invalid input. Please check the fields.");
        }
      } else if (error.status >= 500) {
        // Server errors (500+)
        setFieldError(
          "Server is currently unavailable. Please try again later."
        );
      } else {
        // General error handling
        setFieldError("An unexpected error occurred. Please try again.");
      }
    }
  };
  return (
    <>
      <SignUpFormPaper
        elevation={3}
      >
        <SignUpFormTitle variant="h5" >
          Sign up
        </SignUpFormTitle>
        {fieldError !== "" && (
          <SignUpFormError
            variant="caption"
          >
            {fieldError}
          </SignUpFormError>
        )}
        <StyledSignUpField
          autoComplete="off"
          variant="outlined"
          placeholder="Enter User First Name"
          label={"First Name"}
          fullWidth
          onChange={(e) => handleRegisterData("first_name", e)}
          value={userRegisterData.first_name}
        />

        <StyledSignUpField
          autoComplete="off"
          variant="outlined"
          placeholder="Enter User Last Name"
          label={"Last Name"}
          fullWidth
          onChange={(e) => handleRegisterData("last_name", e)}
          value={userRegisterData.last_name}
        />
        <StyledSignUpField
          autoComplete="new-email"
          variant="outlined"
          placeholder="Enter User Valid Email"
          label={"Email"}
          fullWidth
          onChange={(e) => handleRegisterData("email", e)}
          value={userRegisterData.email}
        />
        <StyledSignUpField
          autoComplete="new-password"
          variant="outlined"
          placeholder="Add Password"
          type={passwordFieldType}
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
          onChange={(e) => handleRegisterData("password", e)}
          value={userRegisterData.password}
        />
        <StyledSignUpField
          autoComplete="off"
          variant="outlined"
          placeholder="Confirm Password"
          label={"Confirm Password"}
          type={cpasswordFieldType}
          fullWidth
          helperText={passError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {cpasswordFieldType === "password" ? (
                  <IconButton onClick={() => setCpasswordFieldType("text")}>
                    <ShowPasswordIcon/>
                  </IconButton>
                ) : (
                  <IconButton onClick={() => setCpasswordFieldType("password")}>
                    <ClosePasswordIcon/>
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleConfirmPassword(e)}
          value={cpass}
        />

        <SignupButton
          variant="contained"
          onClick={handleRegisterSubmit}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </SignupButton>
      </SignUpFormPaper>
    </>
  );
};

export default SignUp;
