import React from "react";
import {BrowserRouter , Routes , Route} from 'react-router-dom'
//import NavBar from "./layoutComponent/navBar";
//import Footer from "./layoutComponent/footer";
import Main from "./main.js";
import './styles.css'
//import SingUp from "./logingPage";
import userData from "./userData";
import HomePage from './HomePage';
import LayoutComponent from "./layout";

//creating a context to hold the value of dark them state
export const DarkTheme = React.createContext()
// creating a context to hold phoneModeContext
export const phoneModeContext = React.createContext()
// creating a context ot hold users data 
export const usersDataContext = React.createContext()
//creating a context to hold isArabic state value 
export const ArabicLanguageContext = React.createContext()
export default function App (){
    const [isOfLine , setIsOfLine] = React.useState(false)
    const [isOnLine , setIsOnLine] = React.useState(false)
    const [isBot , setIsBot  ] = React.useState(true)
    const [users , setUsers] = React.useState(userData)
    const [isArabic , setIsArabic] = React.useState(true)
    const [isEnglish , setIsEnglish] = React.useState(false)
    const [soundON , setSoundON] = React.useState(true) 
  

   
// React.useEffect(() => {

//    let tdArray = Object.values(document.querySelectorAll('td'));
//     let currentState =  tdArray.filter(td => {
//         console.log(td);
//          td.classList.contains('has_balha')  })
//          console.log(currentState)
// }, [isArabic])
// React.useEffect(()=>{
//    let playMode = localStorage.getItem('playMode');
//    if(playMode === 'online'){
//       setIsOnLine(true)
//    }else  if(playMode === 'ofLine'){
//       setIsOfLine(true)
//    }else  if(playMode === 'AI'){
//       setIsBot(true)
//    }
// },[])

   
    

    React.useEffect(()=>{//get the language from localStorage 
      if (localStorage.getItem('language')){
       let selectedLanguage = localStorage.getItem('language')
       if (selectedLanguage === 'en' ){
         
          setIsArabic(false)
          setIsEnglish(true)
         }else if (selectedLanguage === 'ar'){
          
          setIsArabic(true)
          setIsEnglish(false)
         }
      }
 },[])

 
  
 function goOfLine(){
   
    setIsOfLine(true);
   //  localStorage.setItem('playMode' , 'ofLine')
    
    changeUserData();
 }  
 function goOnLine(){
   console.log("online mode : ",isOnLine)
    setIsOnLine(true)
    //localStorage.setItem('playMode' , 'onLine')
 } 
 function goBot (){
    changeUserData();
    setIsBot(true)
   // localStorage.setItem('playMode' , 'AI')
   
    return true
 }  
   
 console.log('are you play agenst AI',isBot)
    

//  function handelFormChange(e){

//     setUsers(old =>{
//        return old.map((object)=>{
        
//        }
        
//        )
       

//     })
    
//  }
   

 function changeUserData(){
               if (isOfLine) {
           
            setUsers([{firstName: '' , avatarUrl: './icon/avatar1.svg'}  , {firstName:'' , avatarUrl: './icon/avatar2.svg'}])
            }else if (isBot){
            setUsers([{firstName:'' , avatarUrl: './icon/avatar1.svg'}  , {firstName:'krbaa' , avatarUrl: './icon/avatar2.svg'}])
            }  
 
}
 

function handelFormChange(e){

    setUsers(old =>{
       return old.map((object , index)=>{
        
             if (e.target.name === 'player1Name'){
                
                if (index === 0){
                    return{ ...object , firstName: e.target.value}
                }
             }else if (e.target.name === 'player2Name'){
            
                if (index === 1){
                    return{ ...object , firstName: e.target.value}
                }
             }
                    return object;
             
           
        
       }
        
       )  

    })
    
    
 }

    /** changing the language of the game  */

   
    function handelLanguageChange(e){
     let selectedLanguage = e.target.value
     if (selectedLanguage){
        if (selectedLanguage === 'English' || selectedLanguage === 'انجليزي'){
         localStorage.setItem('language' , 'en' ) // add the language to the localStorage 
         setIsArabic(false)
         setIsEnglish(true)
        }else if (selectedLanguage === 'Arabic' || selectedLanguage === 'عربي'){
         localStorage.setItem('language' , 'ar' ) // add the language to the localStorage 
         setIsArabic(true)
         setIsEnglish(false)
        }

     }
    
    }
 

    function languageToggle(){

      setIsArabic(old =>{
         if(old === true){
            localStorage.setItem('language', 'en')
            return false;
         }else if(old === false){
            localStorage.setItem('language', 'ar')
            return true;
            
         }
      })
      setIsEnglish(old =>{
         if(old === true){
            localStorage.setItem('language', 'ar')
            return false;
         }else if(old === false){
            localStorage.setItem('language', 'en')
            return true;
            
         }
      })

    }
    
  
  
     /*** dark mode function and flipper state */
     const [isDarkMode , setIsDarkMode] = React.useState(false)
     function changeDarkMode(){

      setIsDarkMode(old => {
         if (old === true ){

            localStorage.setItem('isDarkMode', false);
            return false;
         }else if (old === false){

            localStorage.setItem('isDarkMode', true);
             return true;
         }
      })
     }
     React.useEffect(() => {
          let DarkMode = localStorage.getItem('isDarkMode');
         
         if (DarkMode === 'false'){

            setIsDarkMode(false)
         }else {
            setIsDarkMode(true)
         }
     }, [])



     document.body.style.backgroundColor = isDarkMode ? "rgb(45, 46, 59)": '#fff';
    /*** sound flipper on Of */
    React.useEffect(()=>{
      if(localStorage.getItem(soundON)){
           let sound = localStorage.getItem('sound');
          
         sound ? setSoundON(true) : setSoundON(false) ;
      }
    

    }, [soundON])
  
    function soundToggle(){
      
      setSoundON(old=> {
         if (old === true){
            localStorage.setItem('sound', false)
             return false
         }else if (old === false){
            localStorage.setItem('sound', true)
             return true;
         }
      } )
    }
     


    /**** make a design responsive to the window size */

  const [diskTopMode , setDiskTopMode] = React.useState();
  const [phoneMode , setPhoneMode] = React.useState();

 
   React.useEffect(() => {
      if(window.innerWidth >= 900){
         setDiskTopMode(true);

      }else if (window.innerWidth <=646){
         setPhoneMode(true);
      }
      
   } , [])

      window.onresize = () => {
              if (window.innerWidth <= 900){
                setDiskTopMode(false); 
              }else  {
               setDiskTopMode(true);
              }
         
              if(window.innerWidth <= 646 ){
               setPhoneMode(true);
              }else {
               setPhoneMode(false);
              }
      }
  


   /** message container design */
   let message = document.createElement('div')
   message.style.position = 'absolute';
   message.style.bottom = '20px'; 
   message.style.left = phoneMode?'20%':'30%';
   message.style.width = 'fit-content';
   message.style.height = '20px'
   message.style.backgroundColor = 'inherit';
   message.style.borderColor =  'rgb(0,108,133)'
   message.style.borderWidth = '0px'
   message.style.borderStyle = 'solid'
   message.style.borderRadius = '5px'
   message.style.color = 'rgb(0,108,133)'
   message.style.fontSize = 'small'
   message.style.transition = '1s'
   message.style.boxShadow = '-3px 6px 7px rgba(11, 11, 11, 0.264)'
   message.style.padding = '5px'
   message.style.fontWeight = phoneMode? 'smaller' :'small';
   message.style.fontSize = phoneMode?'10px': '12px';
   message.style.backgroundColor = 'rgb(233, 245, 248)'
  


    return (
        <BrowserRouter>
        
             <Routes>
                    
                        
                        <Route element = {
                          <DarkTheme.Provider value={isDarkMode}>
                           <phoneModeContext.Provider value={phoneMode}>
                           <LayoutComponent 
                                          soundON = {soundON}
                                          soundToggle = {soundToggle} 
                                          diskTopMode = {diskTopMode}
                                          changeDarkMode = {changeDarkMode}
                                          isArabic = {isArabic}
                                          handelLanguageChange = {languageToggle}
                            />
                            </phoneModeContext.Provider>
                           </DarkTheme.Provider>

                        }>

                        <Route path="/" element = { 
                                              //     <DarkTheme.Provider value={isDarkMode}>
                                                   <HomePage
                                                   setIsBot = {setIsBot}
                                                   diskTopMode = {diskTopMode}
                                                   isArabic = {isArabic}
                                              
                                                   handelFormChange = {handelFormChange}
                                                   goOnLine = {goOnLine} 
                                                   goOfLine = {goOfLine}
                                                   goBot = {goBot}
                                                   isBot = {isBot}
                                                   message = {message} 
                                                   
                                                   />
                                             //      </DarkTheme.Provider>
                                                   }/>

                        <Route path="/gameTable" element = { 
                                                  <ArabicLanguageContext.Provider value = {isArabic}>
                                                  <usersDataContext.Provider value={users} >
                                                   <Main  
                                                   isBot = {isBot}
                                                   phoneMode = {phoneMode}
                                                   diskTopMode = {diskTopMode}
                                                   isArabic = {isArabic}
                                                   isEnglish = {isEnglish}
                                                   handelLanguageChange = {handelLanguageChange}
                                                   soundON = {soundON}
                                                   soundToggle = {soundToggle}
                                                   isDarkMode = {isDarkMode} 
                                                   users = {users}
                                                   
                                                   />
                                                   </usersDataContext.Provider>
                                                   </ArabicLanguageContext.Provider>
                                                   } />

                        </Route> 
                      
                    
             </Routes>

        </BrowserRouter>
    )
}