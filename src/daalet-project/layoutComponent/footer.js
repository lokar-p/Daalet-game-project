import React from "react";
import { DarkTheme } from "../app";
import { phoneModeContext } from "../app";
export default function Footer(props){
    const DarkMode = React.useContext(DarkTheme)
    const phoneMode = React.useContext(phoneModeContext)
    

    const ResponsiveStyleForFooter ={
        fontSize: '14px',
        color : DarkMode? ' rgb(233, 245, 248)' :' rgba(0,108,133,1)' ,
        background:DarkMode? 'linear-gradient(90deg, rgb(92, 96, 97)6%, rgb(136, 139, 139) 48%, rgb(161, 164, 165)91%)':
                                     'linear-gradient(90deg, rgb(207, 227, 232)6%,rgb(223, 235, 236) 48%, rgb(238, 248, 250)91%)',
        height: phoneMode ? '170px' : 'default',
     
  }
 
    return (
        <div>
            
            <footer style={ResponsiveStyleForFooter}> 
                
                

                <div className="socialIcon" >
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=logman.official@outlook.com" target="_blank"  rel="noopener noreferrer"><img alt="" src='icon/mail.svg'/></a>
                    <a href="https://www.linkedin.com/in/loqman-morwih/" target="_blank" rel="noopener noreferrer"><img alt="" src='icon/linkedIn.svg'/></a>
                    <a href="https://x.com/loqman_AA" target="_blank" rel="noopener noreferrer"><img alt="" src='icon/x-logo.svg'/></a>
                    <a href="https://github.com/lokar-p" target="_blank" rel="noopener noreferrer"><img alt="" src='icon/github.png'/></a> 
               </div>

               <small>{props.isArabic? ' © 2025 لقمان ': ' © 2025 Logman'}</small>

            </footer>
        </div>
    )
}