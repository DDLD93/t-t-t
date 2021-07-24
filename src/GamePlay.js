import { useState, useEffect, useRef} from 'react';
import GameField from './GameField'
import socketIOClient, { Socket } from "socket.io-client";
import WinningField from './WinningField';
import Reset from './Reset';

function GamePlay ()  {



  
  const gameContainer = document.querySelector(".main-container"),
        winingContainer = document.querySelector(".wining-container"),
        pl1Win = document.querySelector('.pl1-win'),
        plOWin = document.querySelector('.plO-win'),
        noWinner = document.getElementById('draw'),
        winnerText = document.getElementById('winner');

   var  socket = socketIOClient("http://127.0.0.1:4200");
   const  main = useRef(null)
   const winnerBoard = useRef(null)

let pl1 = [];
let pl2 = [];
// set who's turn to make the next move
var state = true
// total number of moves in each game session cannot exceed 9
var moves = 0;

// winning combinations
const winCon = [[1,2,3],
              [4,5,6],
              [7,8,9],
              [3,6,9],
              [2,5,8],
              [1,4,7],
              [3,5,7],
              [1,5,9]];
// determining our winner
function checked(playerArr) {
     for (let i = 0; i < winCon.length; i++) {
        var combination = winCon[i];
        //console.log(combination)
        let checker = (arr, arr2) => 
    arr2.every(v => 
        arr.includes(v));
        let checking = checker(playerArr, combination)
            //console.log(checking)
            if (checking === true) {
             return true
        }
    }
};
function click(ply, arr, event, cnum) {
        socket.emit(ply, cnum);
  }
  function clickIO(ply, arr, event, cnum) {
    let field =  event.querySelector("div");
    field.classList.add(ply)
    arr.push(cnum)
    moves++;
    state = !state
   }

 socket.on('connect', function(data) {
    socket.on('playerORes', (e) => {
      let snum = e
      let player = main.current.childNodes
      player.forEach(ev => {
        let num = Number(ev.dataset.mv)
      if (snum === num) {
        clickIO("playerO", pl1, ev, num)
      }
    });
  })

socket.on('player1Res', (e) => {
     let snum = e
     let player = main.current.childNodes
     player.forEach(ev => {
       let num = Number(ev.dataset.mv)
      if (snum === num){
        clickIO("player1", pl2, ev, num)
    }
  });
 })
socket.on('resetRes', () => {
     reset()
 })

});

const pressed = (e) => {
  const currentConatainer = Number(e.target.dataset.mv);
  if(state === true) {
    click('playerO', pl1, e, currentConatainer)
    }else{
    click('player1', pl2, e, currentConatainer)
    
  }
}        



window.addEventListener('animationend', () =>{
  if(checked(pl2)=== true){
    chickenDinner('pl1-win')
  } else if(checked(pl1)=== true){
    chickenDinner('plO-win')
   }
})



// creating a function  a reset game after game session
function reset() {
 var cons = document.querySelectorAll('.player1, .playerO')

 for (let i = 0; i < cons.length; i++) {
     const con = cons[i];
     con.classList.remove('player1', 'playerO')
 }
 main.current.style.webkitFilter = "blur(0)";
 main.current.style.opaque = "1";
 winnerBoard.current.style.visibility = "hidden";
 //noWinner.style.visibility = "hidden";
 pl1 = []
 pl2 = []
 state = true;
 moves = 0;
 console.log('reset');
}        

function chickenDinner(plyw) {
  main.current.style.webkitFilter = "blur(40px)";
  main.current.style.opaque = "1";
  winnerBoard.current.style.visibility = "visible";
  winnerBoard.current.childNodes[0].classList.add(plyw)
}
useEffect(() => {
  
    
    


},[])

    return (
      <>
      <WinningField reset={reset} winningDashboard={winnerBoard}/>
 <div ref={main} className="main-container" >
    <GameField id={1} play={pressed}/>
    <GameField id={2} play={pressed}/>
    <GameField id={3} play={pressed}/>
    <GameField id={4} play={pressed}/>
    <GameField id={5} play={pressed}/>
    <GameField id={6} play={pressed}/>
    <GameField id={7} play={pressed}/>
    <GameField id={8} play={pressed}/>
    <GameField id={9} play={pressed}/>
</div>
      </>
)}
 export default GamePlay