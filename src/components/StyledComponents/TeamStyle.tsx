import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import { primaryColor } from "../../util/constant";

export const StyleTeamContent = styled(Grid)``;

export const StyleTeamHeading = styled(Typography)`
  margin: auto !important;
  color: ${primaryColor};
`;

export const StyleCardContainer = styled(Grid)`
  justify-content: center;
`;

export const StyleCardWrapper = styled(Grid)``;

export const StyledUserCard = styled(Card)`
  width: 180px;
  height: 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(25, 118, 210, 0.08) !important;
`;

export const StyledUserCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledUserCardAvatar = styled(Avatar)`
  width: 50;
  height: 50;
  margin-bottom: 2;
`;

export const StyledUserName = styled(Typography)`
  color: ${primaryColor};
  margin: 10px 0 !important;
  text-align: center;
`;
