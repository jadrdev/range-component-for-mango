import { useEffect, useState } from "react";
import React from 'react'

/**
* Componemts InputRange
* 
* @param {Object} props
* @param {Number} min
* @param {Number} max
* @param {Boolean} readonly
* @param {number} actualPosition
* @param {Function} setActualPosition
* @param {Function} UpdateBullets
* @param {Object} selectorRight
* @param {Object} selectorLeft
* @param {Boolean} readOnly
* 
*/

const InputRange = (props) => {
  const {
    max,
    min,
    mousedown,
    actualPosition,
    setActualPosition,
    UpdateBullets,
    selectorRight,
    selectorLeft,
    readOnly,
  } = props;



  const [actualPositionLeft, setactualPositionLeft] = useState(actualPosition.left);
  const [actualPositionRight, setactualPositionRight] = useState(actualPosition.right);

  useEffect(() => { 
    setactualPositionLeft(actualPosition.left);
    setactualPositionRight(actualPosition.right);
  }, [actualPosition]);

  
  return (
    <>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 my-8">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="number" 
            placeholder={min}
            onChange={(e) => setActualPosition({ ...actualPosition, left: parseInt(e.target.value) || 0 })}
            onMouseDown={(e) => mousedown(e, selectorLeft.current)}
            ref={selectorLeft}
            onBlur={(e) => { UpdateBullets(actualPosition) }}
            value={actualPositionLeft}
            name="Inputleft"
            autoComplete="off"
            readOnly={readOnly}
            
            
            
          />
          
        </div>
        <div className="w-full md:w-1/2 px-3 my-8">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            type="number"
            placeholder={max}
            onChange={(e) => setActualPosition({ ...actualPosition, right: parseInt(e.target.value) || 0 })}
            onMouseDown={(e) => mousedown(e, selectorRight.current)}
            ref={selectorRight}
            onBlur={(e) => { UpdateBullets(actualPosition) }}
            value={actualPositionRight}
            name="InputRight"
            autoComplete="off"
            readOnly={readOnly}
          />
        </div>
      </div>
    </>
  )
}




export default InputRange