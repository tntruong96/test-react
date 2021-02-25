import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {

  const {setSearchTerm} = useGlobalContext();
  const searchValue = useRef(null);

  useEffect(() => {
      searchValue.current.focus();
  }, [])

  return (
    <section className="section">
      <form  className="search-form">
      <div className="form-control">
        <label htmlFor="search">search your favorite cocktail</label>
        <input type="text" name="search" id="name" ref={searchValue} onChange={(e) => {setSearchTerm(e.target.value)}}/>
      </div>
      </form>
    </section>
  )
}

export default SearchForm
