import { useState, useEffect, useRef , useCallback} from 'react';

import FilterContext from './shopSections/Filters/FIlterContext';

import Wine from './shopSections/wine';

import SearchBar from './shopSections/searchBar';
import Filters from './shopSections/Filters/Filters';

import useFilterWines from '../../Hooks/use-filterWines';
import useFilter from '../../Hooks/use-filters';
import { useInView } from 'react-intersection-observer';

const Shop = ()=>{

  const [brands,setBrands]=useState([])
  const [filteredWines,setFilteredWines]=useState([])
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [loading,setLoading] = useState(true);
  const biggestPrice=useRef(null);

  const [filters,setType,setBrand,setUpTo,setFrom,setSearch]=useFilter()
  const filterWinesHandler = useFilterWines(filters,setFilteredWines,setLoading)
  let timer = useRef(undefined); 
  
  

  useEffect(() => {
   
    if (inView) {
     loadMoreProducts();
    }
  }, [inView]);

  const loadMoreProducts = async() => {
    const { type, brand, priceRange, search } = filters;
    const queryParams = [];
    if (type[0]) {queryParams.push(`type=${type}`)};
    if (brand[0]) {queryParams.push(`brand=${brand}`)};
    if (priceRange) {
      if (priceRange.from !== 0) queryParams.push(`priceRangeFrom=${priceRange.from}`);
      if (priceRange.upTo !== 0) queryParams.push(`priceRangeUpTo=${priceRange.upTo}`);
    }
    if (search!== "") queryParams.push(`search=${search}`);
    queryParams.push(`page=${page}`);
    
    const queryString = queryParams.join('&');
    const response = await fetch(`Vintus/Products/ShopScroll?${queryString}`);
    if(!response.ok){throw new Error('error')}
    const data = await response.json()
    if(data.length<12){setLoading(false)}
    console.log(data)
    setFilteredWines(()=>[...filteredWines,...data])
    console.log(page)
    setPage(page + 1);

  };
  const getWines =  useCallback(async()=>{
    try {
      const response = await  fetch("/Vintus/Products/Shop");
  if(!response.ok){throw new Error("Error fetching wines")}
  const data = await response.json()
  console.log(data)///////////////////////////////////
  const {wines,brands,biggest} = data
  setFilteredWines(wines);
  setBrands(brands);
  biggestPrice.current = biggest
    } catch (error) {
      console.error("Error fetching wine data:", error);
    }},[]);

  useEffect(() => {
    getWines()
  }, [getWines])


 useEffect(() => {
  if (isFirstLoad) {
    setIsFirstLoad(false);
    return;
  }
  if (typeof timer.current !== 'undefined') {
    clearTimeout(timer.current);
  }
  timer.current = setTimeout(() => {
 
    filterWinesHandler();
    setPage(1)
   
  }, 100);
 
  return () => {
    if (typeof timer.current !== 'undefined') {
      clearTimeout(timer.current);
    }
  };
}, [filters, filterWinesHandler]); 

    return(
        <main>
          <section className="wine">
         
          </section>
          <SearchBar setSearch={setSearch}/> 

        <section className="filter_flexbox">  
        
        <FilterContext.Provider 
           value={
           { brands:brands,
           setType:setType, 
           setBrand:setBrand, 
           setUpTo:setUpTo, 
           setFrom:setFrom,
           filters:filters, 
           biggestPrice:biggestPrice}}
           >
          <Filters/>
        </FilterContext.Provider>

          <article className="wine_experience">
              {
                filteredWines.map((wine) =>{
                  return(
                    <Wine wine={wine} key={wine.name}/>
                  )
                })
              }
          </article>  
        
        </section>

        {filteredWines[0] && loading && <div ref={ref} className='Load'><p>LOADING...</p>
        <div className='move'></div></div>}
        </main>
   
    )
}
export default Shop