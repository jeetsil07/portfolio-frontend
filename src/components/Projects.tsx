import React from 'react'
import { ContentBox, CustomButton, GridContainer } from './StyledComponents/CommonStyle'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
// import DetailsTwoToneIcon from '@mui/icons-material/DetailsTwoTone';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import "../swiperStyle/swiper.css"

// import required modules
import { Keyboard, Navigation, Pagination } from 'swiper/modules';

const Projects = () => {
  const AllProjects = [
    {
      title: "Project1",
      desc: "Lizards are a widespread group of squamate reptiles, with over 6,000...",
      video: "https://www.youtube-nocookie.com/embed/EXs775-J5zE?si=GtnS4137v_wMvl_n",
      id: 1
    },
    {
      title: "Project2",
      desc: "Lizards are a widespread group of squamate reptiles, with over 6,000...",
      video: "https://www.youtube-nocookie.com/embed/EXs775-J5zE?si=GtnS4237v_wMvl_n",
      id: 2
    },
    {
      title: "Project3",
      desc: "Lizards are a widespread group of squamate reptiles, with over 6,000...",
      video: "https://www.youtube-nocookie.com/embed/EXs775-J5zE?si=GtnS4137v_wMvl_n",
      id: 3
    },
    {
      title: "Project4",
      desc: "Lizards are a widespread group of squamate reptiles, with over 6,000...",
      video: "https://www.youtube-nocookie.com/embed/EXs775-J5zE?si=GtnS4137v_wMvl_n",
      id: 4
    }, {
      title: "Project4",
      desc: "Lizards are a widespread group of squamate reptiles, with over 6,000...",
      video: "https://www.youtube-nocookie.com/embed/EXs775-J5zE?si=GtnS4137v_wMvl_n",
      id: 4
    }, {
      title: "Project4",
      desc: "Lizards are a widespread group of squamate reptiles, with over 6,000...",
      video: "https://www.youtube-nocookie.com/embed/EXs775-J5zE?si=GtnS4137v_wMvl_n",
      id: 4
    }, {
      title: "Project4",
      desc: "Lizards are a widespread group of squamate reptiles, with over 6,000...",
      video: "https://www.youtube-nocookie.com/embed/EXs775-J5zE?si=GtnS4137v_wMvl_n",
      id: 4
    }
  ]
  return (
    <>
      <Box>
        <ContentBox>
          <Typography variant="h4" align='center' margin={3} sx={{ color: "#47A992" }}>PROJECTS AND WORK</Typography>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            // navigation={true}
            keyboard={{
              enabled: true,
            }}
            breakpoints={{
              '@0.00': {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              '@0.50': {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              '@0.75': {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              // '@1.00': {
              //   slidesPerView: 4,
              //   spaceBetween: 40,
              // }              
            }}
            modules={[
              Pagination,
               Keyboard,
              // Navigation
            ]}
          >
            {
              AllProjects.map((project, index) => (
                <SwiperSlide key={index}>
                  <Card sx={{
                    maxWidth: 400, Height: 'auto', marginBottom: '50px', transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}>
                    <CardMedia sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                      <iframe width="100%" height="30%" src={project.video} title="Project Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.desc}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <CustomButton size="small" variant='contained' endIcon={<SendIcon/>}>More Details</CustomButton>
                    </CardActions>
                  </Card>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </ContentBox>
      </Box>
    </>
  )
}

export default Projects