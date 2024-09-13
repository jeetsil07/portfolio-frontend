import React, { useMemo, useState } from "react";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import {
  Drawer,
  IconButton,
  ListItemButton,
  List,
  ListItemText,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import WorkHistoryTwoToneIcon from "@mui/icons-material/WorkHistoryTwoTone";
import BookTwoToneIcon from "@mui/icons-material/BookTwoTone";
import PermContactCalendarTwoToneIcon from "@mui/icons-material/PermContactCalendarTwoTone";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Logo } from "../StyledComponents/CommonStyle";
import { Link, useLocation } from "react-router-dom";
import logoImg from '../../assets/img/jeet1.jpeg'
import { primaryColor } from "../../util/constant";
import Groups2Icon from '@mui/icons-material/Groups2';
import { StyledDrawer, StyledDrawerInnerContainer, StyledListItemText, StyledLogoContainer } from "../StyledComponents/NavbarStyled";

const DrawerCmp = () => {
  const [drawer, setDrawer] = useState(false);
  const location = useLocation();
  const renderMenus = useMemo(() => {

    const storedTokens = localStorage.getItem('authTokens');
    let menus: string[];

    // according to storedToken(authTokens) it will determine what to show 'My Profile'/'Login'
    if (storedTokens) {
      menus = ['Home', 'Team', 'Blogs', 'Contact', 'My Profile'];
    } else {
      menus = ['Home', 'Team', 'Blogs', 'Contact', 'Login'];
    }

    //this is for drawer menu icons
    const menuIcons: { [key: string]: React.ElementType } = {
      Home: HomeTwoToneIcon,
      Team: Groups2Icon,
      Blogs: BookTwoToneIcon,
      Contact: PermContactCalendarTwoToneIcon,
      Login: LoginIcon,
      'My Profile': AccountCircleIcon,
    };

    // this is to navigate to the specific page by clicking menu
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
        <div key={index}>
          <ListItemButton component={Link} to={to}>
            <IconComponent sx={{ color: primaryColor }} />
            <StyledListItemText
              primary={menu}
              isActive={isActive}              
            />
          </ListItemButton>
          <Divider />
        </div>
      );
    });
  }, [location]);
  return (
    <>
      <IconButton
        sx={{
          color: "white",
        }}
        onClick={() => setDrawer((prev) => !prev)}
      >
        <MenuTwoToneIcon />
      </IconButton>
      <StyledDrawer open={drawer} onClose={() => setDrawer((prev) => !prev)}>
        <StyledDrawerInnerContainer
          container
          spacing={2}
          primaryColor={primaryColor}
        >
          <StyledLogoContainer item xs={5}>
            <Logo
              alt="Jeet Sil"
              src={logoImg}
            />
          </StyledLogoContainer>
          <StyledLogoContainer item xs={7}>
            <Typography
              variant="body1"
              color="white"
            >
              techSociety
            </Typography>
          </StyledLogoContainer>
        </StyledDrawerInnerContainer>
        <List>
          {drawer && renderMenus}
        </List>
      </StyledDrawer>
    </>
  );
};

export default DrawerCmp;
