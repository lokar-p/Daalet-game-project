import React from "react";
import {DarkTheme} from '../app'
export default function GameTable(props){
    
    const DarkMode = React.useContext(DarkTheme)
    
    
 React.useEffect(()=>{// change the color of even squires in gameTable when toggles to dark mode style
    if(DarkMode){

        let evenTable = document.getElementsByClassName('evenTable')
        let evenTableArray = Object.values(evenTable);
        
        evenTableArray.map(ele => {
                                    let oldColor = window.getComputedStyle(ele , null).getPropertyValue('background-color'); // contain
                                    
                                    window.localStorage.setItem('tdOldColor',oldColor)
                                
                                    setTimeout(() => {
                                        ele.style.backgroundColor = 'rgb(101, 105, 105)'
                                    },100);
                                    return null;
                            
                            
    })
    }else if(!DarkMode){
        let evenTable = document.getElementsByClassName('evenTable')
        let evenTableArray = Object.values(evenTable);
      
        evenTableArray.map(ele => {

                                    let oldColor = window.localStorage.getItem('tdOldColor') 
                                    
                                    ele.style.backgroundColor = oldColor
                            
                                    return null;
        })
    

   }

 } , [DarkMode])  
   

  
 let phoneModeStyle = {// gives a margin and width to table when the size of the screen becomes a smaller 
    margin : '5px 10px 5px 10px',
    width : '95%',

 }
 let diskTopModeStyle = {
    margin : props.diskTopMode ? '30px 30px 10px 70px' : '30px 10px',
 }

 
    return (
        <table style={props.phoneMode ? phoneModeStyle : diskTopModeStyle}>
            <tbody id="tBody"  >
                <tr>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                    id = '0'
                    ></td>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                   
                    id = "1">
                    </td>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                    id = "2">
                    </td>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                   
                    id ={3}>
                    </td>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                    id = "4">
                    </td>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                   
                    id = "5">
                    </td>
                </tr>
                <tr>
                    
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                      
                    id = "6">
                    </td>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                 
                   id = "7"></td>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                    
                    id = "8">
                    </td>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                   
                    id = "9">
                    </td>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                    
                    id = "10">
                    </td>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                   
                    id = "11">
                    </td>
                </tr>
                <tr>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                    id = "12">
                    </td>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                   
                    id = "13">
                    </td>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                    id = "14">
                    </td>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                   
                    id = "15">
                    </td>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                    id = "16">
                    </td>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                   
                    id = "17">
                    </td>
                </tr>
                <tr>
                
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                    
                    id = "18">
                    </td>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                   
                    id = "19">
                    </td>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                    
                    id = "20">
                    </td>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                   
                    id = "21">
                    </td>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                       
                    id = "22">
                    </td>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                
                    id = "23">
                    </td>
                    
                </tr>
                <tr>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                    
                    id = "24">
                    </td>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                   
                    id = "25">
                    </td>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                    id = "26">
                    </td>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                   
                   id = "27"></td>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                    id = "28">
                    </td>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                   
                    id = "29">
                    </td>
                
                </tr>
                <tr>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                    
                    id = "30">
                    </td>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                   
                   id = "31"></td>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                     
                    id = "32">
                    </td>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                  
                    id = "33">
                    </td>
                    <td className='empty evenTable'
                    onClick = {props.addElemToTable}
                      
                    id = "34">
                    </td>
                    <td className='oddTable empty' 
                    onClick = {props.addElemToTable}
                 
                    id = "35">
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
