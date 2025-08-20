import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./layoutComponent/footer";
import NavBar from "./layoutComponent/navBar";

export default function LayoutComponent(props){
    return (
          <>

             <NavBar 
             soundON = {props.soundON}
              soundToggle = {props.soundToggle}
             
             diskTopMode = {props.diskTopMode}
             handelLanguageChange = {props.handelLanguageChange}
            
             changeDarkMode = {props.changeDarkMode}
             isArabic = {props.isArabic}
             /> 

               <Outlet/>
                
            <Footer  
           
            isArabic = {props.isArabic}
            />
    
          </>
    )
}