import { AppBar, Button, IconButton, Stack, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

const Nav: React.FC = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="w-full bg-[#262626] flex justify-center py-2">
      <AppBar
        sx={{ bgcolor: "whitesmoke" }}
        position="static"
        className="flex items-center w-full max-w-[90%] mx-auto rounded-full h-16 px-4 gap-24 lg:hidden"
      >
        <Toolbar className="flex w-full justify-between">
          <IconButton component={Link} to="/" size="small" edge="start" color="inherit" aria-label="logo">
            <img src={logo} alt="Logo" className="w-16" />
          </IconButton>
          <Stack direction="row" spacing={3} className="hidden md:flex">
            <Button component={Link} to="/" sx={{ color: "black" }}>Home</Button>
            <Button component={Link} to="/features" sx={{ color: 'black'}}>Features</Button>
            <Button component={Link} to="/editor" sx={{ color: 'black'}}>Editor</Button>
            <Button component={Link} to="/get-started" variant="contained" sx={{ backgroundColor: 'black', color: 'white', borderRadius: 28}}>Get Started</Button>
            {user ? (
              <Button onClick={logout} variant="contained" sx={{ backgroundColor: "red", color: "white", borderRadius: 28 }}>
                Logout
              </Button>
            ) : (
              <Button component={Link} to="/login" variant="contained" sx={{ backgroundColor: "black", color: "white", borderRadius: 28 }}>
                Login
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar> 
    </div>
  );
};

export default Nav;
