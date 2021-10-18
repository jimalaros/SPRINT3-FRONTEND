import React from 'react';
import Navbar from '../components/Navbar';
import SidebarAdmin from '../components/SidebarAdmin';
import Footer from '../components/Footer';

const Template2 = ({children}) => {
   return (
      <div>
         <Navbar/>
         <SidebarAdmin/>
         <main>{children}</main>
         <Footer/>
      </div>
   );
};

export default Template2;