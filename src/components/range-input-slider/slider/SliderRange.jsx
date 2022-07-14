import React from 'react'
import './SliderRange.css';
/**
* Componemts InputRange
* 
* @param {reference} refence
* @param {String} currency
* @param {Number} positionLeft
* @param {Number} positionRight
* @param {Object} extremesValues
* @param {Function} mousedown
* @param {Function} setActualPosition
* @param {Object} actualPosition
* @param {Function} mousemove
* @param {Function} mouseup
* @param {Function} selectorRight
* @param {Function} selectorLeft
* @param {Boolean} readOnly
* @return {Object}
* 
*/

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