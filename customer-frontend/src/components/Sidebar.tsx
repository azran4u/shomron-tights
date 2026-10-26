import React, { useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { selectSidebarIsOpen, sidebarActions } from "../store/sidebarSlice";
import { useAppSelector } from "../store/hooks";
import Logo from "./Logo";
import CartWithBadge from "./CartWithBadge";
import { useMobile } from "../hooks/useMobile";
import { useNavigate } from "react-router-dom";

const navItemSx = {
  width: "100%",
  borderRadius: 2,
  px: 2,
  py: 1.25,
  cursor: "pointer",
  "&:hover": { bgcolor: "action.hover" },
  "& .MuiListItemText-primary": {
    fontSize: "1.05rem",
    fontWeight: 500,
    textAlign: "center",
  },
};

const Sidebar: React.FC = () => {
  const isMobile = useMobile();
  const isSidebarOpen = useAppSelector(selectSidebarIsOpen);
  const dispatch = useDispatch();
  const handleDrawerToggle = () => dispatch(sidebarActions.toggle());
  const navigate = useNavigate();
  const drawerWidth = useMemo(() => (isMobile ? 280 : 300), [isMobile]);

  const handleLinkClick = (path: string) => {
    navigate(path);
    handleDrawerToggle();
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ minHeight: 72, px: { xs: 1.5, md: 3 } }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            maxWidth={1120}
            mx="auto"
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Logo />
            <CartWithBadge />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={isSidebarOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            display: "flex",
            flexDirection: "column",
            width: drawerWidth,
            height: "100%",
            backgroundColor: "background.paper",
            color: "text.primary",
            borderInlineStart: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <Box
          width="100%"
          sx={{
            px: 2,
            pt: 3,
            pb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 0.5,
          }}
        >
          <Box display="flex" justifyContent="center" mb={2}>
            <Logo height="4.5rem" />
          </Box>
          <ListItem sx={navItemSx} onClick={() => handleLinkClick("/")}>
            <ListItemText primary="בית" />
          </ListItem>
          <ListItem sx={navItemSx} onClick={() => handleLinkClick("/")}>
            <ListItemText primary="מוצרים" />
          </ListItem>
          <ListItem sx={navItemSx} onClick={() => handleLinkClick("/cart")}>
            <ListItemText primary="עגלה" />
          </ListItem>
          <ListItem sx={navItemSx} onClick={() => handleLinkClick("/pickups")}>
            <ListItemText primary="נקודות חלוקה" />
          </ListItem>
          <ListItem sx={navItemSx} onClick={() => handleLinkClick("/contact")}>
            <ListItemText primary="צור קשר" />
          </ListItem>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
