import InputRange from "../inputs/InputRange"
import SliderRange from "../slider/SliderRange"

const Range = (props) => {
  const { max, min } = props;
  

  return (
    <>
      <InputRange
        max={max}
        min={min}
      />
      <SliderRange
        max={max}
        min={min}
      />
    </>
  )
}


export default Range