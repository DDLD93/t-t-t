import logo from './logo.svg';
import GamePlay from './GamePlay'
import Lobby from './Lobby'
import './App.css';
import { useEffect, useState } from 'react';

function App() {
const [user, setuser] = useState(null)
const [loading, setloading] = useState(false)

function clicked(e) {
  setuser(e.target.previousElementSibling.innerText)
  e.target.previousElementSibling.disabled = true;
  e.target.previousElementSibling.style.opacity = '1';
  e.target.innerText = 'STARTING';
  e.target.style.width = 'fit-content';
  setloading(true)
  console.log(user)
}

useEffect(() => {
 
}, [])
  return (
    <div>
     <GamePlay/>
{// <Lobby userAlias={clicked} />
}
    </div>
  );
}

export default App;
