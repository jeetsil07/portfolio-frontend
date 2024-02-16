import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hook";
import { Box, Grid, Typography } from "@mui/material";
import { getNavBarState } from "../slices/ui";
import jeet1 from "../assets/img/jeet1.jpeg";
import jeet2 from "../assets/img/jeet2.jpeg";
import { Cursor, useTypewriter } from "react-simple-typewriter";
const Home = () => {
  console.log("home");
  const { navBar } = useAppSelector(getNavBarState);
  const [typing] = useTypewriter({
    words: ["Software Developer", "UI/UX Designer", "Professional YouTuber"],
    loop: false,
  });
  return (
    <>
      <Box
        sx={{
          marginTop: `${navBar.height}px`,
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100%",
            Height: "auto",
            paddingTop: "20px",
          }}
        >
          <Grid item sm={3} sx={{ marginBottom: "10px" }}>
            <Box
              sx={{
                height: "200px",
                width: "200px",
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: "0 0 0 10px white, 0 0 0 15px #47A992",
              }}
            >
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
            </Box>
          </Grid>
          <Grid item sm={5} sx={{ margin: "20px 10px" }}>
            <Typography variant="h5" color="initial">
              <span style={{ color: "#47A992" }}>I'm a</span>{" "}
              <span style={{ color: "#FF0060" }}>{typing}</span>
              <Cursor cursorColor="#FF0060" cursorBlinking cursorStyle="_" />
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ textAlign: "left", marginTop: "10px" }}
            >
              As a professional software developer, I bring a unique blend of
              academic excellence and creative flair to my work. With a
              background in BCA from MAKAUT and Botany Honours from Calcutta
              University, I possess a diverse skill set that enables me to
              approach problems from different perspectives. Beyond my technical
              expertise, I have a deep passion for writing and creating YouTube
              videos, allowing me to communicate complex ideas in a clear and
              engaging manner. Coding is not just a profession for me; it's a
              passion that drives me to constantly learn and innovate.{" "}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
