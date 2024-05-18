import { Grid, ImageList, ImageListItem, Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../app/hook';
import { getUiUxState } from '../slices/ui';
import { ContentBox } from '../components/StyledComponents/CommonStyle';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab';

import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

const About = () => {
  console.log('about')
  const { navBar } = useAppSelector(getUiUxState);
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      cols: 2,
    },
  ];
  function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  return (
    <>
      <ContentBox topmargin={navBar.height}>
        <Grid container justifyContent={'center'}>
          <Grid item sm={8}>
            <Typography variant="h4" align='center' margin={3} sx={{ color: "#47A992" }}>🖐️ Know About Me</Typography>
            <Typography variant="body2" m={2} align='center' color="GrayText">🧑‍💻 I am a Software Developer.</Typography>
            <Typography variant="body2" m={2} align='center' color="GrayText">🆓 In my free time, I enjoy to listen 🎵 musics and experimenting with new 🧑‍🍳 recipes in the kitchen.</Typography>
            <Typography variant="body2" m={2} align='center' color="GrayText">🏆 My success mantra is 'Always be learning.' I believe that continuous learning and improvement are key to personal and professional growth.</Typography>
            <Typography variant="body2" m={2} align='center' color="GrayText">💻 I'm a tech enthusiast and love exploring the latest gadgets.</Typography>
            <Typography variant="body2" m={2} align='center' color="GrayText">✒️ One of my favorite quotes is 'I have not failed. I've just found 10,000 ways that won't work.' - Thomas Edison</Typography>
            <Typography variant="body2" m={2} align='center' color="GrayText">🏃‍♂️ Staying active is important to me, and I maintain a regular fitness routine that includes running and strength training.</Typography>
            <Typography variant="body2" m={2} align='center' color="GrayText">🍽️ I'm a foodie at heart and love trying new cuisines. Some of my favorite foods include Momo, Fish curry, and Biryani 😘 .</Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent={'center'}>
          <Grid item>
            <Typography variant="h4" align='center' margin={3} sx={{ color: "#47A992" }}>Career Timeline</Typography>
            <Timeline position="alternate">
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: 'auto 0', color: "#FF0060" }}
                  variant="body2"
                >
                  2017 - 2020
                </TimelineOppositeContent>
                <TimelineSeparator >
                  <TimelineConnector sx={{ bgcolor: '#47A992' }}/>
                  <TimelineDot color="primary">
                    <AutoStoriesOutlinedIcon />
                  </TimelineDot>
                  <TimelineConnector sx={{ bgcolor: '#47A992' }}/>
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography variant="h6" component="span" sx={{ color: "#FF0060" }} >
                    {'Bsc. Botany (Hons)'}
                  </Typography>
                  <Typography color={'GrayText'}>Studied from Calcutta University</Typography>
                  <Typography color={'GrayText'}>Gurudas College</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: 'auto 0', color: "#FF0060" }}
                  variant="body2"
                  color="text.secondary"
                >
                  2020 - 2023
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector sx={{ bgcolor: '#47A992' }}/>
                  <TimelineDot color="primary">
                    <AutoStoriesOutlinedIcon />
                  </TimelineDot>
                  <TimelineConnector sx={{ bgcolor: '#47A992' }}/>
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography variant="h6" component="span" sx={{ color: "#FF0060" }}>
                    BCA
                  </Typography>
                  <Typography color={'GrayText'}>Studied Computer Application from Maulana Abul Kalam Azad University of Technology</Typography>
                  <Typography color={'GrayText'}>Narula Institute of Technology</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: 'auto 0', color: "#FF0060" }}
                  variant="body2"
                >
                  2023 - Continue
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector sx={{ bgcolor: '#47A992' }}/>
                  <TimelineDot color="primary">
                    <LaptopMacIcon />
                  </TimelineDot>
                  <TimelineConnector sx={{ bgcolor: '#47A992' }}/>
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography variant="h6" component="span" sx={{ color: "#FF0060" }}>
                    Academian Indian Pvt Ltd
                  </Typography>
                  <Typography color={'GrayText'}>Working as a Software Developer</Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </Grid>
        </Grid>
        <Grid container justifyContent={'center'}>
          <Grid item textAlign={'center'}>
            <Typography variant="h4" align='center' margin={3} sx={{ color: "#47A992" }}>Images</Typography>
            <ImageList
              sx={{ minHeight: 450 }}
              variant="quilted"
              cols={6}
              rowHeight={121}
            >
              {itemData.map((item) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                  <img
                    {...srcset(item.img, 121, item.rows, item.cols)}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </ContentBox>
    </>
  )
}

export default About