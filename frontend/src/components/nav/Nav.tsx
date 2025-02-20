import React from 'react'
import {AppBar, Toolbar, IconButton, Stack, Button, Box } from "@mui/material"
import logo from "../../assets/logo.png"
import {Link} from "react-router-dom"


const Nav: React.FC<{}> = () => {
    return (
        <AppBar sx={{ bgcolor: "white" }} position='static'>
            <Toolbar>
                <IconButton component={Link} to="/" size='small' edge='start' color='inherit' aria-label='logo'>
                    <img src={logo} alt='' className='w-20'/>
                </IconButton>
                <Box sx={{ flexGrow: 1}} />
                <Stack direction='row' spacing={2}>
                    <Button component={Link} to="/" sx={{ color: 'black'}}>Home</Button>
                    <Button component={Link} to="/features" sx={{ color: 'black'}}>Features</Button>
                    <Button component={Link} to="/get-started" variant="contained" sx={{ backgroundColor: 'black', color: 'white'}}>Get Started</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Nav;