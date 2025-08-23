import React from "react";
import PlayerStatus from "./player_status";
export default function PlayerTable(props){

    const darkModStyle ={
    
        color :' rgb(233, 245, 248)'  ,
        backgroundColor: 'rgba(38, 183, 212, 0.412)',
     
  }
 
// const buttonStyle ={
//     borderColor: '#dbbbbb',
//   color: 'rgb(233, 245, 248)',
  
// }

const arrowBorderStyle = {
    borderColor: '#dbbbbb',

}
const borderStyle ={
 color : ' rgb(233, 245, 248)',
   
 borderColor: '#dbbbbb',
    
 backgroundColor: 'rgba(38, 183, 212, 0.412)',

    

}


const arrowStyle = {
    fontSize : !props.isArabic ? '10px' : '12px',
    color : 'rgb(233, 245, 248)',
   
}
const BBorderColor = {
    
        borderStyle: 'solid',  
        borderColor: '#a67677',
        borderTop : '0px',
        borderLeft : '0px',
        borderRight : '0px',
        borderRadius: '8px',

}
const HBorderStyle ={
    borderStyle: 'solid',  
    borderColor: '#dbbbbb',
    borderBottom : '0px',
    borderLeft : '0px',
    borderRight : '0px',
    borderRadius: '8px',
    
}

 
const scoreStyle = {
    
    color:  'rgb(233, 245, 248)' ,
    borderColor: '#dbbbbb',
}

let arabicStyle = {
    
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '5px',
    marginLeft: '0px',
    marginRight: 'auto',
}
let DarkModeTextColor = {
    color:  'rgb(233, 245, 248)' ,
}

    return (
        <div className="playerStatus"  style={props.isArabic ?arabicStyle : null}>
             <div> 
                <PlayerStatus 
                phoneMode = {props.phoneMode}
                isArabic = {props.isArabic}
                isDarkMode = {props.isDarkMode}
                borderStyle = {BBorderColor}
                user = {props.users[0]}
                score = {props.player1_score}
                style = {DarkModeTextColor}
                won = {props.won}
                player1= {true}
                forward = {props.forward}
                backward = {props.backward}
                 />
              
                <div className="sahanDiv">
                
                    <div className="sahanIcon"   style={darkModStyle}>
                    <button className="elemCounter" >{props.player1_count}</button>
                   
                    <img alt="" src='icon/balha.svg'
                          className="elem" 
                          id = "balahaId"
                          onClick={props.player1Turn}
                             />
                 </div>

                 <div className="rizAndArrowCon">
                
                        <div className="arrowsContainer">
                                <div className="backwardArrow"  onClick={props.backward}>
                                
                                    <div className="BArrowTell" ></div>
                                    <div className="BArrowHead" ></div>
                                    <p  style={arrowStyle}>{props.isArabic ? 'تراجع' : 'back'}</p>
                                   
                                </div>
                                 

                                <div className="forwardArrow"  onClick={props.forward}>
                                   
                                    <div className="arowTell" ></div>
                                    <div className="arowHead" ></div>
                                     <p style={arrowStyle}>{props.isArabic ? 'امام' : 'forward'}</p>
                                </div>
                                

                        </div>
                        <button className='rezain-botton'   onClick={props.won} id="player1RizB"  style={darkModStyle}>{props.isArabic ? 'إستسلام' : 'resign'}</button>
                     </div>

                </div>
             </div> 
             <div> 
              
             </div>
             <div>
                <div className="sahanDiv">
                    
                      <div className="sahanIcon"  style={borderStyle}>
                        
                        <button className="elemCounter"  style= {{borderColor: !props.player2 && '#dbbbbb'}}>{props.player2_count}</button>
                        <img alt="" src='icon/hajar.svg'
                            className="elem" 
                            id ='hajar' 
                            onClick={props.player2Turn}
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
                        <button className='rezain-botton'  style={borderStyle} onClick={props.won} id="player2RizB">{props.isArabic ? 'إستسلام' : 'resign'}</button>
                     </div>
                </div>
               
                <PlayerStatus 
                    phoneMode = {props.phoneMode}
                    isArabic = {props.isArabic}
                    isDarkMode = {props.isDarkMode}
                    borderStyle={HBorderStyle}
                    user = {props.users[1]}
                    score = {props.player2_score}
                    style = {scoreStyle}
                    won = {props.won}
                    player2= {true}
                />
            </div>
        </div>
    )
}