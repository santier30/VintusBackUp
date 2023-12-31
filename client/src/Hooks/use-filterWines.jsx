import {  useCallback } from 'react';

function useFilterWines( filters , setFilteredWines,setLoading) {
 

  const filterWinesHandler = useCallback(async() => {
   

    const { type, brand, priceRange, search } = filters;
    const queryParams = [];
    if (type[0]) {queryParams.push(`type=${type}`)};
    if (brand[0]) {queryParams.push(`brand=${brand}`)};
    if (priceRange) {
      if (priceRange.from !== 0) queryParams.push(`priceRangeFrom=${priceRange.from}`);
      if (priceRange.upTo !== 0) queryParams.push(`priceRangeUpTo=${priceRange.upTo}`);
    }
    if (search!== "") queryParams.push(`search=${search}`);
    
    const queryString = queryParams.join('&');
try {
  const response = await fetch(`/Vintus/Products/Filter?${queryString}`)
  if(!response.ok) {throw new Error("error filtering")}
  const data = await response.json();
  setFilteredWines(data);
  if(data.length === 12){setLoading(true);}
} catch (error) {
  console.error("Error fetching wine data:", error);
}
  

  }, [filters, setFilteredWines, setLoading]);



  return filterWinesHandler;
}

export default useFilterWines;
