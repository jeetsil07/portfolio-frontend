import React from "react";
import { useAppSelector } from "../app/hook";
import { Box, Grid, Typography } from "@mui/material";
import { getUiUxState } from "../slices/ui";
// import jeet1 from "../assets/img/jeet1.jpeg";
import jeet2 from "../assets/img/jeet2.jpeg";
import bgImg from "../assets/img/bgImg.png";
import { Typewriter } from "react-simple-typewriter";
import CloudDownloadTwoToneIcon from "@mui/icons-material/CloudDownloadTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import Groups2Icon from "@mui/icons-material/Groups2";
import {
  AboutText,
  ContentBox,
  CustomButton,
  GridContainer,
  ImageBox,
  ImageBoxContainer,
  StyleBioArea,
  StyledButton,
} from "../components/StyledComponents/CommonStyle";
import Skills from "../components/business/Skills";
import Projects from "../components/business/Projects";
import { primaryColor, secondaryColor } from "../util/constant";
import { useGetResumeQuery } from "../services/resume.service";
import { useNavigate } from "react-router-dom";
import routes from "../util/routes";
const Home = () => {
  const { navBar } = useAppSelector(getUiUxState);
  const { data, error, isLoading } = useGetResumeQuery({});
  const navigate = useNavigate();
  const handleDownload = () => {
    if (data) {
      const url = URL.createObjectURL(
        new Blob([data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf"); // Set the download file name
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up the object URL
    }
  };
  const handleTeam = () => {
    navigate(routes.team);
    // Scroll to top after navigation
    window.scrollTo(0, 0);
  };
  return (
    <>
      <ContentBox topmargin={navBar.height} bgimg={bgImg}>
        <GridContainer container>
          <ImageBoxContainer item md={3}>
            <ImageBox>
              <img src={jeet2} alt="Jeet" />
            </ImageBox>
          </ImageBoxContainer>
          <StyleBioArea item lg={5}>
            <Typography variant="h5" color="initial">
              <span style={{ color: primaryColor }}>I'm a</span>{" "}
              <span style={{ color: secondaryColor, padding: "15px 0" }}>
                <Typewriter
                  words={["Software Developer", "UI/UX Designer", "YouTuber"]}
                  loop={false}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                />
              </span>
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
              passion that drives me to constantly learn and innovate.jeet{" "}
            </AboutText>
          </StyleBioArea>
        </GridContainer>
      </ContentBox>
      <Box>
        <ContentBox>
          <GridContainer container justifyContent="center" alignItems="center">
            <StyledButton
              spaceMargin={true}
              onClick={handleDownload}
              variant="contained"
              endIcon={<CloudDownloadTwoToneIcon />}
            >
              Download Resume
            </StyledButton>
            <StyledButton
              spaceMargin={true}
              variant="contained"
              endIcon={<Groups2Icon />}
              onClick={handleTeam}
            >
              Our Team
            </StyledButton>
          </GridContainer>
        </ContentBox>
      </Box>
      <Skills />
      {process.env.REACT_APP_SHOW_PROJECT_MODULE === "true" && <Projects />}
    </>
  );
};

export default Home;
