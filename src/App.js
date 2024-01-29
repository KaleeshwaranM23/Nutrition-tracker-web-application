import React, { useState } from 'react';

import { Routes, Route, BrowserRouter} from 'react-router-dom';
import { userContext } from './contexts/UserContext';

import './App.css';

import Register from './components/Register';
import Login from './components/Login';
import NotFound from './components/Not-found';
import Private from './components/Private';
import Track from './components/Track';
import Diet from './components/Diet';



function App() {

  const [loggedUser,setLoggedUser] = useState(JSON.parse(localStorage.getItem("nutrition-tracker-app")));

  

  return (

    <userContext.Provider value={{loggedUser, setLoggedUser}}>

      <BrowserRouter>
    
        <Routes>

          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/track' element={<Private Component={Track}/>}/>
          <Route path='/diet' element={<Private Component={Diet}/>}/>

          <Route path='*' element={<NotFound/>}/>

        </Routes>

      </BrowserRouter> 

    </userContext.Provider>  
    
  );
}

export default App;
