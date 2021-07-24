import React from "react"


function WinningField(props) {
    //const  winnerBoard = useRef(null)
    return(
    <div onClick={props.reset} ref={props.winningDashboard} className='wining-container'>
        <div></div>
        <button>REMATCH</button>
    </div>)
}
export default WinningField