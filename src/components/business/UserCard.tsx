import React from "react";
import {
  Avatar,
  Card,
  Typography,
  Box,
  CardContent,
  CardHeader,
} from "@mui/material";
import { primaryColor } from "../../util/constant";
import {
  StyledUserCard,
  StyledUserCardAvatar,
  StyledUserCardContent,
  StyledUserName,
} from "../StyledComponents/TeamStyle";

const UserCard = ({ member }: any) => {
  return (
    <StyledUserCard>
      <StyledUserCardContent>
        <StyledUserCardAvatar src={member.image} alt={member.first_name} />
        <StyledUserName variant="h6">
          {member.first_name + " " + member.last_name}
        </StyledUserName>
        <Typography
          variant="body2"         
        >
          {member.bio}
        </Typography>
      </StyledUserCardContent>
    </StyledUserCard>
  );
};

export default UserCard;
