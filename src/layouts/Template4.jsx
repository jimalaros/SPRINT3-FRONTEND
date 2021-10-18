import React from 'react';
import Navbar from '../components/Navbar';
import SidebarUser from '../components/SidebarUser';
import Footer from '../components/Footer';

const Template4 = ({children}) => {
   return (
      <div>
         <Navbar/>
         <SidebarUser/>
         <main>{children}</main>
         <Footer/>
      </div>
   );
};

export default Template4;