import { useState, useEffect, useRef } from 'react';

import FilterContext from './shopSections/Filters/FIlterContext';

import Wine from './shopSections/wine';

import SearchBar from './shopSections/searchBar';
import Filters from './shopSections/Filters/Filters';

import useFilterWines from '../../Hooks/use-filterWines';
import useFilter from '../../Hooks/use-filters';


const Shop = ()=>{

  const [brands,setBrands]=useState([])
  const [filteredWines,setFilteredWines]=useState([])
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const biggestPrice=useRef(null);

  const [filters,setType,setBrand,setUpTo,setFrom,setSearch]=useFilter()
  const filterWinesHandler = useFilterWines(filters,setFilteredWines)
  let timer = useRef(undefined); 
  
  


  useEffect(() => {
  
      fetch("/Vintus/Products/Shop")
        .then((response) =>  response.json())
        .then((data) => {
          console.log(data)///////////////////////////////////
          const {wines,brands,biggest} = data
          setFilteredWines(wines);
          setBrands(brands);
          biggestPrice.current = biggest
        })
        .catch((error) => {
          console.error("Error fetching wine data:", error);
        });
  }, [])


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

     
        </main>
   
    )
}
export default Shop