import './App.css';
import ProductPage from './components/ProductPage/productpage';
import Header from './components/Header/Header';
import Checkout from './components/CheckoutPage/checkout';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Quiz from './components/QuizPage/quiz';
import ReactGa from 'react-ga'

function App() {
  
  useEffect(() => {
    ReactGa.initialize('UA-105824824-2')
    ReactGa.pageview(window.location.pathname)
  },[])

  const[finalorder,setFinalOrder] = useState({});
  const[gender,setGender] = useState('none');

  return (
    <Router>
      <Header/>
      <div className="App" >
        <Switch>
          <Route exact path='/'>
            <Quiz setGender={setGender}/>
          </Route>
          <Route path="/allcart">
            <ProductPage setOrder={setFinalOrder} gender={gender}/>
          </Route>
          <Route path="/checkout">
            <Checkout order={finalorder}/>
          </Route>
        </Switch>
        
        
      </div>
    </Router>
  );
}

export default App;
