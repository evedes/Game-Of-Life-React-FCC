import React from 'react'

const BoardDash = (props) => {
    return(
      <div className="boarddash">
        <div className="row h2title">Dashboard</div>
        <div className="row">
          <div className="col-md-4">
            <h3 className="h3title">Board Size Options</h3>
            <button className="btn btn-success" onClick={()=>{return props.boardSize(1500)}}>50x30</button>
            <button className="btn btn-success" onClick={()=>{return props.boardSize(3500)}}>70x50</button>
            <button className="btn btn-success" onClick={()=>{return props.boardSize(8000)}}>100x80</button>
          </div>
          <div className="col-md-4">
            <h3 className="h3title">Simulation Control</h3>        
            <button className="btn btn-success" onClick={props.continueGame}>Run</button>
            <button className="btn btn-success" onClick={props.pauseGame}>Pause</button>
            <button className="btn btn-success" onClick={props.clearBoardArray}>Clear</button> 
            <h5>Board Size: {props.cols}x{props.lines} | Generation: {props.generation} | Refresh(ms): {props.speed}</h5> 
          </div>
          <div className="col-md-4">
            <h3 className="h3title">Simulation Refresh Rate</h3>
              <button className="btn btn-success" onClick={()=>{return props.setSpeed(2000)}}>Slow</button>
              <button className="btn btn-success" onClick={()=>{return props.setSpeed(1000)}}>Medium</button>
              <button className="btn btn-success" onClick={()=>{return props.setSpeed(100)}}>Fast</button> 
          </div>
        </div>
        <div className="row h2title">Game Of Life</div>
      </div>
    )
  }

export default BoardDash