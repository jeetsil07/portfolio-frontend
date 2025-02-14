import styled from "styled-components";
import {
  Button,
  Card,
  Chip,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { primaryColor, secondaryColor } from "../../util/constant";

export const StyledFilterContainer = styled(Grid)`
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const StyledCategoryName = styled(Typography)`
  color: Gray;
`;

export const StyledButton = styled(Button)`
  color: ${primaryColor} !important;
  & .MuiSvgIcon-root {
    color: ${primaryColor};
  }
`;

export const StyledBlogContainer = styled(Grid)``;

export const StyledBlogLeft = styled(Grid)``;

export const StyledBlogCard = styled(Card)`
  padding: 5px;
  margin: 10px;
`;

export const StyledBlogPagination = styled(Pagination)`
  align-self: center;
  & .MuiPaginationItem-root {
    color: ${primaryColor};
  }
  & .Mui-selected {
    background-color: ${secondaryColor} !important;
    color: white;
    transform: scale(1.2);
  }
`;

export const StyledBlogPlaceHolder = styled(Stack)`
  margin: 50px auto 25px;
`;

export const StyledBlogCategoryHolder = styled(Grid)``;

export const StyledBlogCategoryTitle = styled(Typography)`
  margin: 5px;
  margin-bottom: 10px;
  color: gray;
`;

export const StyledCategoryChip = styled(Chip)<{ selectedCategory: boolean }>`
  &.MuiChip-root {
    margin: 3px;
    background-color: ${(props) =>
      props.selectedCategory  ? primaryColor : "inherit"} !important;
    color: ${(props) => (props.selectedCategory  ? "#fff" : "inherit")} !important;
    &:hover {
      background-color: ${primaryColor} !important;
      color: #fff !important;
    }
  }
`;
