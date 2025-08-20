import React from "react";


function THemesPopUp(props){


  let menuPopupArabic= {

    width: '200px',
    position: 'absolute',
    top: props.positionTop, 
    right:  props.positionRight,
    display: !props.PopupTrigger ? 'none' : 'flex',
    flexDirection: 'column',
   }
   let menuPopupEnglish= {

     width: '200px',
     position: 'absolute',
     top: props.positionTop, 
     left:  props.positionLeft,
     display: !props.PopupTrigger ? 'none' : 'flex',
     flexDirection: 'column',
    } 
 function ChangeTableStyle(e){
  
  
  
    let Class = e.target.classList[0]
    
    let table = document.querySelectorAll('td')
    let tableArray = Object.values(table)
   
    tableArray.map(td => {
        if (td.classList.contains('cerDiv')){
          td.classList.remove('cerDiv')
        }else if (td.classList.contains('triDiv')){
          td.classList.remove('triDiv')
        }else if (td.classList.contains('normDiv')){
          td.classList.remove('normDiv')
        }else if (td.classList.contains('borderDiv')){
          td.classList.remove('borderDiv')
        }
        td.classList.add(Class)
    
    })

 }
 function changeColors(e){
   
          let bgColor = window.getComputedStyle(e.target , null).getPropertyValue('background-color') ;// get background color value from clicked element
          
         
          let table = document.querySelectorAll('td')
          let tableArray = Object.values(table)
            
           
          
          tableArray.map(td => {
           
            if (td.classList.contains('oddTable')){
              td.style.backgroundColor = bgColor
              
            }
           
          })
         
      
      
 }

  let pragraghStyle = {
    margin: '0px',
    padding : '10px 10px',
    display: 'inline-block',
    

  }



function createRandomColors(){
       let colorsDiv = document.getElementsByClassName("color");
       let colors = Object.values(colorsDiv);
       colors.map(color =>{
        let random1 = Math.floor(Math.random()*255)
        let random2 = Math.floor(Math.random()*255)
        let random3 = Math.floor(Math.random()*255)
        color.style.backgroundColor = `rgb(${random1}, ${random2} , ${random3})`
       })


      
}
  
   
    return (
   <div id='popUpTheme' className="popUp" style = {props.isArabic? menuPopupArabic : menuPopupEnglish}>
         {!props.isArabic && <div style={{display: 'flex' , justifyContent : "space-between" , alignItems: 'center'}}> <p style={pragraghStyle}>Colors</p> 
        <div className="colorBStyle" onClick= {createRandomColors}> new colors
        </div> 
   </div>}

   {props.isArabic && <> 
    <div style={{display:'flex', justifyContent: 'space-between' ,alignItems:'center'}}> 
  
         <div className="colorBStyle" onClick= {createRandomColors}>  الوان جديدة
         </div> 
         <p style={pragraghStyle}> الالوان</p>
    </div>
   </>}
   <div className="colorsDiv" id = 'colorDiv'>
       <div id = 'lightColor'  className= 'lightColor color' onClick={changeColors}></div>
       <div id = 'blueColor' className= 'blueColor color'   onClick={changeColors}></div>
       <div id = 'readColor' className= "readColor color"  onClick={changeColors}></div>
       <div  id = 'yallowColor' className= "yallowColor color"  onClick={changeColors}></div>
   </div>

   {!props.isArabic && <p style={pragraghStyle}>Table style</p>}
   {props.isArabic && <p style={pragraghStyle}>شكل اللوحة</p>}
   <div className="bordStyleDiv" >
       <div className = 'cerDiv' onClick = {ChangeTableStyle}></div>
        <div className = 'triDiv'  onClick = {ChangeTableStyle}></div>
       <div className = ' borderDiv'  onClick = {ChangeTableStyle}></div>
       <div className = ' normDiv'  onClick = {ChangeTableStyle}></div>
   </div>

</div>)
}

export default THemesPopUp;