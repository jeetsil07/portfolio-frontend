import React from "react";
import { useAppSelector } from "../app/hook";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getNavBarState } from "../slices/ui";
import jeet1 from "../assets/img/jeet1.jpeg";
import jeet2 from "../assets/img/jeet2.jpeg";
import bgImg from "../assets/img/bgImg.png";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import CloudDownloadTwoToneIcon from '@mui/icons-material/CloudDownloadTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import {
  AboutText,
  ContentBox,
  CustomButton,
  GridContainer,
  ImageBox,
} from "../components/StyledComponents/common";
const Home = () => {
  console.log("home");
  const { navBar } = useAppSelector(getNavBarState);
  const [typing] = useTypewriter({
    words: ["Software Developer", "UI/UX Designer", "Professional YouTuber"],
    loop: false,
  });
  return (
    <>
      <ContentBox topMargin={navBar.height} bgImg={bgImg}>
        <GridContainer container justifyContent="center" alignItems="center">
          <Grid item md={3} sx={{ marginBottom: "10px" }}>
            <ImageBox>
              <img
                // src={jeet1}
                src={jeet2}
                // src="https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Jeet"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </ImageBox>
          </Grid>
          <Grid item lg={5} sx={{ margin: "20px 10px" }}>
            <Typography variant="h5" color="initial">
              <span style={{ color: "#47A992" }}>I'm a</span>{" "}
              <span style={{ color: "#FF0060" }}>{typing}</span>
              <Cursor cursorColor="#FF0060" cursorStyle="_" />
            </Typography>
            <AboutText variant="subtitle2" color="GrayText">
              As a professional software developer, I bring a unique blend of
              academic excellence and creative flair to my work. With a
              background in BCA from MAKAUT and Botany Honours from Calcutta
              University, I possess a diverse skill set that enables me to
              approach problems from different perspectives. Beyond my technical
              expertise, I have a deep passion for writing and creating YouTube
              videos, allowing me to communicate complex ideas in a clear and
              engaging manner. Coding is not just a profession for me; it's a
              passion that drives me to constantly learn and innovate.{" "}
            </AboutText>
          </Grid>
        </GridContainer>
      </ContentBox>
      <Box>
        <ContentBox >
          <GridContainer container justifyContent="center" alignItems="center">
                <CustomButton btnColor="#FF0060" variant="contained" endIcon={<CloudDownloadTwoToneIcon/>} >Download Resume</CustomButton>
                <CustomButton variant="contained" endIcon={<InfoTwoToneIcon/>} >About Me</CustomButton>
          </GridContainer>
        </ContentBox>
      </Box>
    </>
  );
};

export default Home;
