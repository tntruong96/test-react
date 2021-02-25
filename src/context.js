import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);


  const fetchDrinks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await(await fetch(`${url}s=${searchTerm}`)).json();
      const {drinks} = data;
      if(drinks){
        const newCocktails = drinks.map((drink) => {
          const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass} = drink;
          return {id: idDrink, name: strDrink, image: strDrinkThumb, info: strAlcoholic, glass: strGlass};
        })
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
    } catch (error) {
      console.log(error);
      
    }
    setLoading(false);
  }, [searchTerm]);

 

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  return <AppContext.Provider value={{
    loading, searchTerm, cocktails, setSearchTerm, setLoading
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
