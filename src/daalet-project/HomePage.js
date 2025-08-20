import React from 'react';
import {Link} from 'react-router-dom';
import {DarkTheme} from'./app';

export default function HomePage(props) {

  const DarkMode = React.useContext(DarkTheme)

   const [goTo , setGoTo] = React.useState(false) 
   
  let darkModeStyle = {
             color: DarkMode? 'rgb(223, 235, 236)': 'rgb(0,108,133)',
             backgroundColor: DarkMode ? 'rgb(134, 134, 134)'  :' rgb(223, 235, 236)',
             fontSize: !props.diskTopMode? '14px':'auto',
            
  } 
   




  let responsiveDesign =  {
    color: DarkMode? 'rgb(223, 235, 236)': 'rgb(0,108,133)',
    backgroundColor: DarkMode ? 'rgb(134, 134, 134)'  :' rgb(223, 235, 236)',
    fontSize: !props.diskTopMode? '14px':'auto',
    margin: !props.diskTopMode? ' 0px 50px 5px' :' 0px 250px 5px',
} 

 function ErrorMessage(e){
  
    props.message.innerText = props.isArabic ? 'ًعزراً! هذه الميزة غير متاحة حاليا' : 'Sorry, this feature is not available for now'
   
    let home = document.getElementById('home');
    home.style.position = 'relative';
    home.append(props.message)
    home.classList.add('message')
    setTimeout(() => {
      home.style.position = 'static';
        if(home.classList.contains('message')){
              
              home.removeChild(props.message)
              home.classList.remove('message')
        }
      }, 2300);
 }
 
 function goToNames(){
   props.setIsBot(false)
   setGoTo(old => !old)
    
 }
 function botModeName(){
  props.goBot();
  setGoTo(true);
  console.log(props.goBot())
 }
 
 let DarkModeTextColor = {
  color: DarkMode ? 'rgb(223, 235, 236)': 'rgb(0,108,133)',
 }

 let arrow =  <div className ='backArrowCon' onClick = {goToNames} style = {{margin:'20px auto 0px 30px' ,}}>
 
 <div className="BArrowTell" style= {{borderColor: 'rgb(0,108,133)'}}></div>
 <div className="BArrowHead" style= {{borderColor: 'rgb(0,108,133)'}} ></div>
</div>
function handelFormSubmit (e){
  e.preventDefault();
}
    let form = <form className='PlayerNamesForm' onSubmit={handelFormSubmit}>
                   {arrow}
                   {!props.isBot &&  <label style={DarkModeTextColor}>{!props.isArabic &&'player 1'}
                      <input lang={props.isArabic ? 'ar' : 'en'} type = 'text' placeholder={props.isArabic ?'اسم اللاعب': 'player1Name'} name='player1Name'  onChange={props.handelFormChange}></input>
                        {props.isArabic &&'اللاعب الاول'}
                      </label>}
                      <label style={DarkModeTextColor}>{!props.isArabic &&'player 2'}
                      <input lang='ar' type = 'text' placeholder={props.isArabic ?'اسم اللاعب': 'player2Name'} name='player2Name' onChange={props.handelFormChange}></input>
                      {props.isArabic &&'اللاعب الثاني'}
                      </label>
                      <Link to = '/gameTable' className='FormGameLink' style={{color:'rgb(223, 235, 236)'}}>{props.isArabic? "إبدأ اللعب":'Start New Game'}</Link>
               </form>


let gotonames = goTo ? 
form:
<div className= 'optionContainer'  style={darkModeStyle}>
                <div  className='gotoGameLink' onClick={goToNames}  style={darkModeStyle}> 
                <img src='icon/daaletIcons/computer.svg' />
             {props.isArabic? 'العب مع صديق': 'play with friend'}
                
                </div>
                <div onClick = {ErrorMessage}>
                <img src='icon/daaletIcons/online.svg' />
                {props.isArabic? 'العب اونلاين': 'play Online'} 
                    
                </div>
                <div onClick = {botModeName}>
                <img src='/icon/daaletIcons/vsComputer.svg' />
                {props.isArabic? 'العب مع الكمبيوتر': 'play with computer'}

                        
                </div>
   </div> ; 

    return (
        <div id = 'home'  className='homePage' style={responsiveDesign}>
            <div className='aboutDiv'></div>
           {gotonames}
        </div>
    )
}
