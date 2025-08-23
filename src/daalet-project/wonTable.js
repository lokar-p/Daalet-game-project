import React from 'react';
import Confetti from 'react-confetti';


export default function WonTable(props){

    const Player1style = {
        
      color : 'rgb(207, 227, 232)',
      borderColor : 'rgb(207, 227, 232)',
     
      margin:'auto',
      textAlign:'center'
    }
    const Player2Style = {
        
        color : 'rgb(207, 227, 232)',
        borderColor : 'rgb(207, 227, 232)',
        margin:'auto',
       textAlign:'center',

    }
   
    let whoWon = props.whoRiz === 'player1RizB' ? props.users[1].firstName :props.users[0].firstName
    let avatar = props.whoRiz === 'player1RizB'  ? props.users[1].avatarUrl : props.users[0].avatarUrl


    let phoneStyle = {
        margin: props.phoneMode?  '40px' : '30px 40px 30px 50px',
    }
    React.useEffect(()=>{// sound effect for winning ;
       props.soundON && props.winAudio.play()
    },[props.soundON, props.winAudio]) 


    return (
        <div>
            <Confetti/>
                <div className='wonTable'style= {!props.diskTopMode? phoneStyle : null} > 
                    <h1 style={+props.whoRiz === 1 ? Player2Style : Player1style}>{props.isArabic ?'!! تهانينا' :'Congrats !!'}</h1>
                    <h4 style={+props.whoRiz === 1 ? Player2Style : Player1style}>
                        <img alt='' src={avatar} style={+props.whoRiz === 1 ? Player2Style : Player1style}/>{whoWon} 
                        <span style={{display: 'block'}}><p style={+props.whoRiz === 1 ? Player2Style : Player1style}>{props.isArabic ?'ربح المبارات' :'Won the Game'}</p></span></h4>
                    <button onClick={props.startOver} style={+props.whoRiz === 1 ? Player2Style : Player1style} >{props.isArabic ?'إلعب مجددنا' :'play again'}</button>
                </div>
        </div>
    )
}