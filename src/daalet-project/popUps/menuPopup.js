import React from "react";
import Popup from "reactjs-popup";
import SettingsPopup from "./settingsPopup";
import THemesPopUp from "./THemesPopUp";
import { Link } from "react-router-dom";
export default function Menu(props){

    const [ThemesPopup , setThemesPopup] = React.useState(false)
    const [SettingPopup , setSettingPopup] = React.useState(false)
    let menuPopupArabic= {

       width: '150px',
       position: 'absolute',
       top: '45px', 
       right:  '10px',
       display: !props.menuPopup ? 'none' : 'inline-block',
      }
      let menuPopupEnglish= {

        width: '150px',
        position: 'absolute',
        top: '45px', 
        left:  '10px',
        display: !props.menuPopup ? 'none' : 'flex',
       } 

    let  liArabicStyle = {
        paddingTop: '10px',
        paddingLeft:   'auto',
        paddingRight: '10px',
        
    }

    let imgArabicStyle = {
        marginLeft: '10px',
        marginRight: '10px',
        width:'25px',
}

 

   let LinkArabicStyle = {
    marginLeft :props.isArabic ? '20px' : '10px',

}

let activeArrowStyle = {
    borderColor : 'rgb(173 , 12 ,22)',
    transition: '400ms',
    rotate :props.isArabic? '580deg ':  '405deg',
   
 }

    return(
        <div className='popUp' style={props.isArabic? menuPopupArabic : menuPopupEnglish}>
           <ul style={liArabicStyle} >

           <li  style = { LinkArabicStyle }>
                    <Link to ='/' className='homeLink'   >
                        {props.isArabic && <>
                        <h4>{props.isArabic ? 'الصفحة الرئسية' : ' Home'}</h4>
                        <img src="icon/home.svg" style = {props.isArabic? imgArabicStyle : null}/>
                        </>}
                        {!props.isArabic && <><img src="icon/home.svg"/>
                        <h4>{props.isArabic ? 'الصفحة الرئسية' : ' Home'}</h4>
                        </>}
                   </Link>
                   </li>
           
                        <li id ='theme' onMouseEnter={()=>setThemesPopup(true)} onMouseLeave={()=>setThemesPopup(false)}  >
                                
                                {!props.isArabic && <>
                        <img src="icon/themes.svg"  style = { imgArabicStyle }/>
                        <h4>{props.isArabic ? 'التصامبم' : 'Themes'}</h4>
                        <div className='themesArrow'  style = {ThemesPopup? activeArrowStyle : null}></div>
                        </>}
                          
                       {props.isArabic && <>
                        <div className='themesArrow' style = {ThemesPopup? activeArrowStyle : null}></div>
                        <h4>{props.isArabic ? 'التصامبم' : 'Themes'}</h4>
                       
                         <img src="icon/themes.svg"  style = { imgArabicStyle }/>
                        </>}
                             <THemesPopUp 
                             positionLeft = '140px' 
                             positionRight = '140px' 
                             positionTop = '80px'
                             PopupTrigger={ThemesPopup}  
                             isArabic = {props.isArabic}/>
                        </li>
               
                   

                    
                     <li id = 'settings' onMouseEnter={()=>setSettingPopup(true)} onMouseLeave={()=>{setSettingPopup(false)} }>
                        
                       {!props.isArabic && <>
                        <img src="icon/settings.svg"  style = {imgArabicStyle}/>
                        <h4>{props.isArabic ? 'الإعدادات' : 'Settings'}</h4>
                        <div className='themesArrow '  style = {SettingPopup? activeArrowStyle : null}></div>
                        </>}
                          
                       {props.isArabic && <>
                        <div className='themesArrow ' style = {SettingPopup? activeArrowStyle : null}></div>
                        <h4>{props.isArabic ? 'الإعدادات' : 'Settings'}</h4>
                       
                         <img src="icon/settings.svg"  style = {imgArabicStyle }/>
                        </>}
                       <SettingsPopup
                        positionLeft = '140px' 
                        positionRight = '140px' 
                        positionTop = '140px'
                        SettingPopup = {SettingPopup}
                        soundON = {props.soundON} 
                        isArabic = {props.isArabic}
                        isEnglish = {props.isEnglish}
                        soundToggle = {props.soundToggle}
                        handelLanguageChange = {props.handelLanguageChange}
                        />
                                        
                   </li>  

                    
                
           </ul>
        </div>

    )
   
}