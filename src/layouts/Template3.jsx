import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Template3 = ({children}) => {
   return (
   <div>
      <Navbar/>
      <main >{children}</main>
      <Footer/>
   </div>
   );
};

export default Template3;