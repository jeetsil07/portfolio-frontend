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
              <span style={{ color: primaryColor }}>I'm</span>{" "}
              <span style={{ color: secondaryColor, padding: "15px 0" }}>
                <Typewriter
                  words={["software developer", "ui/ux designer", "doing journey with machine learning"]}
                  loop={false}
                  cursor
                  cursorStyle="_"
                  typeSpeed={60}
                  deleteSpeed={40}
                />
              </span>
            </Typography>
            <AboutText variant="subtitle2" color="GrayText">
              I am a passionate Software Developer with 2 years of experience in
              web development, specializing in creating dynamic and
              user-friendly websites. I am eager to learn new technologies and
              enjoy exploring innovative ways to implement them through hands-on
              projects. Alongside my professional work, I also take up freelance
              projects, helping clients bring their ideas to life with creative
              and efficient solutions. Beyond coding, I find joy in activities
              that balance my technical pursuits with creativity and relaxation.
              I love playing carrom, which hones my focus and strategy skills,
              and I’m an avid listener of audio stories on radio stations, which
              fuel my imagination and provide inspiration for my work. With a
              curious mind and a dedication to continuous learning, I aim to
              grow as a developer while delivering meaningful and impactful
              projects that solve real-world problems.
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
