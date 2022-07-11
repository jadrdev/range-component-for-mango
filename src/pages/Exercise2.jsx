import useFetchApi from '../hooks/useFetchApi';
import { url2 } from '../constants/Constants';
import Range from '../components/range-input-slider/range/Range';
import { Link } from 'react-router-dom';

const Exercise2 = () => {
  const data  = useFetchApi(url2);
  return (
    <div className="container text-base text-1xl mx-auto text-center sm:text-center mt-10">
        <h1 className="text-center sm:text-center text-4xl antialiased">Fixed values range</h1>
        <p className='text-2sm'>A bar will be displayed with the price range between which a price can oscillate</p>
      
      <Range max={data.max} min={data.min} />
      <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-10 rounded-full" to={"/"}>
          Volver al inicio
        </Link>
      </div>
  );
};

export default Exercise2;