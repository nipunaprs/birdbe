import React,{useState,useEffect} from 'react'
import {TextField, Box, Typography, Button  } from '@mui/material';
import Typewriter from 'typewriter-effect';

function Checkout({order}) {


  return (
    <div style={{backgroundColor:'rgb(235, 229, 222)', paddingBottom:'20px', height:'100vh'}}>
        <Box sx={{display:'block',alignItems:'center',textAlign:'center',justifyContent:'center',p:5}}>
            <Box sx={{fontSize:'30px'}}><Typewriter
                    options={{
                        strings: ["Thank You For Your Order!"],
                        autoStart: true,
                        loop: true,
                        delay: 40,
                    }}
                    /></Box>
            <Typography variant='body'>Your Fertility Journey Starts Now</Typography>
        </Box>
        <Box sx={{
            display:'block',
            justifyContent:'center',
            alignItems:'center',
            textAlign:'center',
            margin: 'auto',
            maxWidth:'400px'
        }}>
            {order.cart_array?.map((el) => {
                
                return (
                    <div style={{display:'block', marginTop:'20px',marginBottom:'20px', background:'#fff', padding:'10px',boxShadow: '3px 3px 3px 3px rgba(0,0,0,0.1)'}}>
                        <img src={el.img} style={{maxWidth:'150px'}}></img>
                        <Typography variant='h6'>{el.title}</Typography>
                        <Typography variant='body1'>Name: {el.name}</Typography>
                        <Typography variant='body1'>Allergies: {el.allergies}</Typography>
                        <Typography variant='body1'>Price: ${el.total}</Typography>

                    </div>
                
                
                
                )
                
                })}
        </Box>

        <Box sx={{backgroundColor: '#fff',
                borderRadius: '2px',
                padding: '15px',
                width: '40%',
                maxWidth: '370px',
                margin: '30px auto',
                boxShadow: '3px 3px 3px 3px rgba(0,0,0,0.1)',
                justifyContent:'center',
                display:'block',
                textAlign:'center',
                }}>
            
            <Typography variant='h5' sx={{mt:2, mb:2}}>Total ${order.final_total}</Typography>
            <Typography variant='h6' sx={{mt:2, mb:2}}>Recurring Billing ${order.monthly}/month</Typography>
            <Typography variant='h6' sx={{mt:2, mb:2}}>Total Saved ${order.savings}</Typography>
        </Box>
        
    </div>
  )
}

export default Checkout