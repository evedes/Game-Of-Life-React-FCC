import React, {Component} from 'react'
import BoardInfo from './BoardInfo'
import BoardDash from './BoardDash'
import './Board.css'

// Initialize Game of Life + Definitions

let boardArray = []

function initBoardArray(){
  for (let i = 0 ; i < 3500 ; i++){
    boardArray[i]=Number(Math.floor(Math.random()*3))
  }
  return boardArray;
}

// Board Class 
class Board extends Component {
  constructor(props){
    super(props);
    this.state = {
      boardstate: initBoardArray(), width: 712, lines: 50, cols:70, cells: 3500, generation: 0, speed: 500 }
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.nextStep(),
      this.state.speed
    )
    console.log(this.state.speed)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

// Set Speed Buttons Functions

  setSpeedSlow() {
      this.setState({speed: 5000}) 
  }

  setSpeedMed() {
    this.setState({speed: 1000}) 
  }

  setSpeedFast() {
    this.setState({speed: 10}) 
  }

  
  // This function counts the number of neighbour cells alive
  countNeighbours(i){
    // Top Left Corner Cell
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

  // This function calculates the next boardArray step 

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

  genSmallBoardArray(){
    let smallBoardArray = []
    for (let i = 0; i < 1500; i++){
      smallBoardArray[i]=0
    }
    boardArray = smallBoardArray
    return boardArray
  }
 

  boardDimSmall(){
    this.setState({
      width: 512,
      lines: 30,
      cols: 50,
      cells: 1500,
      boardstate: this.genSmallBoardArray()
    })   
  }

  clearBoardArray() {
   for (let i = 0 ; i < this.state.cells ; i++) {
     boardArray[i]=0
   }
   this.setState({boardstate: boardArray});
  }

  // Add Cells Clicking on the Board of the Game
  addBabyCells(i){
    console.log(i)
    boardArray=this.state.boardstate
    boardArray[i]=1
    this.setState({boardstate: boardArray}) 
   
  }

  cellColor = (cell) => {
    if (cell===0) return '#fff'
    if (cell===1) return '#a0d080'
    if (cell===2) return '#006400'
  }  

  render(){
    
    return( 
      <div className="maincontainer container-fluid">
          <BoardDash generation={this.state.generation} speed={this.state.speed} clearBoardArray={this.clearBoardArray.bind(this)} boardDimSmall={this.boardDimSmall.bind(this)} setSpeedSlow={this.setSpeedSlow.bind(this)} setSpeedMed={this.setSpeedMed.bind(this)} setSpeedFast={this.setSpeedFast.bind(this)}/>
          
          {/* return the gaming board */}
          <div className="gamingboard" style={{width: this.state.width}}>
            {this.state.boardstate.map((cell,i)=>{
              return(<div style={{background:this.cellColor(cell)}} onClick={()=> this.addBabyCells(i)} className="square" value={cell} key={i} ref={i}></div>)
              })
            }
          </div>
           
          <BoardInfo />
      </div>
    )
  }
}

export default Board;