import React from 'react'


const BoardDash = (props) => {
    return(
      <div className="boarddash">
        <div className="row h2title">Dashboard</div>
        <div className="row">
          <div className="col-md-4">
            <h3 className="h3title">Board Size Options</h3>
            <button className="btn btn-success" onClick={props.boardDimSmall}>50x30</button>
            <button className="btn btn-success">70x50</button>
            <button className="btn btn-success">100x80</button>
          </div>
          <div className="col-md-4">
            <h3 className="h3title">Simulation Control</h3>        
            <button className="btn btn-success">Run</button>
            <button className="btn btn-success">Pause</button>
            <button className="btn btn-success" onClick={props.clearBoardArray}>Clear</button> 
            <h5>Generation: {props.generation} | Refresh(ms): {props.speed}</h5> 
          </div>
          <div className="col-md-4">
            <h3 className="h3title">Simulation Refresh Rate</h3>
              <button className="btn btn-success" onClick={()=>{return props.setSpeed(2000)}}>Slow</button>
              <button className="btn btn-success" onClick={()=>{return props.setSpeed(1000)}}>Medium</button>
              <button className="btn btn-success" onClick={()=>{props.setSpeed(100)}}>Fast</button> 
          </div>
        </div>
        <div className="row h2title">Game Of Life</div>
      </div>
    )
  }

export default BoardDash