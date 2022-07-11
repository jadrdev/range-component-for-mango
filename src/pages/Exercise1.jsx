
import useFetchApi from '../hooks/useFetchApi';
import { url1 } from '../constants/Constants';
import Range from '../components/range-input-slider/range/Range';
import {Link} from 'react-router-dom';


const Exercise1 = () => {
  const data = useFetchApi(url1);

  return (
    <div className="container text-base text-1xl mx-auto text-center sm:text-center mt-10">
        <h1 className="text-center sm:text-center text-4xl antialiased">Normal Range</h1>
        <p className='text-2sm'>A bar will be displayed with the price range between which a price can oscillate</p>
        <Range max={data.max} min={data.min}/>
      <Link className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 mt-10 rounded-full" to={"/"}>
          Volver al inicio
        </Link>
      </div>
  );
};

export default Exercise1;