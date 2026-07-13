import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import sidebarMenu from "../../utils/sidebarMenu";
import useAuth from "../../hooks/useAuth";
const drawerWidth = 260;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const drawerContent = (
    <>
      <Toolbar>
        <Typography
          variant="h6"
          fontWeight="bold"
          color="primary"
        >
          Invoice Manager
        </Typography>
      </Toolbar>

      <Divider />

      <List sx={{ mt: 1 }}>
        {sidebarMenu.map((item) => {

          const Icon = item.icon;

          return (
            <ListItemButton
              key={item.id}
              // onClick={() => navigate(item.path)}
              onClick={()=>{
                if(item.action === "logout"){
                  logout();
                }else{
                  navigate(item.path)
                }
              }}
              selected={item.path && location.pathname === item.path}
              sx={{
                mx: 1,
                borderRadius: 2,
                mb: 0.5,

                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "#fff",

                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                },

                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "#fff",

                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                },
              }}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>

              <ListItemText primary={item.title} />
            </ListItemButton>
          );
        })}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: drawerWidth },
        flexShrink: { lg: 0 },
      }}
    >
      {/* Mobile Drawer */}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            lg: "none",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}

      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            lg: "block",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #e5e7eb",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;