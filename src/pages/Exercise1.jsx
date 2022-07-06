import React from 'react'
import useFetchApi from '../hooks/useFetchApi';


const Exercise1 = () => {
  const data = useFetchApi();
  console.log(data)

  return (
    <div>
      <h1 className="text-center sm:text-center">Normal Range</h1>
      <div className="container mx-auto text-center sm:text-center">
        <p>Aquí va el ejercicio</p>
        <p>{data.min}</p>
        <p>{data.max}</p>
      </div>
    </div>
  );
};

export default Exercise1;