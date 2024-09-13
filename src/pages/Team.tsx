import React from "react";
import { ContentBox } from "../components/StyledComponents/CommonStyle";
import { useAppSelector } from "../app/hook";
import { getUiUxState } from "../slices/ui";
import { Grid, Typography } from "@mui/material";
import { primaryColor } from "../util/constant";
import UserCard from "../components/business/UserCard";
import { useGetMembersQuery } from "../services/members.service";
import {
    StyleCardContainer,
  StyleCardWrapper,
  StyleTeamContent,
  StyleTeamHeading,
} from "../components/StyledComponents/TeamStyle";
const Team = () => {
  const { navBar } = useAppSelector(getUiUxState);
  const { data } = useGetMembersQuery({});
  return (
    <ContentBox topmargin={navBar.height} minHeight="80vh">
      <StyleTeamContent container mb={5}>
        <StyleTeamHeading variant="h5">Our Team</StyleTeamHeading>
      </StyleTeamContent>
      <StyleCardContainer container>
        {data &&
          data.data.length > 0 &&
          data.data.map((member: any, index: any) => (
            <StyleCardWrapper item key={index} m={2}>
              <UserCard member={member} />
            </StyleCardWrapper>
          ))}
      </StyleCardContainer>
    </ContentBox>
  );
};

export default Team;
