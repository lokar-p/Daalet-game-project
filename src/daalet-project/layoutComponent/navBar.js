import React from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Menu from "../popUps/menuPopup";
import {DarkTheme} from '../app'



export default function NavBar(props){

  const DarkMode = React.useContext(DarkTheme)

   

    /** this style for the button style changer */
  const styleLeft = {
    
    left: '1px',
    backgroundColor: 'white',
    
  }

  const styleRight = {
    right: '1px',
    backgroundColor: 'Gray'
  }

  /** change the style of  paragraph's in light changer div */
  const darkStyle = {
   padding: '0px',
   color:DarkMode? "white" : "lightGray",
   fontSize : '10px',
   fontWeight: 'bold',
  };
  const lightStyle = {
    padding: '0px',
    color:DarkMode?  'black' :  'rgb(73, 72, 72)',
    fontSize : '10px',
   fontWeight: 'bold',
  }
 
  const navDarkStyle = {// this changes the background color of the navigation bar
 backgroundColor:DarkMode? 'inherit' : 'white'
  }
  const darkCon = {
    padding: '2px',
    width: '42px ',
    backgroundColor:DarkMode? 'black' : 'white',
    justifyContent:DarkMode ?   'end' : 'start',
    
  }

  const darkModStyle ={
    
        color :DarkMode? ' rgb(52, 181, 210)' :'rgb(233, 245, 248)' ,
        background:DarkMode? ' rgb(63, 63, 63)': 'rgb(233, 245, 248)',
        background:DarkMode? 'linear-gradient(90deg, rgb(92, 96, 97)6%, rgb(136, 139, 139) 48%, rgb(161, 164, 165)91%)':
                                     'linear-gradient(90deg, rgb(207, 227, 232)6%,rgb(223, 235, 236) 48%, rgb(238, 248, 250)91%)',

     
  }

  let arbicStyle = {
    marginRight : 'auto',
    marginLeft : '0px',
  
  }



   
   
   let  languageFlipper =       <div class="langaugeDiv" id = 'language'  onClick={props.handelLanguageChange}>

                                      <div  class="arabicDiv" id = 'arabic'>
                                      {props.isArabic? 'ع' : 'En'}
                                      </div>

                                      <div class="englishDiv" id = 'english' >
                                      {props.isArabic? 'En': 'ع' }
                                      </div>

                                      <div class="arrowDiv1"></div>
                                      <div  class="arrowDiv2"></div>
                                </div>

  
  let darkModFlipper = 
   <div className="DarkModefliperCon">
      <div className='dark-mode-container' >
          
         {!props.isArabic && languageFlipper}
          <div className='icon-div'  onClick={props.changeDarkMode} style={darkCon}>
              {!DarkMode && <p style={lightStyle}>{props.isArabic ? 'نهاري' : 'Light'}</p>}
              <div className='fliper-div' style={DarkMode ?   styleLeft : styleRight }></div>
          
          {DarkMode &&  <p style= {darkStyle}>{props.isArabic ? 'ليلي' : 'Dark'}</p> }
              </div>
          {props.isArabic && languageFlipper} 
      </div>
</div>


  let gameName =   <h1 ><Link to ='/' className="daaletLink" >{props.isArabic ? 'ضالت' : 'Daalet'}</Link> </h1>
/** menu icon section  */

const  menuFlipper = (e)=>{
  let menu = document.getElementsByClassName('menuIcon')[0];

  menu.style.flexDirection = 'row';
  let divs = menu.children
  let divsArray = Object.values(divs)
  divsArray.map(ele => {
    console.log(ele)
    ele.style.display = 'inline-block'
    ele.style.rotate = '90deg';
    ele.style.width = '26px'
    ele.style.height = '0px'


  })
}

let menuIconDarkMode = {
  borderColor: 'rgb(49, 217, 255)'
}
/** menu section  */
const [menuPopup , setMenuPopup] = React.useState(false)
// document.body.onclick = ()=>{
//   setMenuPopup(old=> {
//     if(old === true){
//       old =  false;
//     }else{
//       old = false;
//     }
//   })
// }


React.useEffect(()=> {
  let menu = document.getElementsByClassName('menuIcon')[0]
  menu.style.flexDirection = menuPopup? 'row' :'column' ;
  let divs = menu.children
 
    divs[0].style.rotate= menuPopup? '90deg' : '180deg'
    divs[1].style.rotate= menuPopup? '90deg' : '180deg'
    divs[2].style.rotate= menuPopup? '90deg' : '180deg'
    divs[0].style.width =  '18px' 
    divs[0].style.height =  '0px' 
    divs[1].style.width =  '18px'
    divs[1].style.height =  '0px' 
    divs[2].style.width =  '18px'
    divs[2].style.height =  '0px' 

} , [menuPopup])


  let menu = 
  
  <div class="menuIcon" onMouseEnter={()=>setMenuPopup(true)} onMouseLeave={()=>setMenuPopup(false)} style = {DarkMode? menuIconDarkMode : null}>
    <div  style = {DarkMode? menuIconDarkMode : null}></div>
    <div  style = {DarkMode? menuIconDarkMode : null}></div>
    <div  style = {DarkMode? menuIconDarkMode : null}></div>
    <Menu
      soundON = {props.soundON}
      menuPopup = {menuPopup} 
      isDarkMode = {DarkMode} 
      isArabic = {props.isArabic}
      soundToggle = {props.soundToggle}
      handelLanguageChange = {props.handelLanguageChange}
      />
</div> 
  
 


let menuGameNameFlipper = !props.diskTopMode? menu : gameName


    return (
        <nav className="navbar" style = { darkModStyle }>
       
      {!props.isArabic && <>
      {menuGameNameFlipper}
      {darkModFlipper} </> }

      {props.isArabic && <>
      {darkModFlipper}
      {menuGameNameFlipper}
       </> }
        
        



        </nav>
    )
}