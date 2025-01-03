import React, { useEffect, useMemo, useRef } from "react";
import {
  Tab,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Logo } from "../StyledComponents/CommonStyle";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import DrawerCmp from "./DrawerCmp";
import logoImg from "../../assets/img/jeet1.jpeg";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { setNavBar } from "../../slices/ui";
import { primaryColor } from "../../util/constant";
import {
  StyledAppBar,
  StyledDrawerContainer,
  StyledLogoContainer,
  StyledSearchContainer,
  StyledTabContainer,
  StyledTabs,
  StyledToolBarGrid,
} from "../StyledComponents/NavbarStyled";

const Navbar = () => {
  const pathName = window.location.pathname.toLowerCase();
  const navigate = useNavigate();
  const navBarRef = useRef<HTMLDivElement | null>(null);
  const { navBar } = useAppSelector((state) => state.ui.userInterface);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const storedTokens = localStorage.getItem("authTokens");
  const renderMenus = useMemo(() => {
    let menus: string[];

    // according to storedToken(authTokens) it will determine what to show 'My Profile'/'Login'
    if (storedTokens) {
      menus = ["Home", "Team", "Blogs", "Contact", "My Profile"];
    } else {
      menus = ["Home", "Team", "Blogs", "Contact", "Login"];
    }

    // this is to navigate to the specific page by clicking menu
    return menus.map((menu, index) => {
      let to: string;
      if (menu === "My Profile") {
        to = "/profile";
      } else {
        to = `/${menu.toLowerCase()}`;
      }
      return <Tab key={index} label={menu} onClick={() => navigate(to)} />;
    });
  }, [navigate,storedTokens]);

  useEffect(() => {
    //according to page/path it shows selected menu and store in redux
    if (pathName === "/home") {
      dispatch(setNavBar({ selectedTab: 0 }));
    } else if (pathName === "/team") {
      dispatch(setNavBar({ selectedTab: 1 }));
    } else if (pathName === "/blogs") {
      dispatch(setNavBar({ selectedTab: 2 }));
    } else if (pathName === "/contact") {
      dispatch(setNavBar({ selectedTab: 3 }));
    } else if (pathName === "/login") {
      dispatch(setNavBar({ selectedTab: 4 }));
    } else if (pathName === "/profile") {
      dispatch(setNavBar({ selectedTab: 4 }));
    }

    // calculate navbar height and store it to redux
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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, pathName]);

  return (
    <StyledAppBar id="navbar" ref={navBarRef} primaryColor={primaryColor}>
      <Toolbar>
        <StyledToolBarGrid container>
          {!isMatch ? (
            <>
              <StyledLogoContainer item xs={2}>
                <Logo alt="Jeet Sil" src={logoImg} />
              </StyledLogoContainer>
              <StyledTabContainer item xs={7}>
                <StyledTabs
                  textColor="inherit"
                  value={navBar.selectedTab}
                >
                  {renderMenus}
                </StyledTabs>
              </StyledTabContainer>
              <StyledSearchContainer item xs={3}>
                <SearchBar pathName={pathName} />
              </StyledSearchContainer>
            </>
          ) : (
            <>
              <StyledLogoContainer item xs={2}>
                <Logo alt="Jeet Sil" src={logoImg} />
              </StyledLogoContainer>
              <StyledDrawerContainer item xs={2}>
                <DrawerCmp />
              </StyledDrawerContainer>
            </>
          )}
        </StyledToolBarGrid>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
