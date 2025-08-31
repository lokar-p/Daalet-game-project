import React from "react";
import { ArabicLanguageContext, usersDataContext } from "./app";
export default function ChoseWhoToStart(props){
    const Arabic = React.useContext(ArabicLanguageContext)
    const users = React.useContext(usersDataContext)

    const whoToPlayoptionsStyle = {
         borderRadius :'3px',
         padding : '2px',
         color : 'white',
         backgroundColor : '#ffffff45'
    }

    console.log(users)
  
    return (
        <div className="choseWhoToStartContainer">
            <div className="whoTostartOptions">
                <div className="options-header">{Arabic? 'أختار من يبدأ اولا':'chose who to play first'}</div>
                <div onClick={props.startingTheGame} style={whoToPlayoptionsStyle} className="player-1-Option"><img alt="" src={users[0].avatarUrl}/> <p>{users[0].firstName}</p></div>
                <div onClick={props.startingTheGame} style={whoToPlayoptionsStyle} className="player-2-Option"><img alt="" src={users[1].avatarUrl}/><p>{users[1].firstName}</p></div>
                <div onClick={props.startingTheGame} style={whoToPlayoptionsStyle} className="RandomOption">{Arabic? "أختيار عشوائي": 'Random Choice'}</div>

            </div>
        </div>
    )
}