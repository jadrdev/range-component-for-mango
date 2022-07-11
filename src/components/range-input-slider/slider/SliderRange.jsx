import { useRef } from "react";
const SliderRange = (
  { refence,
    currency,
    positionLeft,
    positionRight,
    extremesValues,
    mousedown,
    setActualPosition,
    actualPosition,
    mousemove,
    mouseup,
    selectorRight,
    selectorLeft
  }) => {
  
  return (
    <>
      <div
        className="sliderRange"
        onMouseMove={(e) => mousemove(e)}
        onMouseUp={(e) => mouseup(e)}
        ref={refence}
      >
        {/* <span className="ValorMinimo">{min} {currency}</span> */}
        <div
          id="bullet_initial"
          className='bullet_initial'
          type={"left"}
          style={{ left: `${positionLeft}%` }}
          actual-value={actualPosition.left}
          ref={selectorLeft}
          onMouseDown={(e) => mousedown(e, selectorLeft.current)}
        />
        <div className='line'></div>
        {/* <span className="ValorMaximo" >{max} {currency}</span> */}
        <div
          id="bullet_final"
          className='bullet_final'
          type={"right"}
          style={{ left: `${positionRight}%` }}
          actual-value={actualPosition.right}
          ref={selectorRight}
          onMouseDown={(e) => mousedown(e, selectorRight.current)}
        />
      </div>
    </>
  )
}

SliderRange.defaultProps = {
  currency: '€',
};

export default SliderRange