import InputRange from "../inputs/InputRange"
import SliderRange from "../slider/SliderRange"


const Range = (props) => {
  const { max, min, readOnly } = props;
  return (
    <>
      <InputRange
        max={max}
        min={min}
        readOnly={readOnly}
      />
      <SliderRange />
    </>
  )
}

export default Range