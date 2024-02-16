import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AppBar, Grid, Tab, Tabs, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Logo } from '../StyledComponents/common';
import { Link } from 'react-router-dom';
import { LinkStyle } from '../../css/globalStyle';
import SearchBar from './SearchBar';
import DrawerCmp from './DrawerCmp';
import logoImg from '../../assets/img/jeet1.jpeg';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { getNavBarState, setNavBar } from '../../slices/ui';
// import { selectNavbarHeight, setNavBarHeight } from '../../slices/navBar';

const Navbar = () => {
    console.log("navbar")
    const navBarRef = useRef<HTMLDivElement | null>(null);
    // const navbarHeight = useAppSelector(selectNavbarHeight);
    const {navBar} = useAppSelector(getNavBarState);
    console.log(navBar.height);
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const renderMenus = useMemo(() => {
        const menus = ['Home', 'About Me', 'Portfolio', 'Blogs', 'Contact'];
        return menus.map((menu, index) => {
            const to = menu === 'About Me' ? '/about' : `/${menu.toLowerCase()}`;
            return (
                <Tab key={index} label={<Link style={LinkStyle} to={to}>{menu}</Link>} />
            );
        });
    }, []);

    // calculate navbar height
    useEffect(() => {
        const measureNavbarHeight = () => {
            // const navbar = document.getElementById('navbar');
            if (navBarRef) {
                const navHeight = navBarRef.current?.clientHeight;
                dispatch(setNavBar({height:navHeight}));
            }
        };
    
        measureNavbarHeight();
    
        const handleResize = () => {
            measureNavbarHeight();
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }); 
    

    return (
        <AppBar
            id='navbar'
            ref={navBarRef}
            sx={{
                backgroundColor: '#47A992',
            }}
        >
            <Toolbar>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    {!isMatch ? (
                        <>
                            <Grid item xs={2}>
                                <Logo alt="Remy Sharp" src={logoImg} />
                            </Grid>
                            <Grid item xs={7}>
                                <Tabs
                                    textColor='inherit'
                                    value={navBar.selectedTab}
                                    onChange={(e, val) => dispatch(setNavBar({selectedTab: val}))}
                                    sx={{
                                        '& .MuiTabs-indicator': {
                                            backgroundColor: 'white', 
                                        },
                                    }}
                                >
                                    {renderMenus}
                                </Tabs>
                            </Grid>
                            <Grid item xs={3}>
                                <SearchBar />
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item xs={2}>
                                <Logo alt="Remy Sharp" src={logoImg} />
                            </Grid>
                            <Grid item xs={2} display="flex" justifyContent="center">
                                <DrawerCmp />
                            </Grid>
                        </>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
