import useFetchApi from '../hooks/useFetchApi';
import { url2 } from '../constants/Constants';
import Range from '../components/range-input-slider/range/Range';

const Exercise2 = () => {
  const data = useFetchApi(url2);

  return (
    <>
      <h1 className="text-center sm:text-center text-4xl antialiased">Fixed values range</h1>
      <div className="container text-base text-1xl mx-auto text-center sm:text-center">
        <p className='text-2sm'>A bar will be displayed with the price range between which a price can oscillate</p>
        <Range max={data.max} min={data.min} readOnly={true} />
      </div>
    </>
  );
};

export default Exercise2;