import React from 'react';
import ReactDom from 'react-dom/client';
// import App from './App'; 
// import UserCard from './UserCard';
//import './usercard.css';
// import QRcode from './QRcode';
// import './QRcode.css'
import Weather from './Weather';
import './weather.css'




ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <UserCard /> */}
    {/* <QRcode />  */}
    <Weather /> 
    {/* <App /> */}
    </React.StrictMode>
);
