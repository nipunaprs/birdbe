import React,{useState,useEffect} from 'react'
import {TextField, Box, Typography, Button  } from '@mui/material';
import './quiz.css'
import {useHistory} from 'react-router-dom'
import Typewriter from 'typewriter-effect';
import ReactGa from 'react-ga'


function Quiz({setGender}) {

  
    let history = useHistory();

    const sendToCart = () => {
        setGender('none')
        ReactGa.event({
            category: 'ViewAllProducts',
            action: `Clicked view all products`
        })
        history.push('/allcart')
    }

    const sendToMale = () => {
        setGender('male')
        ReactGa.event({
            category: 'ViewMaleProducts',
            action: `Clicked view only male products`
        })
        history.push('/allcart')
    }

    const sendToFemale = () => {
        setGender('female')
        ReactGa.event({
            category: 'ViewFemaleProducts',
            action: `Clicked view only female products`
        })
        history.push('/allcart')
    }

    
    return (
        <div className='screen'>
            <div className='text-screen'>

                <Typewriter
                    options={{
                        strings: ["We're on this fertility journey with you!"],
                        autoStart: true,
                        loop: true,
                        delay: 40,
                    }}
                    />
                <Typography className='bottom-bottom-text'>Please complete the steps so we can find the best product for you.</Typography>
                
                <div style={{padding:'5px'}}>
                    <Button sx={{background:'#5963B9',m:'5px'}} type="submit" variant='contained' onClick={sendToMale}>I am male</Button>
                    <Button sx={{background:'#5963B9',m:'5px'}} type="submit" variant='contained' onClick={sendToFemale}>I am female</Button>
                </div>
                
            </div>

            

            <div className='bottom-text'>
                    <Typography className='bottom-bottom-text'>Already know what you're looking for?</Typography>
                    <Button sx={{background:'#5963B9',mt: '5px'}} type="submit" variant='contained' onClick={sendToCart}>View All Products</Button>
            </div>
        </div>
        )
    
    
  
}

export default Quiz