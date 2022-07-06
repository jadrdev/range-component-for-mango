import { useEffect, useState } from 'react'
import { serviceUrl } from '../constants/Constants';

/**
 * It fetches data from the server and sets the data to the state
 * @returns The data is being returned.
 */

const useFetchApi = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${serviceUrl}/exercise1`)
      .then((response) => response.json())
      .then((numbers) => {setData(numbers)});
  }, []);

  return data;
  
}

export default useFetchApi