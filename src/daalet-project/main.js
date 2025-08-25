import React from "react";
import SidBar from "./GameSectionComponent/sidbar";
import GameTable from "./GameSectionComponent/game_table";
import PlayerTable from "./GameSectionComponent/player_table";
import WonTable from "./wonTable";
import {nanoid} from 'nanoid';
import PlayerStatus from "./GameSectionComponent/player_status";

export default function Main(props){
    const [addLog , setAddLog] = React.useState([])
    const[moveLog , setMoveLog] = React.useState([])
    const [player1_turn , setPlayer1_turn] = React.useState(false)
    const [player2_turn , setPlayer2_turn] = React.useState(false)
    const [balha_count , setBalha_count] = React.useState(12)
    const [hajar_count , setHajar_count] = React.useState(12)
    const [player1_has_kill, setPlayer1_has_kill] = React.useState(false)
    const [player2_has_kill, setPlayer2_has_kill] = React.useState(false)
    const [player1_score, setPlayer1_score] = React.useState(0)
    const [player2_score, setPlayer2_score] = React.useState(0) 
    const [changeBrRadius , setChangeBrRadius] = React.useState(0);
    const [playerWon , setPlayerWon] = React.useState(false);
    const [whoRiz, setWhoRiz] = React.useState();
    

    

/*** audio effect containers */

let movingAudio = new Audio('./audio/moveAudio2.wav')// when element moves
    movingAudio.volume = .5;
let sequenceAudio = new Audio('./audio/sequenceAudio.mp3')
    sequenceAudio.volume = .5;
let winAudio = new Audio('./audio/winAudio.mp3') 
    winAudio.volume = .5;
let bgAudio = new Audio('./audio/startAudio.mp3')
    bgAudio.volume = .3;
let wrongAudio = new Audio('./audio/wrongMoveAudio3.wav')
    wrongAudio.volume = .5;
let killAudio = new Audio('./audio/killAudio2.mp3')
    killAudio.volume = .5;
let addAudio = new Audio('./audio/addAudio3.mp3')
    addAudio.volume = .6;
let reLive = new Audio('./audio/reLive.mp3')
    reLive.volume = .4;

 /*****************************************/    
    let borderStyle = {

        borderRadius : `${changeBrRadius}`
    }
    
    

  

    function getUserRadiusValue(e){
        setChangeBrRadius(e.target.value)

        let allTd = document.querySelectorAll("td")
        let allTdArray = Object.values(allTd)
        allTdArray.forEach((el)=>{
       
            el.style.height='70px'
            el.style.borderRadius = {borderStyle}
      })
      
    }

   



   /** change player turn by change the value of plyer_turn state */
    function player1Turn (){// player 1 turn 
        setPlayer1_turn(true)
        setPlayer2_turn(false)
    }

    function player2Turn (){// player 2 turn
       setPlayer2_turn(true)
       setPlayer1_turn(false)
    }

    const removeBoColor = (e) =>{//remove the border color for selected element when player dblclick on element
        if (e.target.parentElement.classList.contains('BBorderColor') ){
            e.target.parentElement.classList.remove('BBorderColor')
        }else if (e.target.parentElement.classList.contains('HBorderColor')){
            e.target.parentElement.classList.remove('HBorderColor')
        }
    }
 
    let balha = document.createElement('img')// create a play element called balha 
    balha.src = '/icon/balha.svg'
    balha.style.width = '45px'
    balha.style.height = '45px'
    balha.classList.add('balha')
   
    balha.addEventListener('dblclick' , removeBoColor)
 

    let hajar = document.createElement('img')// create play element called hajar
    hajar.src = '/icon/hajar.svg'
    hajar.style.width = '45px'
    hajar.style.height ='45px'
    hajar.classList.add('hajar')

    hajar.addEventListener('dblclick', removeBoColor )

    
    

    /** remove balha or hajar from the parent element  if player1 or player2 has kill */
    const removeHajar = (target , has ) => {//  remove the opponent element 'hajar or balha' from the td if player 1 or player 2 has kill and set player_has_kill to false
        
        if(player1_has_kill === true && target.classList.contains('hajar') ){
            if(target.parentElement.classList.contains('HBorderColor')){
                target.parentElement.classList.remove('HBorderColor')
             }
           
            props.soundON && killAudio.play(); 
            let id = target.id  
            let parent = target.parentElement.id
            setMoveLog(old =>{

                return [...old , `${id} hajar ${parent}`]
            })
          
            target.parentElement.classList.add('empty')
            target.parentElement.classList.remove(has)
            target.parentElement.removeChild(target)
            
            setPlayer1_score(old => old + 1)
            setPlayer1_has_kill(false)
            player2Turn();
           
            
                
        
        
        }
    }


    const removeBalha = (target , has ) => {//  remove the opponent element 'hajar or balha' from the td if player 1 or player 2 has kill and set player_has_kill to false
        
        if(player2_has_kill === true && target.classList.contains('balha')){
            
            if(target.parentElement.classList.contains('BBorderColor')){
                target.parentElement.classList.remove('BBorderColor')
             }

              props.soundON && killAudio.play(); 

          
            let id = target.id  
            let parent = target.parentElement.id
            setMoveLog(old =>{
                return [...old , `${id} balha ${parent}`]
            })
            
            target.parentElement.classList.add('empty')
            target.parentElement.classList.remove(has)
            target.parentElement.removeChild(target)
            setPlayer2_score(old => old + 1)
            setPlayer2_has_kill(false)
            player1Turn();
            
           
                
        
        
        }
    }

 /** change the sequence bg color to green  */
   function changeSconceBgColor(element , next , prev){// change bg color to green when there is a secoances of 3 elements
    let elementBgColor = window.getComputedStyle(element , null).getPropertyValue('background-color')
    let nextBgColor = window.getComputedStyle(next, null).getPropertyValue('background-color')
    let prevBgColor = window.getComputedStyle(prev, null).getPropertyValue('background-color')
  

    element.style.backgroundColor = ' rgb(101, 205, 129)'
    next.style.backgroundColor = ' rgb(101, 205, 129)'
    prev.style.backgroundColor = ' rgb(101, 205, 129)'
   
    setTimeout(()=>{
        
        element.style.backgroundColor = elementBgColor
        next.style.backgroundColor = nextBgColor
        prev.style.backgroundColor = prevBgColor

      

    },1000)
   }
   
 /** find th previous element in vertical line  */
   function findPrevEle(element , id){
   
   
    if (element.parentElement.previousElementSibling){
          for (let i= 0 ; i< element.parentElement.previousElementSibling.children.length ; i++) {//loop over the children of the previous tr to get the adjacent element for the clicked td
        if (+element.parentElement.previousElementSibling.children[i].id === +id) { // if the child id === clicked id - 6 assign it to previousElement
           let  previousElement =  element.parentElement.previousElementSibling.children[i]
           return previousElement;
        }
    }
    }
  


 }
 /** find the next element in vertical line */
 function findNextEle(element , id){
   
 
    if (element.parentElement.nextElementSibling){
         for (let i= 0 ; i< element.parentElement.nextElementSibling.children.length ; i++) {//loop over the children of the previous tr to get the adjacent element for the clicked td
        if (+element.parentElement.nextElementSibling.children[i].id === +id) { // if the child id === clicked id + 6 assign it to previousElement
           let  nextElement =  element.parentElement.nextElementSibling.children[i]
           return nextElement;
        }
     }
    }
   


 }
  function preventSconce (count , ele , next , prev , plKill){//prevent the player from making a sequence if the count > 0 if count = 0 allow the player to add element to the game table
        
        if (count > 0) {

            props.soundON &&  wrongAudio.play();
            return true;
           
           
          }else {
               
               changeSconceBgColor(ele , next , prev);
               props.soundON && sequenceAudio.play();
               if (plKill === 1){
                   setPlayer1_has_kill(true)
               }else if (plKill === 2){
                   setPlayer2_has_kill(true)
               }
               return false;
            }
      }
  
    /** check if there is a sequence of 3 element of the same type ' balha or hajar '
     *  and if there is a sequence change the player has kill to true */
    function CheckForSconce(element ,next , prev , has , playerKill ,nextParent , prevParent , playerCount){
         
        if (next && prev){
            if (next.classList.contains(has) && prev.classList.contains(has)){
                
                    if (next.nextElementSibling && prev.previousElementSibling){
                    
                        if(!next.nextElementSibling.classList.contains(has) && !prev.previousElementSibling.classList.contains(has)){
                            return   preventSconce (playerCount , element , next, prev, playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element and if not allow the player to add element to the table                         
                        
                        }
                    } else if (next.nextElementSibling && !prev.previousElementSibling){
                    
                        if(!next.nextElementSibling.classList.contains(has)){
                            return   preventSconce (playerCount , element , next, prev, playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element  and if not allow the player to add element to the table 
                            
                        }
                    } else if (!next.nextElementSibling && prev.previousElementSibling){
                    
                        if(!prev.previousElementSibling.classList.contains(has)){
                            return   preventSconce (playerCount , element , next, prev, playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element and if not allow the player to add element to the table   
                                            
                        }
                    }
                        
           

            }else if (next.classList.contains(has) && !prev.classList.contains(has)) {
                
                let nextsib = next.nextElementSibling
                if (nextsib && nextsib.classList.contains(has)){
                    if(nextsib.nextElementSibling){
                        if(!nextsib.nextElementSibling.classList.contains(has)){
                            return   preventSconce (playerCount , element , next, nextsib, playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element and if not allow the player to add element to the table   
                           
                        }
                      }else {

                        return   preventSconce (playerCount , element , next, nextsib, playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element and if not allow the player to add element to the table  
                       
                    }

                }

            }else if (!next.classList.contains(has) && prev.classList.contains(has)) {
                let prevsib = prev.previousElementSibling
                if (prevsib && prevsib.classList.contains(has)){
                    if(prevsib.previousElementSibling){
                        if(!prevsib.previousElementSibling.classList.contains(has)){

                            return   preventSconce (playerCount , element , prev, prevsib , playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element and if not allow the player to add element to the table  

                        }
                       
                    }else {
                        return   preventSconce (playerCount , element , prev, prevsib , playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element   and if not allow the player to add element to the table
                        
                    }

                }

            }
        }else if (next && !prev){
            let nextsib = next.nextElementSibling
                
              if (next.classList.contains(has)) {
                      if(nextsib.classList.contains(has)){
                          if(!nextsib.nextElementSibling.classList.contains(has)){

                            return   preventSconce (playerCount , element , next, nextsib , playerKill)
                             
                          }
                      
  
                  }
              }

        } else if (!next && prev){
            let prevsib = prev.previousElementSibling
            
              if (prev.classList.contains(has)) {
                  if(prevsib.classList.contains(has)){
                      if(!prevsib.previousElementSibling.classList.contains(has)){
                        return   preventSconce (playerCount , element , prev , prevsib , playerKill)
                        
                      }
                   }
              }

            
           
        }

        let nextElementId =  Number(element.id)  + 6
        let prevElementId = Number(element.id) - 6 ;
        let prevElement =  findPrevEle(element , prevElementId);
        let nextElement = findNextEle(element , nextElementId)

        if (nextParent && prevParent){

            if (nextElement.classList.contains(has) && prevElement.classList.contains(has)){
                /** checked for both balha and hajar .it is work will */
            
                let nextToNextElement = findNextEle(nextElement , nextElementId + 6)
                let prevToPrevElement = findPrevEle(prevElement , prevElementId -6)
                if (nextToNextElement && prevToPrevElement){
                
                    if(!nextToNextElement.classList.contains(has) && !prevToPrevElement.classList.contains(has)){
                    return   preventSconce (playerCount , element , nextElement , prevElement , playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element   and if not allow the player to add element to the table
                        
                    
                    }
                } else if (nextToNextElement && !prevToPrevElement){
                
                    
                    
                    if(!nextToNextElement.classList.contains(has)){
                        return   preventSconce (playerCount , element , nextElement , prevElement , playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element   and if not allow the player to add element to the table
                    }
                } else if (!nextToNextElement && prevToPrevElement){
                
                    if(!prevToPrevElement.classList.contains(has)){

                        return   preventSconce (playerCount , element , nextElement , prevElement , playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element   and if not allow the player to add element to the table 
                    }
                }
                    
            

            }
            /**end of both side has 'balha or hajar */
            /** start of the next side has balha */
            else if (nextElement.classList.contains(has) && !prevElement.classList.contains(has)) {
                    /***** checked for both 'hajar and balha ' . just work fine*/
                let nextToNextElement = findNextEle(nextElement , nextElementId + 6)
                if (nextToNextElement && nextToNextElement.classList.contains(has)){
                    let nextOfSconce = findNextEle(nextToNextElement ,  nextElementId + 12)
            
                    if (nextOfSconce) {
                        if(!nextOfSconce.classList.contains(has)){
                            
                            return   preventSconce (playerCount , element , nextElement , nextToNextElement , playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element   and if not allow the player to add element to the table
                        }
                        
                    }
                        else {
                                return   preventSconce (playerCount , element , nextElement , nextToNextElement , playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element   and if not allow the player to add element to the table
                        
                        }

                }

            }/** end of the next side has balha */
            /** start of the previous side has balha */

            else if (!nextElement.classList.contains(has) && prevElement.classList.contains(has)) {
                /***** checked . and it is work fine*/
                let prevToPrevElement = findPrevEle(prevElement , prevElementId -6)
                if (prevToPrevElement && prevToPrevElement.classList.contains(has)){
                    let prevOfSconce = findPrevEle(prevToPrevElement , prevElementId - 12 )
                    if(prevOfSconce){
                    
                        if(!prevOfSconce.classList.contains(has)){
                            return   preventSconce (playerCount , element , prevElement , prevToPrevElement , playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element   and if not allow the player to add element to the table
                        
                        }
                    }else {
                            return   preventSconce (playerCount , element , prevElement , prevToPrevElement , playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element   and if not allow the player to add element to the table
                    }

                }

            }
    } 
        
         
        if (nextElement && !prevElement){
          
        
           let nextElement = findNextEle(element , nextElementId)
        
          if (nextElement.classList.contains(has)) {
                  let nextToNextElement = findNextEle(nextElement , nextElementId + 6)
                  if(nextToNextElement.classList.contains(has)){
                    let nextOfSconce = findNextEle(nextToNextElement ,  nextElementId + 12)
                      if(!nextOfSconce.classList.contains(has)){
                        return   preventSconce (playerCount , element , nextElement , nextToNextElement , playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element   and if not allow the player to add element to the table
                          
                      }
                  

              }
          }

    }  else if (!nextElement && prevElement){
        let prevElement =  findPrevEle(element , prevElementId);
         
          if (prevElement.classList.contains(has)) {
            let prevToPrevElement = findPrevEle(prevElement , prevElementId -6)
              if(prevToPrevElement.classList.contains(has)){
                let prevOfSconce = findPrevEle(prevToPrevElement , prevElementId - 12 )
                  if(!prevOfSconce.classList.contains(has)){
                    return   preventSconce (playerCount , element , prevElement , prevToPrevElement , playerKill)// if balha count or hajar count > 0 prevent the player from making a sequence of 3 element   and if not allow the player to add element to the table
                     
                  }
               }
          }

        
       
    }

    }


    function addBorderColor(e , has){// add border color to clicked element in order to move it.
        let td = document.querySelectorAll('td')
        let tdArray = Object.values(td)
       
        if(has === 'balha'){
            tdArray.map(el => 
                {
                   let height =   window.getComputedStyle(el , null).getPropertyValue('height')
                  
                    if(el.classList.contains('BBorderColor')){
                        el.classList.remove('BBorderColor')
                        el.style.height = height-6
                    }else if(el.classList.contains('HBorderColor')){
                        el.classList.remove('HBorderColor')
                        el.style.height = height-6
                    }
                    return null;
            })
           
                e.parentElement.classList.add('BBorderColor')
         
           
            
           
        }else if(has === 'hajar'){
            tdArray.map(el => 
                {
                    let height =   window.getComputedStyle(el , null).getPropertyValue('height')
                   
                    if(el.classList.contains('HBorderColor')){
                        el.classList.remove('HBorderColor')
                        el.style.height = height-6
                    }else if(el.classList.contains('BBorderColor')){
                         el.classList.remove('BBorderColor')
                         el.style.height = height-6
                    }
                    return null;
            })

                e.parentElement.classList.add('HBorderColor')
           
           
           
            
        }
       

        
    }

    
    /** this function add a play item "balha or hajar" to the game table  */
    function addElemToTableANDMoveElement(event){
        
        if(player1_turn){
                removeHajar(event.target , 'has_hajar'  )// if player 2 has kill and the  the turn on player 2 remove the player 1 element when it clicked
            
                 
                if ( balha_count > 0  
                     && event.target.classList.contains('empty'))
                   {// if count is greater than zero add element to the table when player click on the table
                    let nextSibling = event.target.nextSibling // next sibling for td 
                    let previousSibling = event.target.previousSibling// previous sibling for td
                    let previousParentSibling = event.target.parentElement.previousElementSibling//previous parent sibling for clicked td
                    let nextParentSibling = event.target.parentElement.nextElementSibling//next parent sibling for clicked td
                     
                     let wrongMove = CheckForSconce(event.target , nextSibling , previousSibling , 'has_balha', 1 ,nextParentSibling , previousParentSibling , balha_count)// check for sequence function return a preventSconce function , preventSconce return true if balha_count != 0  and false if balha_count = 0 and it change the BgColor for the sequence 
                    if (wrongMove) {
                        let oldBgColor = window.getComputedStyle(event.target , null).getPropertyValue('background-color')
                        event.target.style.backgroundColor = 'rgb(255, 0, 0)'
                        setTimeout(() => {
                        event.target.style.backgroundColor = oldBgColor
                        }, 500)
                       
                        player1Turn();
                        
                    }else if (!wrongMove) {
                            
                            setAddLog(old => {
                                 
                               
                                return[...old , event.target.id]
                                     
                            })
                            
                            props.soundON &&  addAudio.play();

                            player2Turn(); 
                            event.target.classList.add('has_balha')
                            event.target.classList.remove('empty')
                            event.target.appendChild(balha)
                            event.target.children[0].id = nanoid();

                            setBalha_count(old => old-1)
                            
                    }
                   
                   
                    
                }else if (player1_turn && event.target.classList.contains('balha')){
                
                    addBorderColor(event.target , 'balha')
                 

                } else if (balha_count === 0 && event.target.classList.contains('empty')){

                            let previousParentSibling = event.target.parentElement.previousElementSibling//previous parent sibling for clicked td
                            let nextParentSibling = event.target.parentElement.nextElementSibling//next parent sibling for clicked td
                            const previousItemId = Number(event.target.id )- 6
                            const nextItemId  = Number(event.target.id)+ 6
                            let previousElement // contain the adjacent element form the clicked td in the previous tr 
                            let nextElement // contain the adjacent element form the clicked td in the next tr
                        
                    /** move balha left and right */
                            
                            let nextSibling = event.target.nextSibling // next sibling for td 
                            let previousSibling = event.target.previousSibling// previous sibling for td
                            /** move balha left */
                            if(nextSibling){// check if there is a next sibling to prevent the error of not finding next sibling
                              
                                const child = nextSibling.children[0] 
                                console.log('child of next sibling', child)
                                if (event.target.nextElementSibling.classList.contains('has_balha') 
                                && event.target.nextElementSibling.classList.contains('BBorderColor')){
                                                /** audio effect */props.soundON && movingAudio.play()
                                        
                                         setMoveLog(old => {
                                            return [...old , `${child.id} ${nextSibling.id}`]
                                         })
                                       

                                        

                                        nextSibling.classList.remove('has_balha')
                                        nextSibling.classList.add('empty')
                                        nextSibling.classList.remove('BBorderColor')
                                       
                                        event.target.appendChild(child)
                                        event.target.classList.add('has_balha')
                                        event.target.classList.remove('empty')
                                        
                                        //  adding background to the parent td and the sibling
                                        let parentBgColor = window.getComputedStyle(event.target , null).getPropertyValue('background-color')
                                        let prevBgColor = window.getComputedStyle(nextSibling , null).getPropertyValue('background-color')   
                                                  

                                                      nextSibling.style.backgroundColor = 'rgb(193, 255, 243)'
                                                      event.target.style.backgroundColor = 'rgb(193, 255, 243)'
                                                   
                                        
                                                    setTimeout(() =>{
                                                         
                                                               if (prevBgColor === 'rgb(193, 255, 243)'){
                                                                console.log('error the color of "sibling" is not changed')
                                                               } else if (parentBgColor === 'rgb(193, 255, 243)'){
                                                                console.log('error the color of "target" is not changed')
                                                               }                                                    
                                                               nextSibling.style.backgroundColor = prevBgColor 
                                                               event.target.style.backgroundColor = parentBgColor
                                                
                                                     
                                                        
                                                   }, 1000)
                                       
                                       CheckForSconce(event.target , nextSibling , previousSibling , 'has_balha', 1 ,nextParentSibling , previousParentSibling )
                                       
                                       let checkValue =   CheckForSconce(event.target , nextSibling , previousSibling , 'has_balha', 1 ,nextParentSibling , previousParentSibling )
                                       
                                       if (checkValue === false){
                                      
                                        player1Turn()
                                       }else if (checkValue === undefined){
                                        
                                        player2Turn()
                                       }

                        
                                        
                                       
                                       
                                }

                            }
                            /** move balha right */
                             if(previousSibling){//check if there is a previous sibling to prevent the error of not finding previous sibling
                               
                                const child = previousSibling.children[0] 
                                if(previousSibling.classList.contains('has_balha') 
                                && previousSibling.classList.contains('BBorderColor')){// check if the previous sibling allows to move by checking if it has a balha and the the border is colored
                                        

                                    setMoveLog(old => {
                                        return [...old , `${child.id} ${previousSibling.id}`]
                                     })
                                     
                                       /** audio effect */ props.soundON && movingAudio.play()
                                   
                                        previousSibling.classList.remove('BBorderColor') 
                                        previousSibling.classList.remove('has_balha')
                                        previousSibling.classList.add('empty')
                                       
                                        event.target.appendChild(child)
                                        event.target.classList.add('has_balha')
                                        event.target.classList.remove('empty')

                                        let parentBgColor = window.getComputedStyle(event.target , null).getPropertyValue('background-color')
                                        let prevBgColor = window.getComputedStyle(previousSibling , null).getPropertyValue('background-color')
                                        previousSibling.style.backgroundColor = 'rgb(193, 255, 243)'
                                        event.target.style.backgroundColor = 'rgb(193, 255, 243)'
                                        
                                        setTimeout(() =>{
                                            if (prevBgColor === 'rgb(193, 255, 243)'){
                                                console.log('error the color of "sibling" is not changed')
                                               } else if (parentBgColor === 'rgb(193, 255, 243)'){
                                                console.log('error the color of "target" is not changed')
                                               }        
                                                   previousSibling.style.backgroundColor = prevBgColor 
                                                  event.target.style.backgroundColor = parentBgColor
                                            
                                        
                                           
                                      }, 1000)
                                       

                                        CheckForSconce(event.target , nextSibling , previousSibling , 'has_balha' ,1 ,nextParentSibling , previousParentSibling)
                                      
                                
                                       let checkValue =   CheckForSconce(event.target , nextSibling , previousSibling , 'has_balha', 1 ,nextParentSibling , previousParentSibling )
                  

                                       if (checkValue === false){
                                
                                      
                                        player1Turn()
                                       }else if (checkValue === undefined){
                                    
                                        
                                        player2Turn()
                                       }

                               
                                       
                                       
                                }
                                
                            }
                    /**move balha up and down */
                   
                    /** move balha down */
                    if (previousParentSibling){
                                for (let i= 0 ; i< previousParentSibling.children.length ; i++) {//loop over the children of the previous tr to get the adjacent element for the clicked td
                                    if (+previousParentSibling.children[i].id === +previousItemId) { // if the child id === clicked id - 6 assign it to previousElement
                                        previousElement =  previousParentSibling.children[i]}
                                       
                                    }
                                    //  console.log("the clicked element", event.target)
                                        // console.log('the previous td element  id should be ',previousParentSibling.children[i])
                                        //  console.log("the previous parent element", previousParentSibling)
                                        //  console.log("the element should be: ",previousElement)
                               
                                let  child = previousElement.children[0]; // get the balha form the adjacent'in vertical matter' td to move it to the clicked td
                                
                                if (previousElement.classList.contains('has_balha') 
                                && previousElement.classList.contains('BBorderColor')){
                                      /** audio effect */ props.soundON && movingAudio.play()

                                    setMoveLog(old => {
                                        return [...old , `${child.id} ${previousElement.id}`]
                                     })
                                     
                                  
                                    previousElement.classList.remove('has_balha');
                                    previousElement.classList.remove('BBorderColor');
                                    previousElement.classList.add('empty');
                                   
                                    event.target.classList.add('has_balha');
                                    event.target.classList.remove('empty');
                                    event.target.appendChild(child);
                                    
                                    /** change the background color of parent td that hold moved element to draw the path that element take */
                                       
                                        
                                        let parentBgColor = window.getComputedStyle(event.target , null).getPropertyValue('background-color')
                                        let prevBgColor = window.getComputedStyle(previousElement , null).getPropertyValue('background-color')
                                        previousElement.style.backgroundColor = 'rgb(193, 255, 243)'
                                        event.target.style.backgroundColor = 'rgb(193, 255, 243)'
                                        
                                        setTimeout(() =>{
                                            if (prevBgColor === 'rgb(193, 255, 243)'){
                                                console.log('error the color of "sibling" is not changed')
                                               } else if (parentBgColor === 'rgb(193, 255, 243)'){
                                                console.log('error the color of "target" is not changed')
                                               }        
                                                  previousElement.style.backgroundColor = prevBgColor 
                                                  event.target.style.backgroundColor = parentBgColor
                                          
                                           
                                      }, 1000)
                                        

                                        CheckForSconce(event.target , nextSibling , previousSibling , 'has_balha' , 1 ,nextParentSibling , previousParentSibling)
                                      
                                         

                                       
                                       let checkValue =   CheckForSconce(event.target , nextSibling , previousSibling , 'has_balha', 1 ,nextParentSibling , previousParentSibling )
                                       
                                       if (checkValue === false){
                                      
                                        player1Turn()
                                       }else if (checkValue === undefined){
                                        
                                        player2Turn()
                                       }                                    
                                }
                    }
                        
                        /** move balha up */

                    if (nextParentSibling){
                        for (let i= 0 ; i< nextParentSibling.children.length ; i++) {//loop over the children of the previous tr to get the adjacent element for the clicked td
                          
                            if (+nextParentSibling.children[i].id === +nextItemId) { // if the child id === clicked id + 6 assign it to previousElement
                                nextElement =  nextParentSibling.children[i]
                            }
                        }

                      
                        let  child = nextElement.children[0]; // get the balha form the adjacent'in vertical matter' td to move it to the clicked td
                             console.log("the uper box to move balaha on :" , nextElement)
                        if (nextElement.classList.contains('has_balha') 
                        && nextElement.classList.contains('BBorderColor')){
                              /** audio effect */ props.soundON && movingAudio.play()
                  
                            setMoveLog(old => {
                                return [...old , `${child.id} ${nextElement.id}`]
                             })
                            
 
                            nextElement.classList.remove('has_balha');
                            nextElement.classList.remove('BBorderColor');
                            nextElement.classList.add('empty');
                            
                            event.target.classList.add('has_balha');
                            event.target.classList.remove('empty');
                            event.target.appendChild(child);
                            
                             
                          /** change the background color of parent td that hold moved element to draw the path that element take */
                        

                            let parentBgColor = window.getComputedStyle(event.target , null).getPropertyValue('background-color')
                            let prevBgColor = window.getComputedStyle(nextElement , null).getPropertyValue('background-color')
                            nextElement.style.backgroundColor = 'rgb(193, 255, 243)'
                            event.target.style.backgroundColor = 'rgb(193, 255, 243)'
                            
                            setTimeout(() =>{
                                if (prevBgColor === 'rgb(193, 255, 243)'){
                                    console.log('error the color of "sibling" is not changed')
                                   } else if (parentBgColor === 'rgb(193, 255, 243)'){
                                    console.log('error the color of "target" is not changed')
                                   }        
                                      nextElement.style.backgroundColor = prevBgColor 
                                      event.target.style.backgroundColor = parentBgColor
                    
                            
                               
                          }, 1000)

                          CheckForSconce(event.target , nextSibling , previousSibling , 'has_balha' , 1 ,nextParentSibling , previousParentSibling)
                        
                          

                         let checkValue =   CheckForSconce(event.target , nextSibling , previousSibling , 'has_balha', 1 ,nextParentSibling , previousParentSibling )
                           
                        

                         if (checkValue === false){
                        
                          player1Turn()
                         }else if (checkValue === undefined){
                          
                          player2Turn()
                         }                      
                        }
                    }
                    
                    
                     
                
                   
                   
    
              
                }

    }else if(player2_turn  ){
                 
             removeBalha(event.target , 'has_balha'  )// if player 1 has kill and the  the turn on player 1 remove the player 2 element when it clicked

                            if (event.target.classList.contains('empty') && hajar_count > 0){// if count is greater than zero add element to the table when player click on the table

                                let nextSibling = event.target.nextSibling // next sibling for td 
                                let previousSibling = event.target.previousSibling// previous sibling for td
                                let prevParentSibling = event.target.parentElement.previousElementSibling//previous parent sibling for clicked td
                                let nParentSibling = event.target.parentElement.nextElementSibling//next parent sibling for clicked td

                              let wrongMove =  CheckForSconce(event.target , nextSibling , previousSibling , 'has_hajar' ,2 ,nParentSibling , prevParentSibling , hajar_count)
                                                    
                                
                                if (wrongMove) {
                                   
                                    let oldBgColor = window.getComputedStyle(event.target , null).getPropertyValue('background-color')
                                    event.target.style.backgroundColor = 'rgb(255, 0, 0)'
                                    setTimeout(() => {
                                    event.target.style.backgroundColor = oldBgColor
                                    }, 500)

                                    player2Turn();
                                   
                                    
                                }else if (!wrongMove) {
                                      
                                    
                                    setAddLog(old => {
                                        return[...old , event.target.id]
                                    })
                                   
                                   
                                     props.soundON && addAudio.play(); 

                                    if (!player2_has_kill){
                                                        
                                        player1Turn();
                                    }else{
                                        player2Turn();
                                    }
                                        event.target.classList.add('has_hajar')
                                        event.target.classList.remove('empty')
                                        event.target.appendChild(hajar)
                                        event.target.children[0].id = nanoid();
                                        setHajar_count(old => old-1)
                                        
                                }
                               

                                

                            }else if(player2_turn && event.target.classList.contains('hajar')){
                                     
                                addBorderColor(event.target , 'hajar')  

                            }else if (hajar_count === 0 && event.target.classList.contains('empty')){
                                let prevParentSibling = event.target.parentElement.previousElementSibling//previous parent sibling for clicked td
                                let nParentSibling = event.target.parentElement.nextElementSibling//next parent sibling for clicked td
                                /** move hajar left and right */
                                        const nextSibling = event.target.nextSibling // next sibling for td 
                                        const previousSibling = event.target.previousSibling// previous sibling for td
                                        /** move hajar left */
                                        if(nextSibling){// check if there is a next sibling to prevent the error of not finding next sibling
                                            
                                            const child = nextSibling.children[0] 
                                            if (event.target.nextElementSibling.classList.contains('has_hajar') 
                                            && event.target.nextElementSibling.classList.contains('HBorderColor')){
                                                    
                                                       /** audio effect */ props.soundON && movingAudio.play()
                                                    
                                                   setMoveLog(old => {
                                                        return [...old , `${child.id} ${nextSibling.id}`]
                                                    })
                                                  

                                                    nextSibling.classList.remove('has_hajar')
                                                    nextSibling.classList.add('empty')
                                                    nextSibling.classList.remove('HBorderColor')
            
                                                    event.target.appendChild(child)
                                                    event.target.classList.add('has_hajar')
                                                    event.target.classList.remove('empty')
                                              /** change the background color of parent td that hold moved element to draw the path that element take */
                        

                                                    let parentBgColor = window.getComputedStyle(event.target , null).getPropertyValue('background-color')
                                                    let prevBgColor = window.getComputedStyle(nextSibling , null).getPropertyValue('background-color')
                                                    nextSibling.style.backgroundColor = 'rgb(193, 255, 243)'
                                                    event.target.style.backgroundColor = 'rgb(193, 255, 243)'
                                                    
                                                    setTimeout(() =>{
                                                        if (prevBgColor === 'rgb(193, 255, 243)'){
                                                            console.log('error the color of "sibling" is not changed')
                                                           } else if (parentBgColor === 'rgb(193, 255, 243)'){
                                                            console.log('error the color of "target" is not changed')
                                                           }        
                                                              nextSibling.style.backgroundColor = prevBgColor 
                                                              event.target.style.backgroundColor = parentBgColor
                                                 
                                                       
                                                  }, 1000)

                                                    CheckForSconce(event.target , nextSibling , previousSibling , 'has_hajar' ,2 ,nParentSibling , prevParentSibling)
                                                    
                                                  
                                                  
                                                    let checkValue =    CheckForSconce(event.target , nextSibling , previousSibling , 'has_hajar' ,2 ,nParentSibling , prevParentSibling)
                                       
                                                  

                                                    if (checkValue === false){
                                                   
                                                       player2Turn()

                                                    }else if (checkValue === undefined){

                                                       player1Turn()
                                                    
                                                    }                                                          
                                            }
            
                                        }
                                        /** move hajar right */
                                         if(previousSibling){//check if there is a previous sibling to prevent the error of not finding previous sibling
                                           
                                            const child = previousSibling.children[0] 
                                            if(previousSibling.classList.contains('has_hajar') 
                                            && previousSibling.classList.contains('HBorderColor')){// check if the previous sibling allows to move by checking if it has a balha and the the border is colored
                                                    
                                                   /** audio effect */ props.soundON && movingAudio.play()

                                                setMoveLog(old => {
                                                    return [...old , `${child.id} ${previousSibling.id}`]
                                                })
                                               
                                                    previousSibling.classList.remove('HBorderColor') 
                                                    previousSibling.classList.remove('has_hajar')
                                                    previousSibling.classList.add('empty')
                                                    
                                                    event.target.appendChild(child)
                                                    event.target.classList.add('has_hajar')
                                                    event.target.classList.remove('empty')

                                                    /** change the background color of parent td that hold moved element to draw the path that element take */
                                                 

                                                    let parentBgColor = window.getComputedStyle(event.target , null).getPropertyValue('background-color')
                                                    let prevBgColor = window.getComputedStyle(previousSibling , null).getPropertyValue('background-color')
                                                    previousSibling.style.backgroundColor = 'rgb(193, 255, 243)'
                                                    event.target.style.backgroundColor = 'rgb(193, 255, 243)'
                                                    
                                                    setTimeout(() =>{
                                                        if (prevBgColor === 'rgb(193, 255, 243)'){
                                                            console.log('error the color of "sibling" is not changed')
                                                           } else if (parentBgColor === 'rgb(193, 255, 243)'){
                                                            console.log('error the color of "target" is not changed')
                                                           }        
                                                              previousSibling.style.backgroundColor = prevBgColor 
                                                              event.target.style.backgroundColor = parentBgColor
                                                    
                                                    
                                                       
                                                  }, 1000)

                                                    CheckForSconce(event.target , nextSibling , previousSibling , 'has_hajar' ,2 ,nParentSibling , prevParentSibling)
                                                   

                                                    let checkValue =    CheckForSconce(event.target , nextSibling , previousSibling , 'has_hajar' ,2 ,nParentSibling , prevParentSibling)
                                       
                                                   

                                                    if (checkValue === false){
                                                   
                                                       player2Turn()
                                                       
                                                    }else if (checkValue === undefined){

                                                       player1Turn()
                                                    
                                                    }                                                           
                                                   
                                                  
                                                   
                                            }
                                            
                                        }
                                /**move hajar up and down */
                                const previousParentSibling = event.target.parentElement.previousSibling//previous parent sibling for clicked td
                                const nextParentSibling = event.target.parentElement.nextSibling//next parent sibling for clicked td
                                const previousItemId = Number(event.target.id )- 6
                                const nextItemId  = Number(event.target.id)+ 6
                                let previousElement // contain the adjacent element form the clicked td in the previous tr 
                                let nextElement // contain the adjacent element form the clicked td in the next tr
                               
                                /** move hajar down */
                                if (previousParentSibling){
                                            for (let i= 0 ; i< previousParentSibling.children.length ; i++) {//loop over the children of the previous tr to get the adjacent element for the clicked td
                                                if (+previousParentSibling.children[i].id === +previousItemId) { // if the child id === clicked id - 6 assign it to previousElement
                                                
                                                    console.log("the element id is " , previousParentSibling)
                                                    console.log("type of previous sibling id",typeof(previousItemId))
                                                    console.log("the id of the table contain hajar that supuse to move",previousParentSibling.children[i].id)
                                                    previousElement =  previousParentSibling.children[i]}
                                            }
                                            console.log("the place the element should come from : ", previousParentSibling)
                                            console.log("previous element should be :",previousElement)
                                            let  child = previousElement.children[0]; // get the balha form the adjacent'in vertical matter' td to move it to the clicked td
                                            console.log ("checking the child",child)
                                            if (previousElement.classList.contains('has_hajar') 
                                            && previousElement.classList.contains('HBorderColor')){
                                                
                                                   /** audio effect */ props.soundON && movingAudio.play()

                                                
                                                setMoveLog(old => {
                                                    return [...old , `${child.id} ${previousElement.id}`]
                                                })
                                               

                                                previousElement.classList.remove('has_hajar');
                                                previousElement.classList.remove('HBorderColor');
                                                previousElement.classList.add('empty');
                                               
                                                event.target.classList.add('has_hajar');
                                                event.target.classList.remove('empty');
                                                event.target.appendChild(child);

                                                /** change the background color of parent td that hold moved element to draw the path that element take */
                                                

                                                
                                                let parentBgColor = window.getComputedStyle(event.target , null).getPropertyValue('background-color')
                                                let prevBgColor = window.getComputedStyle(previousElement , null).getPropertyValue('background-color')
                                                previousElement.style.backgroundColor = 'rgb(193, 255, 243)'
                                                event.target.style.backgroundColor = 'rgb(193, 255, 243)'
                                                
                                                setTimeout(() =>{
                                                    if (prevBgColor === 'rgb(193, 255, 243)'){
                                                        console.log('error the color of "sibling" is not changed')
                                                       } else if (parentBgColor === 'rgb(193, 255, 243)'){
                                                        console.log('error the color of "target" is not changed')
                                                       }        
                                                    console.log(nextSibling  , event.target)
                                                          previousElement.style.backgroundColor = prevBgColor 
                                                          event.target.style.backgroundColor = parentBgColor
                                                    
                                                
                                                   
                                              }, 1000)
                                                
                                                CheckForSconce(event.target , nextSibling , previousSibling , 'has_hajar' ,2 ,nParentSibling , prevParentSibling)

                                              

                                                let checkValue =    CheckForSconce(event.target , nextSibling , previousSibling , 'has_hajar' ,2 ,nParentSibling , prevParentSibling)
                                       
                                                 

                                                if (checkValue === false){
                                               
                                                   player2Turn()
                                                   
                                                }else if (checkValue === undefined){

                                                   player1Turn()
                                                
                                                }                                                     

                                            }
                                }
                                    
                                    /** move hajar up */
            
                                if (nextParentSibling){
                                    for (let i= 0 ; i< nextParentSibling.children.length ; i++) {//loop over the children of the previous tr to get the adjacent element for the clicked td
                                      
                                        if (+nextParentSibling.children[i].id === +nextItemId) { // if the child id === clicked id + 6 assign it to previousElement
                                            nextElement =  nextParentSibling.children[i]
                                        }
                                    }
            
                                  
                                    let  child = nextElement.children[0]; // get the balha form the adjacent'in vertical matter' td to move it to the clicked td
                                    
                                    if (nextElement.classList.contains('has_hajar') 
                                    && nextElement.classList.contains('HBorderColor')){
                                           /** audio effect */ props.soundON && movingAudio.play()
                                       
                                        setMoveLog(old => {
                                            return [...old , `${child.id} ${nextElement.id}`]
                                        })
                                        
                                        nextElement.classList.remove('has_hajar');
                                        nextElement.classList.remove('HBorderColor');
                                        nextElement.classList.add('empty');
                                        
                                        event.target.classList.add('has_hajar');
                                        event.target.classList.remove('empty');
                                        event.target.appendChild(child);

                                          /** change the background color of parent td that hold moved element to draw the path that element take */
                                         

                                          let parentBgColor = window.getComputedStyle(event.target , null).getPropertyValue('background-color')
                                          let prevBgColor = window.getComputedStyle(nextElement , null).getPropertyValue('background-color')
                                          nextElement.style.backgroundColor = 'rgb(193, 255, 243)'
                                          event.target.style.backgroundColor = 'rgb(193, 255, 243)'
                                          
                                          setTimeout(() =>{
                                            if (prevBgColor === 'rgb(193, 255, 243)'){
                                                console.log('error the color of "sibling" is not changed')
                                               } else if (parentBgColor === 'rgb(193, 255, 243)'){
                                                console.log('error the color of "target" is not changed')
                                               }        
                                                  console.log(nextSibling  , event.target)
                                           
                                                  nextElement.style.backgroundColor = prevBgColor 
                                                  event.target.style.backgroundColor = parentBgColor

                                        
                                           
                                      }, 1000)
                                          CheckForSconce(event.target , nextSibling , previousSibling , 'has_hajar' ,2 ,nParentSibling , prevParentSibling)

                                        

                                          let checkValue =    CheckForSconce(event.target , nextSibling , previousSibling , 'has_hajar' ,2 ,nParentSibling , prevParentSibling)
                                       
                                        

                                          if (checkValue === false){
                                         
                                             player2Turn()
                                             
                                          }else if (checkValue === undefined){

                                             player1Turn()
                                          
                                          }     
                                         

                                    }
                                }
                                
                                
                                 
                            
                               
                               
                
                          
                            }
                           
                }
};
  
 

  function won(e){//this function work if the player resign it set playerWon state to true and set whoRiz 
   
   if (balha_count !== 12 && hajar_count !== 12){
      setPlayerWon(true)
 
    setWhoRiz(e.target.id)
   }
  
    
     
 }
  function startOver(e){// start the game over by reloading the game 
  
 setTimeout(()=>{ window.location.reload()},200)
  
  }
 


  React.useEffect(()=>{ //if one player get 10 score set the whoRiz state to the other player id .
    if (player1_score === 10){
        setWhoRiz('player2RizB')
        setPlayerWon(true)
    }else if(player2_score === 10){

        setWhoRiz('player1RizB')
        setPlayerWon(true)

    }
 },[player1_score ,player2_score])


 

                           
const [forwardArray , setForwardArray] = React.useState([])// forward Array contains an object of td id and play Element id and other attributes objects added every time backward function runs ; 


function forward (){
    var container =[...forwardArray]  // make a copy of the forwardArray to prevent any conflicts with the forwardArray

   
    let tarElement = {...container[container.length - 1]}// tarElement contains the last element from the forwardArray 
     
    if (!tarElement.isMoved  && forwardArray.length > 0 && !tarElement.isRemoved){
        
        
        props.soundON && movingAudio.play();

         let parentElement = document.getElementById(tarElement.parentId);
         
         let balha = document.createElement('img');
         balha.src = '/icon/balha.svg'
         balha.style.width = '45px'
         balha.style.height = '45px'
         balha.classList.add('balha')

         let hajar = document.createElement('img');
         hajar.src = '/icon/hajar.svg'
         hajar.style.width = '45px'
         hajar.style.height = '45px'
         hajar.classList.add('hajar')

         let element = tarElement.type === 'balha' ? balha : hajar;// if the type is 'balha ' add balha to the board if hajar add hajar to the board 
         element.id = tarElement.id
         
         parentElement.append(element);
         parentElement.classList.remove('empty');
         tarElement.type === 'balha' ? parentElement.classList.add('has_balha') :  parentElement.classList.add('has_hajar');
         tarElement.type === 'balha' ? setBalha_count(old => old - 1) : setHajar_count(old => old - 1);
        
         if (tarElement.type === 'balha'){// change the turn to player1 if added element ==
            setPlayer1_turn(false)
            setPlayer2_turn(true)
         }else{
            setPlayer1_turn(true)
            setPlayer2_turn(false)
         }
         setAddLog(old=> {
            return [...old ,tarElement.parentId ]
         }) 
    
         forwardArray.pop()
      
    }else if (tarElement.isMoved){
 
        props.soundON && movingAudio.play();
     let movedEle = document.getElementById(tarElement.id)
     
     tarElement.pervTd.classList.add('empty');
     tarElement.pervTd.classList.contains('has_balha') ? tarElement.pervTd.classList.remove('has_balha') : tarElement.pervTd.classList.remove('has_hajar');
     let parentTd = document.getElementById(tarElement.parentId)
     
     parentTd.appendChild(movedEle)
     parentTd.classList.remove('empty');
     movedEle.classList.contains('balha')? parentTd.classList.add('has_balha') : parentTd.classList.add('has_hajar');
     if (movedEle.classList.contains('balha')){// change the turn to player1 if added element ==
        setPlayer1_turn(false)
        setPlayer2_turn(true)
     }else{
        setPlayer1_turn(true)
        setPlayer2_turn(false)
     }
    
     setMoveLog(old=> {
        return [...old ,`${movedEle.id} ${tarElement.pervTd.id}`]
     }) 
    forwardArray.pop()
    
    }else if (tarElement.isRemoved){
        props.soundON && movingAudio.play();

        
        let element = document.getElementById(tarElement.id)
        let parentTd = document.getElementById(tarElement.parentId)
   
        parentTd.children[0].remove();
        parentTd.classList.add('empty');
        parentTd.classList.contains('has_balha')? parentTd.classList.remove('has_balha'):parentTd.classList.remove('has_hajar');
        tarElement.type === 'balha' ? setPlayer2_score(old => old + 1) : setPlayer1_score(old => old + 1);
        if (tarElement.type === 'balha'){// change the turn to player1 if added element ==
            setPlayer1_turn(false)
            setPlayer2_turn(true)
         }else{
            setPlayer1_turn(true)
            setPlayer2_turn(false)
         }
       let type = tarElement.type
        setMoveLog(old=> {

            return [...old ,`${element.id} ${type} ${parentTd.id}`]
         }) 
       
        forwardArray.pop()
}
    
    

 }
 
 
 function backward(){// let the player move backward 
    
    
     
    if(addLog.length > 0 && moveLog.length === 0){// remove the last play element added to the game table 
        let targetElementId = addLog[addLog.length-1]
       
        props.soundON && movingAudio.play();

        let targetTd = document.getElementById(+targetElementId)
      
        let movedEleId = targetTd.children[0].id
        let movedEleType = targetTd.classList.contains('has_balha')? 'balha' : 'hajar';
        addLog.pop();

             setForwardArray(old => {
                
                return [...old , {
                    parentId: targetTd.id, 
                    type : movedEleType,
                    id : movedEleId,
                    isRemoved : false,
                    isMoved: false,
                }]
            })
        

                if (targetTd.classList.contains('has_balha')){
                    targetTd.classList.remove('has_balha')
                    setBalha_count(old => old + 1)
                    setPlayer1_turn(true)
                    setPlayer2_turn(false)

                }else if (targetTd.classList.contains('has_hajar')){
                    targetTd.classList.remove('has_hajar')
                    setHajar_count(old => old + 1)
                    setPlayer1_turn(false)
                    setPlayer2_turn(true)
                }
                targetTd.children[0].remove();
                targetTd.classList.add('empty')

           

    }
    else if (moveLog.length > 0 && addLog.length === 24){
           
          
             if (moveLog[moveLog.length - 1].length <= 24  ){

              props.soundON && movingAudio.play();

              let elementIdArray = moveLog[moveLog.length-1].split(" ") //divid the element index to sperate element to get the play element id form it
              let elementId = elementIdArray[0]
              let previousIndexForMovedItem = elementIdArray[1]
             
              let element = document.getElementById(elementId)
              let pervTd = document.getElementById(previousIndexForMovedItem)
              let elementTd = element.parentElement
              
              pervTd.classList.remove('empty')
              element.classList.contains('balha')? pervTd.classList.add('has_balha') : pervTd.classList.add('has_hajar');
              pervTd.append(element)
              moveLog.pop();
              elementTd.classList.add('empty')
              element.classList.contains('balha') ? elementTd.classList.remove('has_balha') : elementTd.classList.remove('has_hajar');
              let movedEleType = ''
              element.classList.contains('balha')? movedEleType = 'balha': movedEleType = 'hajar';
               
              if(element.classList.contains('balha')){
                setPlayer1_turn(true)
                setPlayer2_turn(false)
              }else{
                setPlayer1_turn(false)
                setPlayer2_turn(true)
              }
              setForwardArray(old => {
                
                return [...old , {
                    parentId: elementTd.id, 
                    type : movedEleType,
                    id : elementId,
                    isRemoved : false,
                    isMoved: true,
                    pervTd : pervTd,
                }]
            })

             }else if (moveLog[moveLog.length - 1].length > 24){

                let elementIdArray = moveLog[moveLog.length-1].split(" ") // split the element index to sperate element to get the play element id form it
                let elementId = elementIdArray[0]
                let elementType  = elementIdArray[1]
                let elementTdId = elementIdArray[2]
                let element 
                
              
               if (elementType === 'balha'){
                  element = balha
                  element.id = elementId;
                  setPlayer2_score(old => old-1)
                  setPlayer1_turn(false)
                  setPlayer2_turn(true)
                 
               }else{
                  element = hajar
                  element.id = elementId;
                  setPlayer1_score(old => old-1)
                  setPlayer1_turn(true)
                  setPlayer2_turn(false)
               }
  
               
              
              let targetTd = document.getElementById(elementTdId)
              targetTd.appendChild(element)
              targetTd.classList.remove('empty')
              elementType ==='balha'? targetTd.classList.add('has_balha'): targetTd.classList.add('has_hajar')
              moveLog.pop();
              let movedEleType = ''
              element.classList.contains('balha')? movedEleType = 'balha': movedEleType = 'hajar';
  
              setForwardArray(old => {
                  
                  return [...old , {
                      parentId: targetTd.id, 
                      id : elementId,
                      type: movedEleType,
                      isRemoved : true,
                      isMoved: false,
                      
                  }]
              })

             }
             
   
}  
 }


 /***   AI functions ::::   ***/
        
     let   AllTdArray =Object.values(document.querySelectorAll('td')) ;


     class AI {// ai class 
        
        AddElement(){
        
            AllTdArray.map(td => {
                if(td.classList.contains('has_hajar')){
                    if(td.nextElementSibling && td.nextElementSibling.classList.contains('empty')){
                        setTimeout(() => {
                            td.nextElementSibling.click();
                        }, 500);
                        return td;
                    }

                }else {
                    return td;
                }
                return null;
            })

        }
        Kill(){
            console.log('AiKill');
        }
        move(){
            /** this ai's method  pick the best move available   */

           let allBalhaTd =  AllTdArray.filter( td => td.classList.contains('has_balha'))// filter all td that contains balha ' ai's play element
            
           let allPossibleMoves = allBalhaTd.map(td => {
                let tdPossibleMove = [td]
                let downTd = findNextEle(td , +td.id + 6)
                let upTd = findPrevEle(td , +td.id - 6)
                
                if(downTd && downTd.classList.contains('empty')){
                    tdPossibleMove.push( downTd)
                }
                if(upTd && upTd.classList.contains('empty')){
                    tdPossibleMove.push( upTd)
                }
                if(td.nextElementSibling && td.nextElementSibling.classList.contains('empty')){
                    tdPossibleMove.push(td.nextElementSibling)
                }
                if(td.previousElementSibling && td.previousElementSibling.classList.contains('empty')){
                    tdPossibleMove.push(td.previousElementSibling)
                }
                
               return tdPossibleMove;
           }).filter(array => array.length > 1)
            console.log(allPossibleMoves)
           
                    
        //     function bestMove(array) {
                
        //          array.forEach(arr => {
 
        //              arr.map((td , ind , arr) => {
                        

        //                  if(td.classList.contains('empty') && td.nextSibling && td.nextSibling.nextSibling && td.nextSibling.classList.contains('has_balha') && td.nextSibling.nextSibling.classList.contains('has_balha')){
                            
        //                      return [td , arr[0]]

        //                     //  let downTd = findNextEle(td , +td.id + 6)
        //                     //  let upTd = findPrevEle(td , +td.id - 6)
        //                     //  console.log('td siblings',[downTd , upTd ,td.nextElementSibling , td.previousElementSibling ] )
                            
                             
        //                     //  if (downTd){
                                
                                
        //                     //          bestMove.push(td)

        //                     //  }
 
        //                  }else{
        //                     return false;
        //                  }
        //             })
        //      })
             
        //    }
              

       //let best =   bestMove(allPossibleMoves)
           
           
          
          
            
        }
    };
   
  
    if(player1_turn && props.isBot){// action section
        let ai = new AI()
          ai.move()
        }
 

 let gameState = !playerWon ?  <GameTable 
                                phoneMode = {props.phoneMode}
                                diskTopMode = {props.diskTopMode}
                                isDarkMode = {props.isDarkMode}
                                addElemToTable = {addElemToTableANDMoveElement}
                                player1_turn = {player1_turn}
                                player2_turn = {player2_turn}
                                /> : <WonTable
                                diskTopMode =  {props.diskTopMode}
                                phoneMode = {props.phoneMode}
                                soundON = {props.soundON}
                                isArabic = {props.isArabic}
                                isDarkMode = {props.isDarkMode}
                                   startOver = {startOver}
                                  whoRiz = {whoRiz}
                                 users = {props.users}
                                 winAudio = {winAudio}
                                //   player1Avatar = {players[0].avatar}
                                //   player2Avatar = {players[1].avatar}
                                //   player1Name = {players[0].name}
                                //   player2Name = {players[1].name}
                                />

let sidbar = props.diskTopMode? <SidBar 
diskTopMode = {props.diskTopMode}
isArabic = {props.isArabic}
isEnglish = {props.isEnglish}
handelLanguageChange ={props.handelLanguageChange}
goHome = {props.toggleToHome}
soundON = {props.soundON}
soundToggle = {props.soundToggle}
/> : null;


let playerTable = !props.phoneMode ? <PlayerTable 
phoneMode = {props.phoneMode}
isArabic = {props.isArabic}
isEnglish = {props.isEnglish}
isDarkMode = {props.isDarkMode}
backward = {backward}
forward = {forward}
users = {props.users}
won = {won}
changeBorder = {getUserRadiusValue}
player1_score = {player1_score}
player2_score = {player2_score}
player1_count = {balha_count}
player2_count = {hajar_count}
player1Turn = {player1Turn}
player2Turn = {player2Turn}
player1_turn = {player1_turn}
player2_turn = {player2_turn}
/> : null;

let player2Status = props.phoneMode ?  <PlayerStatus 
phoneMode = {props.phoneMode}
isArabic = {props.isArabic}
//isDarkMode = {props.isDarkMode}
// borderStyle={HBorderStyle}
user = {props.users[1]}
score = {player2_score}
count = {hajar_count}
path = {'icon/hajar.svg'}
// style = {scoreStyle}
won = {won}
player2 = {true}
playerTurn = {player2Turn}
forward = {forward}
backward = {backward}
id = {"player2RizB"}
/>: null;

let player1Status = props.phoneMode ?  <PlayerStatus 
phoneMode = {props.phoneMode}
isArabic = {props.isArabic}
isDarkMode = {props.isDarkMode}

user = {props.users[0]}
score = {player1_score}
path= {'icon/balha.svg'}
count = {balha_count}
player1 = {true}
forward = {forward}
backward = {backward}
won = {won}
playerTurn= {player1Turn}
id = {"player1RizB"}
/>: null;

let phoneModeStyle = {
    display: 'flex' ,
    flexDirection: 'column',
    justifyContent: 'end',
     
    
}
let diskTopModeStyle = {
    display: 'flex'

}

 
    return (
        <main style = {props.phoneMode ? phoneModeStyle :diskTopModeStyle}>
         {!playerWon && player1Status}
         {props.isArabic &&  playerTable}
         {props.isEnglish && sidbar}

         {gameState}
         {props.isArabic && sidbar }
         {props.isEnglish && playerTable}
         
         {!playerWon && player2Status}
        </main>
    )
}