import styled from "@emotion/styled";
import {
  Button,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  Paper,
  StandardTextFieldProps,
  TextField,
  TextFieldVariants,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { primaryColor, secondaryColor } from "../../util/constant";

export const LoginFormPaper = styled(Paper)`
  padding: 10px !important;
`;

export const LoginFormTitle = styled(Typography)`
  color: ${secondaryColor};
  margin: 16px 0;
`;

export const LoginFormError = styled(Typography)`
  color: ${secondaryColor};
  margin: 16px 0;
  display: inline-block;
`;

export const StyledLoginField = styled(
  (
    props: JSX.IntrinsicAttributes & {
      variant?: TextFieldVariants | undefined;
    } & Omit<
        OutlinedTextFieldProps | FilledTextFieldProps | StandardTextFieldProps,
        "variant"
      >
  ) => <TextField {...props} />
)`
  margin-top: 16px;
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${primaryColor}; // Set outline color
    }
    &:hover fieldset {
      border-color: ${primaryColor}; // Set outline color on hover
    }
    &.Mui-focused fieldset {
      border-color: ${primaryColor}; // Set outline color when focused
    }
  }
  & .MuiFormHelperText-root {
    color: ${secondaryColor}; // Set input text color
  }
  & .MuiInputBase-input {
    color: ${primaryColor}; // Set input text color
  }

  & .MuiInputLabel-root {
    color: ${primaryColor} !important; // Set label color
  }
`;

export const ShowPasswordIcon = styled(VisibilityIcon)`
  color: ${primaryColor};
`;
export const ClosePasswordIcon = styled(VisibilityOffIcon)`
  color: ${secondaryColor};
`;

export const LoginButton = styled(Button)`
  background-color: ${primaryColor};
  margin-top: 16px;
  width: 100%;
  &:hover {
    background-color: ${secondaryColor};
  }
`;
