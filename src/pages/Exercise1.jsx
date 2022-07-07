
import useFetchApi from '../hooks/useFetchApi';
import { url1 } from '../constants/Constants';
import Range from '../components/range-input-slider/range/Range';


const Exercise1 = () => {
  const data = useFetchApi(url1);

  return (
    <>
      <h1 className="text-center sm:text-center text-4xl antialiased">Normal Range</h1>
      <div className="container text-base text-1xl mx-auto text-center sm:text-center">
        <p className='text-2sm'>A bar will be displayed with the price range between which a price can oscillate</p>
        <Range max={data.max} min={data.min}/>
      </div>
    </>
  );
};

export default Exercise1;