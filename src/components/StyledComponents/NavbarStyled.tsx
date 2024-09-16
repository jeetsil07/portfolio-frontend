import styled from "styled-components";
import {
  AppBar,
  Drawer,
  FilledTextFieldProps,
  Grid,
  ListItemText,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  Tabs,
  TextField,
  TextFieldVariants,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { JSX } from "react/jsx-runtime";
import { primaryColor } from "../../util/constant";

export const StyledAppBar = styled(AppBar)<{ primaryColor: string }>`
  background-color: ${(props) => props.primaryColor} !important;
  padding: 5px 20px;
  color: inherit; /* Ensure the default color prop doesn't override */
`;

export const StyledToolBarGrid = styled(Grid)`
  display: flex !important;
  flex-wrap: nowrap !important;
  justify-content: space-between;
  align-items: center;
  gap: 16px; /* equivalent to spacing={2} which is 8px * 2 */
`;

export const StyledLogoContainer = styled(Grid)``;

export const StyledTabContainer = styled(Grid)``;

export const StyledTabs = styled(Tabs)`
  & .MuiTabs-indicator {
    background-color: white;
  }
`;

export const StyledSearchContainer = styled(Grid)``;

export const StyledSearchField = styled(
  (
    props: JSX.IntrinsicAttributes & {
      variant?: TextFieldVariants | undefined;
    } & Omit<
        OutlinedTextFieldProps | FilledTextFieldProps | StandardTextFieldProps,
        "variant"
      >
  ) => <TextField {...props} />
)`
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: white; // Set outline color
    }
    &:hover fieldset {
      border-color: white; // Set outline color on hover
    }
    &.Mui-focused fieldset {
      border-color: white; // Set outline color when focused
    }
  }

  & .MuiInputBase-input {
    color: white; // Set input text color
  }

  & .MuiInputLabel-root {
    color: white !important; // Set label color
  }
`;
export const StyledSearchIcon = styled(SearchIcon)`
  color: white; // Set icon color
`;

export const StyledDrawerContainer = styled(Grid)`
  display: flex;
  justify-content: center;
`;

export const StyledListItemText = styled(ListItemText)<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? primaryColor : "")};
  padding-left: 30px;
  min-width: 100px;
`;

export const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    width: 200px;
  }
`;

export const StyledDrawerInnerContainer = styled(Grid)<{ primaryColor: string }>`
  background-color: ${(props) => props.primaryColor} !important;
  padding: 10px !important;
  align-items: center;
`;