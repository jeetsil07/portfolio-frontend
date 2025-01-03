import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { primaryColor, secondaryColor } from "../../util/constant";
import { ImageBoxProps } from "../../util/type/types";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditOffIcon from "@mui/icons-material/EditOff";

export const UserDetailsHolder = styled(Paper)`
  padding: 16px;
`;

export const UserPhotoContainer = styled(Grid)`
  justify-content: space-between;
  margin-bottom: 40px;

  & img {
    height: 100%;
    width: 100%;
    object-fit: contain !important;
  }
`;

export const StyledTextField = styled(TextField)`
  margin-top: 16px !important;

  .MuiInput-underline:before {
    border-bottom-color: ${primaryColor}; // Default
  }

  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom-color: ${primaryColor}; // Hover
  }

  .MuiInput-underline:after {
    border-bottom-color: ${primaryColor}; // Active
  }

  input {
    color: ${primaryColor}; // Change the input text color
  }

  label {
    color: ${primaryColor}; // Change the label color
  }
`;

export const StyledBioField = styled(TextField)`
  margin-top: 16px !important;
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

export const UserDetailsContainer = styled(Grid)`
  justify-content: space-between;
  align-items: start;
  amrgin: 16px 0;
`;

export const UserDetailsPoints = styled(Typography)`
  color: ${primaryColor};
`;

export const UserDetailsAns = styled(Typography)`
  color: ${secondaryColor};
  text-align: end;
`;

export const StyledEditOffIcon = styled(EditOffIcon)`
  color: ${secondaryColor};
  cursor: pointer;
`;

export const StyledEditNoteIcon = styled(EditNoteIcon)`
  color: ${primaryColor};
  cursor: pointer;
`;
