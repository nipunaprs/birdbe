import React,{useState,useEffect, useRef} from 'react'
import ProductCard from '../ProductCard/productcard'
import {getProducts} from '../../api/index'
import {TextField, Box, Typography, Button, CircularProgress } from '@mui/material';
import './productpage.css'
import {useHistory} from 'react-router-dom'
import ReactGa from 'react-ga'

function ProductPage({setOrder,gender}) {

    const [products,setProducts] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [total,setTotal] = useState(0);
    const [currentCart,setCart] = useState([]);
    const [monthlyFee,setMonthlyFee] = useState(0);
    const [savings,setSavings] = useState(0);
    let history = useHistory();

    useEffect(() => {
        setIsLoading(true)
        getProducts()
            .then((data) => {
                setProducts(data.products)
                setIsLoading(false)
            })
    },[])

    useEffect(() => {
        if(currentCart.length == 0){
            setTotal(0)
        }
        else{
            let current_total = 0
            let monthly_total = 0
            let savings_total = 0
            for(const el of currentCart) {
                
                
                //113 means monthly,112 means one time
                if(el.purchaseid == '113') {
                    savings_total = savings_total+ (parseInt(el.total) * 0.1)
                    monthly_total = parseInt(monthly_total) + parseInt(el.total)
                    current_total = parseInt(current_total) + (parseInt(el.total)-(parseInt(el.total) * 0.1))
                }
                else{
                    current_total = parseInt(current_total) + parseInt(el.total)
                }
                
            }
            monthly_total-=savings_total

            setTotal(current_total)
            setMonthlyFee(monthly_total)
            setSavings(savings_total)
        }
        
    },[currentCart])
     

    const checkOut = () => {

        if(currentCart.length != 0){
            setOrder({cart_array:currentCart,final_total:total,monthly:monthlyFee,savings:savings});

            ReactGa.event({
                category: 'CheckoutBtn',
                action: `Clicked checkout button from ${gender}`
            })

            history.push('./checkout');
        }
    }

  return (
    <div className='body'>
        {isLoading ? (
                <div className='loading-screen'>
                    <div>
                        <div><CircularProgress size="8rem"/></div>
                        <div ><Typography sx={{pt:'40px'}} variant='h4'>Loading Products</Typography></div>
                    </div>
                    
                   
                </div>
            ) :
            (
                <>

                    

                

                    {products?.map((element) => {
                        
                        if(gender != 'none') {
                            if(gender == 'male' && element.id == 151) return (<ProductCard product={element} cart={currentCart} addToCart={setCart}/>)
                            else if (gender == 'female' && element.id == 150) return (<ProductCard product={element} cart={currentCart} addToCart={setCart}/>)
                        }
                        else {
                            return (<ProductCard product={element} cart={currentCart} addToCart={setCart}/>)
                        }
                        
                    })}


                    <div className='total'>
                        <Typography variant='h4' sx={{mt:2, mb:2}}>Total Due ${total}</Typography>
                        <Typography variant='h6' sx={{mt:2, mb:2}}>Recurring Subscriptions ${monthlyFee}/month</Typography>
                        <Typography variant='h6' sx={{mt:2, mb:2}}>Total Savings ${savings}</Typography>
                        <Button sx={{background:'#5963B9'}} type="submit" variant='contained' onClick={checkOut}>Checkout</Button>
                    </div>
                    
                </>
            )}
        
    </div>
  )
}

export default ProductPage