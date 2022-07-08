const SliderRange = ({ max, min, currency }) => {
  return (
    <>
      <div className="sliderRange">
        
        <span className="ValorMinimo">{min} {currency}</span>
        
        <div className='bullet_initial' />
        
        <div className='line'></div>

        <span className="ValorMaximo">{max} {currency}</span>
        
        <div className='bullet_final' />
          
      </div>
    </>
  )
}

SliderRange.defaultProps = {
  currency: '€',
};

export default SliderRange