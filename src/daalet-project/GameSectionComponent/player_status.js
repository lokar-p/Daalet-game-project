import React from "react";

export default function PlayerStatus(props){

    /* phone mode style  */

const     phoneModeStyle = {
    paddingTop: '4px',
    borderLeft: '0px',
    borderRight: '0px',
    borderTop: props.player1? '0px' :'5px',
    borderBottom:props.player2? '0px': '5px',
    margin: '5px',
    boxShadow : '0px 2px 6px 2px rgb(0 , 0 , 0 , 0.6 )',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
   
    borderColor : props.player2? '#dbbbbb' : '#a67677',
    borderStyle: 'solid',
  


}

const buttonStyle ={
    borderColor: !props.player1 && '#dbbbbb',

  
}

const arrowBorderStyle = {
    borderColor: !props.player1 && '#dbbbbb',

}
const borderStyle ={
 
   
 borderColor: !props.player1 &&  '#dbbbbb',

 backgroundColor: 'rgba(38, 183, 212, 0.412)',

    

}


const arrowStyle = {
    fontSize : !props.isArabic ? '10px' : '12px',
    color : 'rgb(233, 245, 248)',
   
}







      /* phone mode style  */
    let darkStyle = {
        
        borderColor: props.player2 && '#dbbbbb',
        backgroundColor:'rgba(38, 183, 212, 0.412)',
       

    }

    let ScoreDarkStyle = {

        borderColor: props.player2 && '#dbbbbb',
        backgroundColor :  'rgba(38, 183, 212, 0.412)',
    } 

    let avatar =  <div className="imgDiv" style={darkStyle}>
    <img  src={props.user.avatarUrl}/>
    </div>
    let playerName =  <h5 >{props.user.firstName}</h5>


    let user =  <div className="player">
    {props.isArabic && playerName}
    {props.isArabic && avatar}
   
    {!props.isArabic && avatar}
    {!props.isArabic && playerName}
       
    </div>

    let score =  <div className="scoreContainer" style={props.scoreStyle}>
                    <h5 >{props.isArabic ? 'النقاط' : 'SCORE'}</h5>
                    <div className="scoreDiv" style={ScoreDarkStyle}><h3>{props.score}</h3></div>
                 </div>



let   phoneMode  = props.phoneMode? <div className="sahanDiv">
                    
<div className="sahanIcon"  style={borderStyle}>
  
  <button className="elemCounter" style={{borderColor: props.player2 && '#dbbbbb'}}>{props.count}</button>
  <img src={props.path}
      className="elem" 
      id ={props.id} 
      onClick={props.playerTurn}
      />
</div>
<div className="rizAndArrowCon">
  <div className="arrowsContainer" >
          <div className="backwardArrow"  style={arrowBorderStyle } onClick={props.backward}>
              <p style={arrowStyle}>{props.isArabic ? 'تراجع' : 'back'}</p>
              <div className="BArrowTell" style={arrowBorderStyle}></div>
              <div className="BArrowHead" style={arrowBorderStyle}></div>
          </div>

          <div className="forwardArrow" style={arrowBorderStyle}   onClick={props.forward}>
              <p style={arrowStyle}>{props.isArabic ? 'امام' : 'forward'}</p>
              <div className="arowTell" style={arrowBorderStyle}></div>
              <div className="arowHead" style={arrowBorderStyle}></div>
          </div>
          
  </div>
  <button className='rezain-botton'  style={borderStyle} onClick={props.won} id={props.id}>{props.isArabic ? 'إستسلام' : 'resign'}</button>
</div>
</div>: null;


    return(
        <div className="statusDiv" style={phoneModeStyle}>
               
    {props.isArabic && score}
    {props.isArabic && phoneMode}
    {props.isArabic && user}

   
   
    {!props.isArabic &&  user}
    {!props.isArabic && phoneMode}
    {!props.isArabic && score}

               
            </div>
    )
}