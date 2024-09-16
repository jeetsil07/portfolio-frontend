import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { secondaryColor } from "../../util/constant";

export const StyledPostContainer = styled(Grid)`
  justify-content: space-between;
`;
export const StyledPostWrapper = styled(Grid)``;
export const StyledSelectedPostArea = styled(Grid)`
  flex-direction: column;
`;
export const StyledSelectedPostHeader = styled(Grid)``;

export const StyledSelectedPostTitle = styled(Typography)`
  color: gray;
  margin: 10px 0;
`;

export const StyledSelectedPostCategory = styled(Typography)`
  color: gray;
`;

export const StyledSelectedPostDate = styled(Typography)`
  color: gray;
`;

export const StyledPostImageCard = styled(Card)`
  max-width: 600;
  margin: 30px auto;
  box-shadow: none;
`;

export const StyledPostDescriptionHolder = styled(Grid)`
  padding: 5px;
  text-align: justify;
`;

export const StyledPostCommentSecTitle = styled(Typography)`
  color: Gray;
`;

export const StyledNoComment = styled(Typography)`
  color: Gray;
  text-align: center;
  margin-top: 16px;
`;

export const StyledPostCommentFieldHolder = styled(Grid)`
  padding: 10px 0;
`;

export const StyledPostCommentSecHolder = styled(Grid)`
  padding: 8px 0;
`;

export const StyledPostCommentShowBtn = styled(Button)<{colorCode: string}>`
  margin: 16px;
  color: ${(props)=>props.colorCode};
`;
