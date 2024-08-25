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

const DrawerCmp = () => {
  const [drawer, setDrawer] = useState(false);
  const location = useLocation();
  const renderMenus = useMemo(() => {
    
    const storedTokens = localStorage.getItem('authTokens');
    let menus: string[];
    if (storedTokens) {
      menus = ['Home', 'About Me', 'Blogs', 'Contact', 'My Profile'];
    } else {
      menus = ['Home', 'About Me', 'Blogs', 'Contact', 'Login'];
    }
    const menuIcons: { [key: string]: React.ElementType } = {
      Home: HomeTwoToneIcon,
      'About Me': InfoTwoToneIcon,
      Blogs: BookTwoToneIcon,
      Contact: PermContactCalendarTwoToneIcon,
      Login: LoginIcon,
      'My Profile': AccountCircleIcon,
    };

    return menus.map((menu, index) => {
      const IconComponent = menuIcons[menu];
      let to: string;
      if (menu === 'About Me') {
        to = '/about'
      } else if (menu === 'My Profile') {
        to = '/profile'
      } else {
        to = `/${menu.toLowerCase()}`;
      }
      const isActive = location.pathname === to;
      return (
        <div key={index}>
          <ListItemButton component={Link} to={to}>
            <IconComponent sx={{ color: primaryColor }} />
            <ListItemText
              primary={menu}
              sx={{
                color: isActive ? primaryColor : '',
                paddingLeft: "30px",
                minWidth: "100px",
              }}
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
      <Drawer open={drawer} onClose={() => setDrawer((prev) => !prev)}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            padding: "10px",
            backgroundColor: primaryColor,
          }}
        >
          <Grid item xs={5}>
            <Logo
              alt="Jeet Sil"
              src={logoImg}
            />
          </Grid>
          <Grid item xs={7}>
            <Typography
              variant="body1"
              color="white"
            >
              Jeet Sil
            </Typography>
          </Grid>
        </Grid>
        <List>
          {drawer && renderMenus}
        </List>
      </Drawer>
    </>
  );
};

export default DrawerCmp;
