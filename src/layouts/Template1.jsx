import React from 'react'
import Navbar from '../components/Navbar';

const Template1 = ({children}) => {
   return <div>
      <Navbar/>
      {children}
   </div>
};

export default Template1;

