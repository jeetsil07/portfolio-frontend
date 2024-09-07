import React, { useEffect, useMemo, useRef } from 'react';
import { AppBar, Grid, Tab, Tabs, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Logo } from '../StyledComponents/CommonStyle';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import DrawerCmp from './DrawerCmp';
import logoImg from '../../assets/img/jeet1.jpeg';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { setNavBar } from '../../slices/ui';
import { primaryColor } from '../../util/constant';

const Navbar = () => {

    const pathName = window.location.pathname.toLowerCase();
    const navigate = useNavigate();
    const navBarRef = useRef<HTMLDivElement | null>(null);
    const { navBar } = useAppSelector((state) => state.ui.userInterface);
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const renderMenus = useMemo(() => {
        const storedTokens = localStorage.getItem('authTokens');
        let menus: string[];
        if (storedTokens) {
            menus = ['Home', 'Team', 'Blogs', 'Contact', 'My Profile'];
        } else {
            menus = ['Home', 'Team', 'Blogs', 'Contact', 'Login'];
        }
        return menus.map((menu, index) => {
            let to: string;
            if (menu === 'My Profile') {
                to = '/profile'
            } else {
                to = `/${menu.toLowerCase()}`;
            }

            return (
                <Tab key={index} label={menu} onClick={() => navigate(to)} />
            );
        });
    }, [navigate]);

    // calculate navbar height
    useEffect(() => {
        if (pathName === '/home') {
            dispatch(setNavBar({ selectedTab: 0 }))
        } else if (pathName === '/team') {
            dispatch(setNavBar({ selectedTab: 1 }))
        } else if (pathName === '/blogs') {
            dispatch(setNavBar({ selectedTab: 2 }))
        } else if (pathName === '/contact') {
            dispatch(setNavBar({ selectedTab: 3 }))
        } else if (pathName === '/login') {
            dispatch(setNavBar({ selectedTab: 4 }))
        }
        else if (pathName === '/profile') {
            dispatch(setNavBar({ selectedTab: 4 }))
        }
        const measureNavbarHeight = () => {
            if (navBarRef) {
                const navHeight = navBarRef.current?.clientHeight;
                dispatch(setNavBar({ height: navHeight }));
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
    }, [dispatch, pathName]);


    return (
        <AppBar
            id='navbar'
            ref={navBarRef}
            sx={{
                backgroundColor: primaryColor,
                padding: '5px 20px'
            }}
        >
            <Toolbar>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    {!isMatch ? (
                        <>
                            <Grid item xs={2}>
                                <Logo alt="Jeet Sil" src={logoImg} />
                            </Grid>
                            <Grid item xs={7}>
                                <Tabs
                                    textColor='inherit'
                                    value={navBar.selectedTab}
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
                                <SearchBar pathName={pathName} />
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item xs={2}>
                                <Logo alt="Jeet Sil" src={logoImg} />
                            </Grid>
                            <Grid item xs={2} display="flex" justifyContent="center">
                                <DrawerCmp />
                            </Grid>
                        </>
                    )}
                </Grid>
            </Toolbar>
        </AppBar >
    );
}

export default Navbar;
