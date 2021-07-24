import React from 'react'

function GameField (props) {

    return(
        <div 
            data-mv={props.id} onClick={props.play}
            className="mv-container">
             <div className="hook"></div>
        </div>
        )
}
export default GameField
