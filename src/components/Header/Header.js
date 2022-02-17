import React from 'react'
import Box from '@mui/material/Box';
import { Stack, AppBar, Toolbar, Typography, MenuItem,Select } from '@mui/material';
import './index.css'
import {useHistory} from 'react-router-dom'

function Header() {

  let history = useHistory();

  const sendHome = () => {
    history.push('/');
  }

  return (
    <AppBar position='static' sx={{background:'#5963B9'}}>
        <Toolbar className='toolbar'>

            <Box display="block">
                <img src='/BirdAndBeWhite.png' onClick={sendHome}></img>
                        
            </Box>

        </Toolbar>
    </AppBar>
  )
}

export default Header