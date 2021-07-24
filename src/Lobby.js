function Lobby(props) {


    return (
        <div className="lobby" >
           <h1> <span id='one'>Tic</span><span id='two'>Tac</span><span id='three'>Toe</span></h1>
            <div className="input-space">
            <input type="text" name="alias" id="text" placeholder='Alias'/>
           <div onClick={props.userAlias} id='button'>START</div>
           
            </div>
        </div>
    )
}
export default Lobby