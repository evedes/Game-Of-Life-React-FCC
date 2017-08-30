import React from 'react'
import BoardInfo from './BoardInfo'
import BoardDash from './BoardDash'
import './Board.css'

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Initialize Game of Life + Definitions
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Init Vars
let boardArray = []
const lines = 50
const cols = 70
const cells = lines * cols

// Init Board Array w/ Random Numbers

function initBoardArray(cells){
  for (let i = 0 ; i < cells ; i++){
    boardArray[i]=Number(Math.floor(Math.random()*3))
  }
  return boardArray;
}

// Set Initial State 

function initialState(boardSize) {
  return(
  {
    boardstate: initBoardArray(cells),
    width: cols*10+12, 
    lines: lines, 
    cols:cols, 
    cells: cells, 
    generation: 0, 
    speed: 1000
  })
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CELL STATELESS COMPONENT
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function Cell(props){
  return(
    <div style={{background:props.cellColor(props.cell)}} onClick={()=> props.addBabyCells(props.i)} className="square" value={props.cell} key={props.i} ></div>
  )
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// BOARD CLASS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = initialState()
  }

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // COMPONENT MOUNT MECHANICS
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++

    componentDidMount(){
        this.timerID = setInterval(
            () => this.nextStep(),
            this.state.speed)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// GAME MECHANICS
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Change Speed Function (Buttons)

setSpeed(newSpeed) {
    clearInterval(this.timerID)
    this.setState({speed: newSpeed}) 
    this.timerID = setInterval(
      () => this.nextStep(),
    newSpeed)
}

// Count the Number of Alive Neighbours Function

countNeighbours(i){
    // Top Left Corner Ce
    if (i===0){
        let count = 0
        if (this.state.boardstate[i+1]!==0) count++;
        if (this.state.boardstate[i+this.state.cols]!==0) count++;
        if (this.state.boardstate[i+this.state.cols+1]!==0) count++;
        return count;
    }
    // Top Right Corner Cell
    else if (i===(this.state.cols-1)){
        let count = 0
        if (this.state.boardstate[i-1]!==0) count++;
        if (this.state.boardstate[i+this.state.cols]!==0) count++;
        if (this.state.boardstate[i+this.state.cols-1]!==0) count++;
        return count;
    }
    // Bottom Left Corner Cell
    else if (i===(this.state.cells-1-this.state.cols+1)){
        let count = 0;
        if (this.state.boardstate[i+1]!==0) count++;
        if (this.state.boardstate[i-this.state.cols]!==0) count++;
        if (this.state.boardstate[i-this.state.cols+1]!==0) count++;
        return count;
    }
    // Bottom Right Corner Cell
    else if (i===(this.state.cells-1)){
        let count = 0;
        if (this.state.boardstate[i-1]!==0) count++;
        if (this.state.boardstate[i-this.state.cols]!==0) count++;
        if (this.state.boardstate[i-this.state.cols-1]!==0) count++;
        return count;
    }
    //Top Row
    else if (i>0 && i<(this.state.cols-1)){
        let count = 0;
        if (this.state.boardstate[i-1]!==0) count ++;
        if (this.state.boardstate[i+1]!==0) count ++;
        if (this.state.boardstate[i+this.state.cols]!==0) count++;
        if (this.state.boardstate[i+this.state.cols-1]!==0) count++;
        if (this.state.boardstate[i+this.state.cols+1]!==0) count++;
        return count;
    }

    //Bottom Row
    else if (i>(this.state.cells-this.state.cols) && i <(this.state.cells-1)){
        let count = 0;
        if (this.state.boardstate[i+1]!==0) count++;
        if (this.state.boardstate[i-1]!==0) count++;
        if (this.state.boardstate[i-this.state.cols-1]!==0) count++;
        if (this.state.boardstate[i-this.state.cols]!==0) count++;
        if (this.state.boardstate[i-this.state.cols+1]!==0) count++;
        return count;
    }

    else {
        let count = 0;
        if (this.state.boardstate[i+1]!==0) count++;
        if (this.state.boardstate[i-1]!==0) count++;
        if (this.state.boardstate[i-this.state.cols]!==0) count++;
        if (this.state.boardstate[i-this.state.cols-1]!==0) count++;
        if (this.state.boardstate[i-this.state.cols+1]!==0) count++;
        if (this.state.boardstate[i+this.state.cols]!==0) count++;
        if (this.state.boardstate[i+this.state.cols-1]!==0) count++;
        if (this.state.boardstate[i+this.state.cols+1]!==0) count++;
        return count;
    }
  }

// Calculate the Next Board Array Function

nextStep(){
    let newBoardArray = []
    for (let i = 0 ; i < this.state.cells ; i++){
      
      let cellState;
      this.state.boardstate[i]!==0 ? cellState=1 : cellState=0;

      if (cellState === 0 && this.countNeighbours(i)===3){
        newBoardArray[i]=1;
      }
      else if (cellState !==0 && this.countNeighbours(i)<2){
        newBoardArray[i]=0;
      }
      else if (cellState !==0 && this.countNeighbours(i)>3){
        newBoardArray[i]=0;
      }
      else if (cellState !==0 && (this.countNeighbours(i)===2 || this.countNeighbours(i)===3)){
        newBoardArray[i]=2;
      }
      else {
        newBoardArray[i]=this.state.boardstate[i]
      }
    }      
   
    let generation = this.state.generation+1
      
    this.setState ({
      boardstate: newBoardArray,
      generation: generation
    })
    
  }

  genBoardArray(cells){
    let newBoardArray = []
    for (let i = 0; i < cells; i++){
      newBoardArray[i]=0
    }
    boardArray = newBoardArray
    return boardArray
  }
 
  // Change the Board Size Function

  boardSize(size){
      
      if (size === 1500) {
      this.clearBoardArray()
      this.setState({
        width: 512,
        lines: 30,
        cols: 50,
        cells: 1500,
        boardstate: this.genBoardArray(1500),
        generation: 0
      })  
      }

      if (size === 3500){
        this.clearBoardArray()
        this.setState({
          width: 712,
          lines: 50,
          cols: 70,
          cells: 3500,
          boardstate: this.genBoardArray(3500),
          generation: 0
        })    
        }

      if (size === 8000){
        this.clearBoardArray()
        this.setState({
          width: 1012,
          lines: 80,
          cols: 100,
          cells: 8000,
          boardstate: this.genBoardArray(8000),
          generation: 0
        })    
        }

      }

  
// Clear The Board Array , Empty Board

clearBoardArray(){
  this.pauseGame()
  for (let i = 0 ; i < this.state.cells ; i++) {
      boardArray[i]=0
  }
  this.setState({boardstate: boardArray, generation: 0});
}

// Pause the Game

pauseGame() {
  clearInterval(this.timerID)
}


// Continue Game Iterations

continueGame() {
  this.timerID = setInterval(
    () => this.nextStep(),
    this.state.speed
  )
}

// Add Cells by Clicking Function

addBabyCells(i) {
  boardArray=this.state.boardstate
  boardArray[i]=1
  this.setState({boardstate: boardArray}) 
  
}

// Change Cell Colors Function

cellColor(cell) {
  if (cell===0) return '#fff'
  if (cell===1) return '#a0d080'
  if (cell===2) return '#006400'
}  

  // Render Board Stuff

  render(){
    
    return( 
      <div className="maincontainer container-fluid">
          <BoardDash cols={this.state.cols} lines={this.state.lines} generation={this.state.generation} speed={this.state.speed} clearBoardArray={this.clearBoardArray.bind(this)} boardSize={this.boardSize.bind(this)} setSpeed={this.setSpeed.bind(this)} pauseGame={this.pauseGame.bind(this)} continueGame={this.continueGame.bind(this)} />
          
          {/* return the gaming board */}
          <div className="gamingboard" style={{width: this.state.width}}>
            {this.state.boardstate.map((cell,i)=>{
              return(
                <Cell cell={cell} i={i} cellColor={this.cellColor} addBabyCells={this.addBabyCells.bind(this)} />
              )
              })
            }
          </div>
           
          <BoardInfo />
      </div>
    )
  }
}

export default Board;