import { Box, Button, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { FooterContainer, GridContainer } from '../StyledComponents/CommonStyle'
import { FormatAlignJustify, KeyboardArrowRight } from '@mui/icons-material'
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import WorkHistoryTwoToneIcon from "@mui/icons-material/WorkHistoryTwoTone";
import BookTwoToneIcon from "@mui/icons-material/BookTwoTone";
import PermContactCalendarTwoToneIcon from "@mui/icons-material/PermContactCalendarTwoTone";
import { Link, useLocation } from 'react-router-dom';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { secondaryColor } from '../../util/constant';
import Groups2Icon from '@mui/icons-material/Groups2';

const Footer = () => {
    const location = useLocation()

    const renderMenus = useMemo(() => {
        
        const storedTokens = localStorage.getItem('authTokens');
        let menus: string[];
        if (storedTokens) {
            menus = ['Home', 'Team', 'Blogs', 'Contact', 'My Profile'];
        } else {
            menus = ['Home', 'Team', 'Blogs', 'Contact', 'Login'];
        }
        const menuIcons: { [key: string]: React.ElementType } = {
            Home: HomeTwoToneIcon,
            Team: Groups2Icon,
            Blogs: BookTwoToneIcon,
            Contact: PermContactCalendarTwoToneIcon,
            Login: LoginIcon,
            'My Profile': AccountCircleIcon,
        };

        return menus.map((menu, index) => {
            const IconComponent = menuIcons[menu];
            let to: string;
            if (menu === 'My Profile') {
                to = '/profile'
            } else {
                to = `/${menu.toLowerCase()}`;
            }
            const isActive = location.pathname === to;
           
            return (
                <ListItem key={index}>
                    <ListItemButton component={Link} to={to}>
                        <IconComponent sx={{ color: 'white', marginRight: '10px' }} />
                        <ListItemText
                            primary={menu}
                            sx={{
                                color: isActive ? secondaryColor : 'white',
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            );
        });
    }, [location]);

    return (
        <>
            <Box>
                <FooterContainer >
                    <Grid container spacing={2}>
                        <Grid item md={2}>
                            <Typography variant="h6" color="white" marginLeft={4}>Navigations</Typography>
                            <hr />
                            <List>
                                {renderMenus}
                            </List>
                        </Grid>
                        <Grid item md={3}>
                            <Typography variant="h6" color="white" marginLeft={4}>Contact Details</Typography>
                            <hr />
                            <List>
                                <ListItem sx={{ overflowWrap: 'anywhere' }}>
                                    <EmailTwoToneIcon sx={{ margin: 1, color: 'white' }} />
                                    <Typography variant="body1" color="white" >
                                        jeetsil100@gmail.com
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <CallTwoToneIcon sx={{ margin: 1, color: 'white' }} />
                                    <Typography variant="body1" color="white">
                                        7890101401
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <AccountTreeTwoToneIcon sx={{ margin: 1, color: 'white' }} />
                                    <Typography variant="body1" color="white">
                                        <Link to="https://github.com/jeetsil07" target="_blank" style={{ color: 'white' }} >GitHub Profile</Link>
                                    </Typography>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item md={3}>
                            <Typography variant="h6" color="white" marginLeft={4}>Popular Posts</Typography>
                            <hr />
                            <List>
                                <ListItem>
                                    <DescriptionTwoToneIcon sx={{ margin: 2, color: 'white' }} />
                                    <Typography variant="body1" color="white">
                                        <Link to="https://github.com/jeetsil07" target="_blank" style={{ color: 'white' }} title='Modern Day Technology and Website with Ai & Machine Learning' >Modern Day Technology and Website</Link>
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <DescriptionTwoToneIcon sx={{ margin: 2, color: 'white' }} />
                                    <Typography variant="body1" color="white">
                                        <Link to="https://github.com/jeetsil07" target="_blank" style={{ color: 'white' }} title='Modern Day Technology and Website with Ai & Machine Learning' >Modern Technology</Link>
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <DescriptionTwoToneIcon sx={{ margin: 2, color: 'white' }} />
                                    <Typography variant="body1" color="white">
                                        <Link to="https://github.com/jeetsil07" target="_blank" style={{ color: 'white' }} title='Modern Day Technology and Website with Ai & Machine Learning' >Modern Day Technology </Link>
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <DescriptionTwoToneIcon sx={{ margin: 2, color: 'white' }} />
                                    <Typography variant="body1" color="white">
                                        <Link to="https://github.com/jeetsil07" target="_blank" style={{ color: 'white' }} title='Modern Day Technology and Website with Ai & Machine Learning' >Modern Day  and Website</Link>
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <DescriptionTwoToneIcon sx={{ margin: 2, color: 'white' }} />
                                    <Typography variant="body1" color="white">
                                        <Link to="https://github.com/jeetsil07" target="_blank" style={{ color: 'white' }} title='Modern Day Technology and Website with Ai & Machine Learning' >Modern Website</Link>
                                    </Typography>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item md={4}>
                            <Typography variant="h6" color="white" marginLeft={4}>Subscribe</Typography>
                            <hr />
                            <TextField
                                variant='outlined'
                                placeholder='Enter Your Valid Email Id'
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white', // Set outline color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white', // Set outline color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white', // Set outline color when focused
                                        },
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        color: 'white',
                                    }
                                }}
                            />
                            <Button variant="contained" sx={{
                                backgroundColor: secondaryColor,
                                marginTop: "5px"
                            }} endIcon={<NotificationsNoneTwoToneIcon />}>
                                Subscribe
                            </Button>
                        </Grid>
                    </Grid>
                </FooterContainer>
            </Box>
        </>
    )
}

export default Footer