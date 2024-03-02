import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Menu, MenuButton, Dropdown, MenuItem, Button } from '@mui/joy';

const NavBar = () => {
   const navigate = useNavigate();
    return (
        <>
            <Dropdown>
                <MenuButton>Menu</MenuButton>
                <Menu>
                    <Button onClick={()=>navigate('/home')}>Home</Button>
                    <Button onClick={()=>navigate('/profile')}>Profile</Button>
                    <Button onClick={()=>navigate('/favorites')}>Favorites</Button>
                </Menu>
            </Dropdown>
        </>
  )
}

export default NavBar