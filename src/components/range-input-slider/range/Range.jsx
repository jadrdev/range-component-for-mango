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

/**
 * When the mouse is clicked down, the selected component is set to the selector and the move is
 * allowed
 */
   const mousedown = (e, selector) => {
    setSelectedComponent(selector);
    setMoveAllowed(true);
  };



/**
 * A function that is called when the mouse is moved.
 */
  const mousemove = (e) => {
    getMouseDirection(e);
    moveSelector(e);
  };


  
/**
 * It moves the selector to the left or right depending on the direction of the mouse movement
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
 * If the selected component is the bullet, then return true if the right position is greater than the
 * left position plus one, otherwise return true.
 * @returns A boolean value.
 */
  const canMoveToLeft = () => {
    if (selectedComponent.id === "bullet_final") {
      return actualPosition.right > actualPosition.left + 1;
    }
    return true;
  };


/**
 * If the selected component is the bullet initial, then return true if the left position is less than
 * the right position minus one, otherwise return true.
 * @returns A boolean value.
 */
  const canMoveToRight = () => {
    if (selectedComponent.id === "bullet_initial") {
      return actualPosition.left < actualPosition.right - 1;
    }
    return true;
  };

/**
 * If the current mouse position is less than the previous mouse position, the mouse is moving left. If
 * the current mouse position is greater than the previous mouse position, the mouse is moving right.
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
 * It's a function that is called when the mouse is released
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
It moves the slider to the left
*
* @param {e} event
* @param {barRangeWidth} number - width of the range
* @param {barLeftPosition} number - position of the left side of the range
* @param {getValue} number - value of the position
* @returns the value of the variable newPosition.
*
*/

/**
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
  * It moves the slider to the right if the slider is not at the end of the range
  * @returns the value of the variable newPosition.
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
* It moves the slider to the left
* @returns A function that takes in an event, barRangeWidth, barLeftPosition, and getValue.
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
* It moves the slider to the right if the slider is not at the rightmost position
* @returns the value of the x component of the slider.
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

/**
 * If the selected component is the bullet, then set the x position of the right component, otherwise
 * set the x position of the left component.
 * @returns A function
 */
  const setXComponent = () => {
    return selectedComponent?.id === "bullet_final"
      ? setXRightComponent
      : setXLeftComponent;
  };

/**
 * > If the selected component is the bullet, then return the xRightComponent, otherwise return the
 * xLeftComponent
 * @returns The x coordinate of the selected component.
 */
  const getXComponent = () => {
    return selectedComponent?.id === "bullet_final"
      ? xRightComponent
      : xLeftComponent;
  };

/**
 * If the selected component is the bullet final, then set the array state to the right array state,
 * otherwise set the array state to the left array state
 * @returns The setArrayState function is returning the setArrayRightState function if the
 * selectedComponent.id is equal to "bullet_final" and the setArrayLeftState function if it is not.
 */
  const setArrayState = () => {
    return selectedComponent?.id === "bullet_final"
      ? setArrayRightState
      : setArrayLeftState;
  };

/**
 * It returns the array state of the right side if the selected component is the bullet final,
 * otherwise it returns the array state of the left side
 * @returns The array state of the selected component.
 */
  const getArrayState = () => {
    return selectedComponent?.id === "bullet_final"
      ? arrayRightState
      : arrayLeftState;
  };

/**
 * It changes the actual position of the selected component.
 */
  const changeActualPosition = (value) => {
    selectedComponent.id === "bullet_final"
      ? setActualPosition({ ...actualPosition, right: value })
      : setActualPosition({ ...actualPosition, left: value });
  };

/**
 * It updates the position of the bullets
 * @returns The function UpdateBullets is returning the function UpdateBullets.
 */
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