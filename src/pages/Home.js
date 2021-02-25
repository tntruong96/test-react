import React from 'react'
import CocktailList from '../components/CocktailList'
import SearchForm from '../components/SearchForm'

const Home = () => {
  return (
    <main>
      <section className="section search">
        <SearchForm />
      </section>
      <section className="section">
        <CocktailList />
      </section>
    </main>
  )
}

export default Home
