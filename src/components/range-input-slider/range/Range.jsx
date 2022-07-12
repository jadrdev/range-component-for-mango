import { useEffect, useRef, useState } from "react";
import InputRange from "../inputs/InputRange"
import SliderRange from "../slider/SliderRange"
import React from 'react'

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
  let xDirection = "";

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

  let mousedown = (e, selector) => {
    setSelectedComponent(selector);
    setMoveAllowed(true);
  };

  let mousemove = (e) => {
    getMouseDirection(e);
    moveSelector(e);
  };

  let moveSelector = (e) => {
    let barRangeWidth = rangeComponent.current.offsetWidth;
    let barLeftPosition = rangeComponent.current.offsetLeft;
    let getValue = min + (max - min) * (getXComponent() / 100);
    console.log(getValue)
    if (moveAllowed) {
      switch (xDirection) {
        case "left":
          readOnly
            ? moveToLeftFixed(e, barRangeWidth, barLeftPosition, getValue)
            : moveToLeft(e, barRangeWidth, barLeftPosition, getValue);
          return;
        case "right":
          readOnly
            ? moveToRightFixed(e, barRangeWidth, barLeftPosition, getValue)
            : moveToRight(e, barRangeWidth, barLeftPosition, getValue);
          return;
        default:
          return;
      }
    }
  };

  let canMoveToLeft = () => {
    if (selectedComponent.id === "bullet_final") {
      return actualPosition.right > actualPosition.left + 1;
    }
    return true;
  };

  let canMoveToRight = () => {
    if (selectedComponent.id === "bullet_initial") {
      return actualPosition.left < actualPosition.right - 1;
    }
    return true;
  };

  let getMouseDirection = (e) => {
    if (e.pageX < oldXMousePosition) {
      xDirection = "left";
    } else if (e.pageX > oldXMousePosition) {
      xDirection = "right";
    }
    setOldXMousePosition(e.pageX);
  };

  let mouseup = (e) => {
    let newPosition = getArrayState();
    readOnly && changeActualPosition(positionsArray[newPosition]);
    readOnly && setArrayState()(newPosition);
    setMoveAllowed(false);
  };

  let moveToLeftFixed = (e, barRangeWidth, barLeftPosition, getValue) => {
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

  let moveToRightFixed = (e, barRangeWidth, barLeftPosition, getValue) => {
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

  let moveToLeft = (e, barRangeWidth, barLeftPosition, getValue) => {
    if (!canMoveToLeft()) return;
    if (getXComponent() > 0) {
      setXComponent()(((e.clientX - barLeftPosition) * 100) / barRangeWidth);
      changeActualPosition(Math.round(getValue));
    } else if (getXComponent() === 0) {
      changeActualPosition(Math.round(min));
    }
  };

  let moveToRight = (e, barRangeWidth, barLeftPosition, getValue) => {
    if (!canMoveToRight()) return;
    if (getXComponent() < 100) {
      setXComponent()(((e.clientX - barLeftPosition) * 100) / barRangeWidth);
      changeActualPosition(Math.round(getValue));
    } else if (getXComponent() === 100) {
      changeActualPosition(max);
    }
  };

  let setXComponent = () => {
    console.log(selectedComponent.id)
    return selectedComponent?.id === "bullet_final"
      ? setXRightComponent
      : setXLeftComponent;
  };

  let getXComponent = () => {
    return selectedComponent?.id === "bullet_final"
      ? xRightComponent
      : xLeftComponent;
  };

  let setArrayState = () => {
    return selectedComponent?.id === "bullet_final"
      ? setArrayRightState
      : setArrayLeftState;
  };

  let getArrayState = () => {
    return selectedComponent?.id === "bullet_final"
      ? arrayRightState
      : arrayLeftState;
  };

  let changeActualPosition = (value) => {
    console.log(selectedComponent.id)
    selectedComponent.id === "bullet_final"
      ? setActualPosition({ ...actualPosition, right: value })
      : setActualPosition({ ...actualPosition, left: value });
  };

  let UpdateBullets = (newValue) => {
    const { left, right } = newValue;
    switch (selectedComponent.id) {
      case "bullet_initial":
        if (left <= 0) {
          setActualPosition({ ...actualPosition, left: min });
        } else if (left >= right) {
          setActualPosition({ ...actualPosition, left: right - 1 });
        }
        setXLeftComponent(((left - min) * 100) / (max - min));
        return;
      case "bullet_final":
        if (right >= 100) {
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