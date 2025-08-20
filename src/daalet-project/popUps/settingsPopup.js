import React from 'react';

export default function SettingsPopup(props) {

   let menuPopupArabic= {

      width: '200px',
      position: 'absolute',
      top: props.positionTop, 
      right: props.positionRight,
      display: !props.SettingPopup ? 'none' : 'flex',
      flexDirection: 'column',
     }
     let menuPopupEnglish= {
  
       width: '200px',
       position: 'absolute',
       top: props.positionTop,  
       left:  props.positionLeft,
       display: !props.SettingPopup ? 'none' : 'flex',
       flexDirection: 'column',
      } 

     
   
    let languageStyle = {
         height: '30px',
        display : "flex",
        justifyContent  : 'space-between',
        alignItems : 'center',
        margin: '10px',
        padding: '10px  0px',
       
    }
  let flipperPositionLeft ={
   position: 'absolute ',
       left : '1px'
   }
   let flipperPositionRight ={
      position: 'absolute ',
      right : '1px'
  }

  let offStyle = {
   fontSize : '11px',
   
   
   
  }
  let onStyle = {

   fontSize : '11px',
   

  }
  let ONOffStyle = {
   display: 'flex',
   color : "black",
   padding: '2px',
   fontWeight: 'bold',
   justifyContent: props.soundON ? 'end' : 'start',

   
  }

    return (
     <div className='popUp' style={props.isArabic ? menuPopupArabic : menuPopupEnglish}>
             {!props.isArabic && <div style={languageStyle}>Language 
             <select
             name='language' 
             className='languageOption'
              onChange={props.handelLanguageChange}
              value= {props.isArabic ? 'ar' : 'en'}
              >
                 <option></option>
                <option>Arabic</option>
                <option>English</option>
             </select>
          </div>}
          {props.isArabic && <div style={languageStyle}> 
             <select 
             name='language' 
             className='languageOption'
              onChange={props.handelLanguageChange}
              value= {props.isArabic ? 'ar' : 'en'}
              >
                 <option></option>
                <option>عربي</option>
                <option>انجليزي</option>
             </select>
             <p style={{display: 'inline'}}>اللغة</p>
          </div>}
          
          <div className='soundFliper'>

           
           {!props.isArabic && <> Sounds
                          <div className='soundFlipperContainer'  onClick = {props.soundToggle} >
                    
                       <div className='icon-div' style={ONOffStyle} >
                        {props.soundON && <p style = {onStyle}>ON</p>}
                        <div className='fliper-div' style = {props.soundON ? flipperPositionLeft: flipperPositionRight} ></div>
                    
                         {!props.soundON && <p  style = {offStyle}>OFF</p>}
                        </div>
                        
                         </div>
            </>}
            {props.isArabic && <> 
                          <div className='soundFlipperContainer'  onClick = {props.soundToggle} >
                    
                       <div className='icon-div' style={ONOffStyle} >
                        {props.soundON && <p style = {onStyle}>ON</p>}
                        <div className='fliper-div' style = {props.soundON ? flipperPositionLeft: flipperPositionRight} ></div>
                    
                         {!props.soundON && <p  style = {offStyle}>OFF</p>}
                        </div>
                        
                         </div>الاصوات
            </>}

          </div>
       </div>
    )
}