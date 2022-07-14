import { useEffect, useRef, useState } from "react";
import InputRange from "../inputs/InputRange"
import SliderRange from "../slider/SliderRange"
import React from 'react'

/**
 * Componemts RangeComponent
 * 
 * @param {Object} props
 * @param {Number} min
 * @param {Number} max
 * @param {Boolean} readonly
 * @param {Array} rangePrice
 * 
 */
const Range = (props) => {
  const { max, min, readOnly, rangePrince } = props;
  const [selectedComponent, setSelectedComponent] = useState("bullet_initial");
  const [oldXMousePosition, setOldXMousePosition] = useState(0);
  const [xLeftComponent, setXLeftComponent] = useState(0);
  const [xRightComponent, setXRightComponent] = useState(100);
  const [extremesValues, setExtremesValues] = useState({
    left: {
      min: min,
      max: max,
    },
    right: {
      min: min,
      max: max,
    },
  });
  const [moveAllowed, setMoveAllowed] = useState(false);
  const rangeComponent = useRef(null);
  const [actualPosition, setActualPosition] = useState({
    left: min,
    right: max,
  });
  
  let xDirection = useRef('');

  const selectorRight = useRef(null);
  const selectorLeft = useRef(null);

  const [positionsArray, setPositionArray] = useState(rangePrince);
  const [arrayLeftState, setArrayLeftState] = useState(0);
  const [arrayRightState, setArrayRightState] = useState(
    rangePrince?.length - 1
  );

  useEffect(() => {
    setExtremesValues({
      left: { min: min, max: max },
      right: { min: min, max: max},
    });
    setActualPosition({ ...actualPosition, left: min, right: max });
    readOnly && setPositionArray(rangePrince);
  }, [min, max, rangePrince]);

   const mousedown = (e, selector) => {
    setSelectedComponent(selector);
    setMoveAllowed(true);
  };

/**
 * 
 * @param {e} event  - evento que se dispara al mover el raton 
*/

  const mousemove = (e) => {
    getMouseDirection(e);
    moveSelector(e);
  };

/**
 * 
 * @param {e} event - evento que se dispara al mover el raton 
 */
  
  const moveSelector = (e) => {
    let barRangeWidth = rangeComponent.current.offsetWidth;
    let barLeftPosition = rangeComponent.current.offsetLeft;
    let getValue = min + (max - min) * (getXComponent() / 100);
    if (moveAllowed) {
      switch (xDirection) {
        case "left":
          readOnly
            ? moveToLeftFixed(e, barRangeWidth, barLeftPosition, getValue)
            : moveToLeft(e, barRangeWidth, barLeftPosition, getValue);
          break;
        case "right":
          readOnly
            ? moveToRightFixed(e, barRangeWidth, barLeftPosition, getValue)
            : moveToRight(e, barRangeWidth, barLeftPosition, getValue);
          break;
        default:
          break;
      }
    }
  };


/**
 * Check if you can move to the left
 */

  const canMoveToLeft = () => {
    if (selectedComponent.id === "bullet_final") {
      return actualPosition.right > actualPosition.left + 1;
    }
    return true;
  };

/**
 * Check if you can move to the right
 * 
 *
 */

  const canMoveToRight = () => {
    if (selectedComponent.id === "bullet_initial") {
      return actualPosition.left < actualPosition.right - 1;
    }
    return true;
  };

/**
 * Take the direction of the mouse
 * 
 * @param {e} event
 *
 */
  const getMouseDirection = (e) => {
    if (e.pageX < oldXMousePosition) {
      xDirection = "left";
    } else if (e.pageX > oldXMousePosition) {
      xDirection = "right";
    }
    setOldXMousePosition(e.pageX);
  };

  /**
   * Collects the mouse position at the moment of lifting the click
   * @param {e} event
   *
   */
  

  const mouseup = (e) => {
    let newPosition = getArrayState();
    readOnly && changeActualPosition(positionsArray[newPosition]);
    readOnly && setArrayState()(newPosition);
    if (!readOnly) {
      if (actualPosition.left > actualPosition.right && selectedComponent.id === "bullet_initial") {
        let position = actualPosition.right - 1;
        setActualPosition({ ...actualPosition, left: position });
        setXLeftComponent(((position - min) * 100) / (max - min));
      } else if (actualPosition.right < actualPosition.left && selectedComponent.id === "bullet_final") {
        let position = actualPosition.left + 1;
        setActualPosition({ ...actualPosition, right: position });
        setXRightComponent(((position - min) * 100) / (max - min));
      }
    }
    setMoveAllowed(false);
  };

/**
* Check if you can move to the left
* 
* @param {e} event
* @param {barRangeWidth} number - width of the range
* @param {barLeftPosition} number - position of the left side of the range
* @param {getValue} number - value of the position
*
*/

  const moveToLeftFixed = (e, barRangeWidth, barLeftPosition, getValue) => {
    if (!canMoveToLeft()) return;
    let newPosition = getArrayState() - 1;
    if (newPosition + 1 === 0) return;
    let newValue = positionsArray[newPosition];
    if (getXComponent() > 0 && getValue >= Math.round(newValue)) {
      setXComponent()(((e.clientX - barLeftPosition) * 100) / barRangeWidth);
    } else {
      changeActualPosition(positionsArray[newPosition]);
      setArrayState()(newPosition);
    }
  };

  /**
  * Check if you can move to the right
  * 
  * @param {e} event
  * @param {barRangeWidth} number - width of the range
  * @param {barLeftPosition} number - position of the left side of the range
  * @param {getValue} number - value of the position
  *
  */

  const moveToRightFixed = (e, barRangeWidth, barLeftPosition, getValue) => {
    if (!canMoveToRight()) return;
    let newPosition = getArrayState() + 1;
    if (newPosition === rangePrince.length) return;
    let newValue = positionsArray[newPosition];
    if (getXComponent() < 100 && getValue <= Math.round(newValue)) {
      setXComponent()(((e.clientX - barLeftPosition) * 100) / barRangeWidth);
    } else {
      changeActualPosition(positionsArray[newPosition]);
      setArrayState()(newPosition);
    }
  };

/**
* Make the move to the left
* 
* @param {e} event
* @param {barRangeWidth} number - width of the range
* @param {barLeftPosition} number - position of the left side of the range
* @param {getValue} number - value of the position
*
*/

  const moveToLeft = (e, barRangeWidth, barLeftPosition, getValue) => {
    if (!canMoveToLeft()) return;
    if (getXComponent() > 0) {
      setXComponent()(((e.clientX - barLeftPosition) * 100) / barRangeWidth);
      changeActualPosition(Math.round(getValue));
    } else if (getXComponent() === 0) {
      changeActualPosition(Math.round(min));
    }
  };

/**
* Make the move to the Right
* 
* @param {e} event
* @param {barRangeWidth} number - width of the range
* @param {barLeftPosition} number - position of the left side of the range
* @param {getValue} number - value of the position
*
*/

  const moveToRight = (e, barRangeWidth, barLeftPosition, getValue) => {
    if (!canMoveToRight()) return;
    if (getXComponent() < 100) {
      setXComponent()(((e.clientX - barLeftPosition) * 100) / barRangeWidth);
      changeActualPosition(Math.round(getValue));
    } else if (getXComponent() === 100) {
      changeActualPosition(max);
    }
  };

  const setXComponent = () => {
    return selectedComponent?.id === "bullet_final"
      ? setXRightComponent
      : setXLeftComponent;
  };

  const getXComponent = () => {
    return selectedComponent?.id === "bullet_final"
      ? xRightComponent
      : xLeftComponent;
  };

  const setArrayState = () => {
    return selectedComponent?.id === "bullet_final"
      ? setArrayRightState
      : setArrayLeftState;
  };

  const getArrayState = () => {
    return selectedComponent?.id === "bullet_final"
      ? arrayRightState
      : arrayLeftState;
  };

  const changeActualPosition = (value) => {
    selectedComponent.id === "bullet_final"
      ? setActualPosition({ ...actualPosition, right: value })
      : setActualPosition({ ...actualPosition, left: value });
  };

  const UpdateBullets = (newValue) => {
    const { left, right } = newValue;
    switch (selectedComponent.id) {
      case "bullet_initial":
        if (left < min) {
          setActualPosition({ ...actualPosition, left: min });
        } else if (left >= right) {
          setActualPosition({ ...actualPosition, left: right - 1 });
        }
        setXLeftComponent(((left - min) * 100) / (max - min));
        return;
      case "bullet_final":
        if (right >= max) {
          setActualPosition({ ...actualPosition, right: max });
        } else if (right <= left) {
          setActualPosition({ ...actualPosition, right: left + 1 });
        }
        setXRightComponent(((right - min) * 100) / (max - min));
        return;
    }
  };
  
  

  return (
    <>
      <InputRange
        max={max}
        min={min}
        actualPosition={actualPosition}
        mousedown={mousedown}
        setActualPosition={setActualPosition}
        UpdateBullets={UpdateBullets}
        selectorRight={selectorRight}
        selectorLeft={selectorLeft}
        readOnly={readOnly}
      />
      
      <SliderRange
        refence={rangeComponent}
        max={max}
        min={min}
        positionLeft={xLeftComponent}
        positionRight={xRightComponent}
        extremesValues={extremesValues}
        mousedown={mousedown}
        setActualPosition={setActualPosition}
        actualPosition={actualPosition}
        mouseup={mouseup}
        mousemove={mousemove}
        selectorRight={selectorRight}
        selectorLeft={selectorLeft}
        />
    </>
  )
}


export default Range