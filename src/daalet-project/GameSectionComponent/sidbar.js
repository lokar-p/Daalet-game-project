import React from 'react';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import THemesPopUp from '../popUps/THemesPopUp';
import SettingsPopup from '../popUps/settingsPopup';


export default function SidBar (props){

    let [settingPopUp , setSettingPopUp ] = React.useState(false)
    let [themesTrigger , setThemesTrigger] = React.useState(false)

    
    
   
   
  
          
   
let arabicStyle = {
    display: 'flex',
    justifySelf: props.isArabic ? 'end' :
                 props.isEnglish ? 'start' : 'end',
    
}
  
    
let activeArrowStyle = {
    borderColor : 'rgb(173 , 12 ,22)',
    transition: '400ms',
    rotate :props.isArabic? '580deg ':  '405deg',
   
 }

let imgArabicStyle = {
        marginLeft: '10px',
}

let  liArabicStyle = {
    paddingLeft: props.diskTopMode? '40px' : 'auto',
    paddingRight: '10px',
    
}

let LinkArabicStyle = {
    marginLeft : '20px',

}
    return (
        <nav className='sid-bar' style = {arabicStyle}   >
             <ul style ={props.isArabic ? liArabicStyle : null}>
                <li  style = {props.isArabic ? LinkArabicStyle : null}>
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
           
                        <li id ='theme' 

                        onMouseEnter={()=>setThemesTrigger(true)} 
                        onMouseLeave={()=>setThemesTrigger(false)} 
                        >
                                
                                {!props.isArabic && <>
                        <img src="icon/themes.svg"  style = {props.isArabic? imgArabicStyle : null}/>
                        <h4>{props.isArabic ? 'التصامبم' : 'Themes'}</h4>
                        <div className='themesArrow' style = {themesTrigger ? activeArrowStyle : null}></div>
                        </>}
                          
                       {props.isArabic && <>
                        <div className='themesArrow' style = {themesTrigger ? activeArrowStyle : null}></div>
                        <h4>{props.isArabic ? 'التصامبم' : 'Themes'}</h4>
                       
                         <img src="icon/themes.svg"  style = {props.isArabic? imgArabicStyle : null}/>
                        </>}
                            
                          <THemesPopUp  
                    positionLeft = {window.innerWidth >= 1090 ? '140px':'125px' }
                    positionRight = {window.innerWidth >= 1090 ?'140px':'125px' }
                    positionTop = '140px' 
                    PopupTrigger = {themesTrigger} 
                    isArabic = {props.isArabic}/>    
                        </li>
              
                    

                   
                     <li id = 'settings' 
                        onMouseEnter={()=>setSettingPopUp(true)} 
                        onMouseLeave={()=>setSettingPopUp(false)}
                     >
                        
                       {!props.isArabic && <>
                        <img src="icon/settings.svg"  style = {props.isArabic? imgArabicStyle : null}/>
                        <h4>{props.isArabic ? 'الإعدادات' : 'Settings'}</h4>
                        <div className='themesArrow ' style = {settingPopUp? activeArrowStyle: null} ></div>
                        </>}
                          
                       {props.isArabic && <>
                        <div className='themesArrow '  style = {settingPopUp? activeArrowStyle: null}></div>
                        <h4>{props.isArabic ? 'الإعدادات' : 'Settings'}</h4>
                       
                         <img src="icon/settings.svg"  style = {props.isArabic? imgArabicStyle : null}/>
                        </>}
                      <SettingsPopup 
                         positionLeft = {window.innerWidth >= 1090 ? '140px':'125px' }
                         positionRight = {window.innerWidth >= 1090 ?'140px':'125px' }
                        positionTop = '200px'
                       SettingPopup = {settingPopUp}
                       isArabic = {props.isArabic}
                       isEnglish = {props.isEnglish}
                       soundON = {props.soundON}
                       soundToggle = {props.soundToggle}
                       handelLanguageChange = {props.handelLanguageChange}
                      />
                   </li>

                   
                  
                
               
                
            </ul>
        </nav>
    )
}