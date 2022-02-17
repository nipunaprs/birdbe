import React, {useState, forwardRef} from 'react'
import {TextField, Box, Typography, Button, Accordion, AccordionSummary,AccordionDetails, Rating, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, FormHelperText  } from '@mui/material';
import './productcard.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ReviewsData} from '../../data/reviews'
import ReactGa from 'react-ga'

function ProductCard({product,cart,addToCart}) {

  const [name,setName] = useState('')
  const [allergies,setAllergies] = useState('')
  const [purchaseId,setPurchaseId] = useState(0);
  const [noNameError,setNoNameError] = useState(false);
  const [helperText,setHelperText] = useState('');
  const [added,setAdded] = useState(false);


  const validate = (e) => {
    e.preventDefault() // prevent a refresh
    setAdded(false)

    if(name && purchaseId && !added) {
      
      setHelperText('')
      setAdded(true)
      addToCart(cart => [...cart,{name:name,allergies:allergies,productid:product.id,purchaseid:purchaseId,total:product.price,title:product.name,img:product.primary_image.url_standard}])
      
      ReactGa.event({
          category: 'AddToCartBtn',
          action: 'Clicked atc button'
      })
    }
    else if (!name && purchaseId && !added) {
      setNoNameError(true);
    }
    else if (name && !purchaseId && !added) {
      setHelperText('Please select an option')
    }
    else if(added) {
      setAdded(false)
       
      const newarray = cart.filter(obj => obj.productid != product.id)
      addToCart(newarray)
      
    }

  }

  return (
    <div className='main'>
      
      <div className='image'><img className='pr-image' src={product.primary_image.url_standard}></img></div>
      

      <div className='info'>
        <div className='title'>
          <Typography variant='h5'>{product.name}</Typography>
          <Typography variant='h5'>${product.price}</Typography>
        </div>

        

        <div className='price'>
          <div><Rating value={5} readOnly /></div>
          <label>1 month supply</label>
          
        </div>
        

        <div className='description'>
          <label>{product.meta_description}</label>
        </div>


        <div >
          <form onSubmit={validate} >
          <FormControl fullWidth >
              <FormLabel className='questions' >Details</FormLabel>
              
                {product?.modifiers?.map((el) => {
                  if(el.id == '156') {
                    return (<><TextField sx={{mt:2,mb:2}} variant="outlined" required label={el.display_name} error={noNameError} onChange={(e) => setName(e.target.value)} />
                    <TextField sx={{mb:1}} variant="outlined" label={'List any allergies'} fullWidth onChange={(e) => setAllergies(e.target.value)}  /></>)
                  }
                  else {
                    return (<><RadioGroup
                    >
                        {el?.option_values?.map((el2) => (
                          <FormControlLabel value={el2.id} control={<Radio />} label={el2.label} onChange={(e) => setPurchaseId(e.target.value)} />
                        ))} 
                    </RadioGroup>
                    <FormHelperText>{helperText}</FormHelperText></>)
                  }
                })}
            </FormControl>

            <Button sx={{background:'#5963B9'}} type="submit" variant='contained'>{added ? "Remove From Cart"  : "Add To Cart"}</Button>
            </form>
        </div>
        

        <div>
          
        </div>

        <div className='full-description'>
          <Accordion sx={{backgroundColor:'#f0f0f0', boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.2)'}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />} >
              <Typography>Description</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div dangerouslySetInnerHTML={{__html: product.description}}/>
            </AccordionDetails>
          </Accordion>
        </div>
        
        <div className='full-description'>
          <Accordion sx={{backgroundColor:'#f0f0f0', boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.2)'}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />} >
              <Typography>Reviews</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {
                  ReviewsData?.map((el) => {
                    if(el.productid == product.id) {
                      return <>
                        <Rating value={el.star} readOnly />
                        <div className='reviews'><Typography variant='subtitle'>{el.text}</Typography></div>
                      </>
                  }})
                }
              
            </AccordionDetails>
          </Accordion>
        </div>

        
      </div>

    </div>
  )
}

export default ProductCard