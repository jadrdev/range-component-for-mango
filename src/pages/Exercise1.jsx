import useFetchApi from '../hooks/useFetchApi';

const Exercise1 = () => {
  const data = useFetchApi();

  return (
    <>
      <h1 className="text-center sm:text-center text-4xl antialiased">Normal Range</h1>
      <div className="container text-base text-1xl mx-auto text-center sm:text-center">
        <p className='text-2sm'>A bar will be displayed with the price range between which a price can oscillate</p>
        <p>{data.min}</p>
        <p>{data.max}</p>
      </div>
    </>
  );
};

export default Exercise1;