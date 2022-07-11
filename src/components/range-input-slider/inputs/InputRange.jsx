import { useState } from "react";

const InputRange = (props) => {
  const {
    max,
    min,
    mousedown,
    actualPosition,
    setActualPosition,
    UpdateBullets,
    selectorRight,
    selectorLeft
  } = props;

  const [actualPositionLeft, setActualPositionLeft] = useState(actualPosition.left);
  const [actualPositionRight, setActualPositionRight] = useState(actualPosition.right);

  
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
            defaultValue={1}
            name="Inputleft"
            autoComplete="off"
            
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
            defaultValue={100}
            name="InputRight"
            autoComplete="off"
          />
        </div>
      </div>
    </>
  )
}




export default InputRange