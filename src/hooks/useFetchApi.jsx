import { useEffect, useState } from 'react';

/**
 * It fetches data from the server and sets the data to the state
 * @returns The data is being returned.
 */

const useFetchApi = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((numbers) => { setData(numbers); });
  }, []);

  return data;
  
};

export default useFetchApi;