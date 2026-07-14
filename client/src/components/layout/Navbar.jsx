import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import useAuth from "../../hooks/useAuth"
const drawerWidth = 260;

const Navbar = ({ handleDrawerToggle }) => {
  const {user}=useAuth();
  return (
    <AppBar
      position="fixed"
      elevation={1}
      color="inherit"
      sx={{
        width: {
          lg: `calc(100% - ${drawerWidth}px)`,
        },
        ml: {
          lg: `${drawerWidth}px`,
        },
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar>
        {/* Mobile Menu */}

        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            display: {
              xs: "flex",
              lg: "none",
            },
            mr: 2,
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Project Name */}

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            flexGrow: 1,
            userSelect: "none",
          }}
        >
          Invoice & Billing Manager
        </Typography>

        {/* Company Name */}

        <Box>
          <Typography
            variant="body1"
            fontWeight={600}
            color="primary"
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
          {user && user.user?.companyName}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;