import React from 'react'

import '../Game.css';

const GameCircle = ({id, children, className,onCircleClicked}) => {

    //console.log(id)          //Displays the object/Gamecircle created in Gameboard

  return (
    <div className={`gameCircle ${className}`} onClick={() => onCircleClicked(id)}>
        {children}           
    </div>
  )
}

export default GameCircle