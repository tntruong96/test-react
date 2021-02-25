import React, { useCallback, useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);
  const { id } = useParams();

  const fetchData =useCallback( async () => {
    setLoading(true);
    try {
      const data = await (await fetch(`${url}${id}`)).json();
      if (data.drinks) {
        const { idDrink,strCategory, strDrink, strDrinkThumb, strAlcoholic, strGlass, strInstructions, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5 } = data.drinks[0];
        const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5];
        const formatDetail = { id: idDrink,category:strCategory, name: strDrink, image: strDrinkThumb, info: strAlcoholic, glass: strGlass, ins: strInstructions, ing: ingredients };
        setCocktail(formatDetail);
      } else {
        setCocktail(null);
      }

    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  if (loading) {
    return <Loading />
  }
  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>

  }

  return (
    <section className="section cocktail-section">
      <Link className="btn btn-primary" to="/">Back Home</Link>
      <h1 className="section-title">{cocktail.name}</h1>
      <div className="drink">
        <img src={cocktail.image} alt={cocktail.name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span>
            {cocktail.name}
          </p>
          <p>
            <span className="drink-data">category:</span>
            {cocktail.category}
          </p>
          <p>
            <span className="drink-data">info:</span>
            {cocktail.info}
          </p>
          <p>
            <span className="drink-data">glass:</span>
            {cocktail.glass}
          </p>
          <p>
            <span className="drink-data">instructions:</span>
            {cocktail.ins}
          </p>
          <p>
            <span className="drink-data">ingredients:</span>
            {cocktail.ing.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
