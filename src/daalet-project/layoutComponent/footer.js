import React from "react";
import { DarkTheme } from "../app";
export default function Footer(props){
    const DarkMode = React.useContext(DarkTheme)

    const darkModStyle ={
        fontSize: '14px',
        color : DarkMode? ' rgb(233, 245, 248)' :' rgba(0,108,133,1)' ,
        background: DarkMode? ' rgb(63, 63, 63)': 'rgb(233, 245, 248)',
        background:DarkMode? 'linear-gradient(90deg, rgb(92, 96, 97)6%, rgb(136, 139, 139) 48%, rgb(161, 164, 165)91%)':
                                     'linear-gradient(90deg, rgb(207, 227, 232)6%,rgb(223, 235, 236) 48%, rgb(238, 248, 250)91%)',

     
  }
    return (
        <div>
            
            <footer style={darkModStyle}> 
                
                

                <div className="socialIcon" >
                    <a href=""><img src='icon/image 8.svg'/></a>
                    <a href=""><img src='icon/facebook.svg'/></a>
                    <a href=""><img src='icon/linkedIn.svg'/></a>
                    <a href=""><img src='icon/twitter.svg'/></a>
                    <a href=""><img src='icon/getHub.svg'/></a> 
               </div>

               <small>{props.isArabic? 'جميع الحقوق محفوظة @ لقمان ':'All right received @ loqman'}</small>

            </footer>
        </div>
    )
}