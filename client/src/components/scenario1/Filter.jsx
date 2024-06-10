import React from 'react'
import Header from '../Header'
import FilterOption from './FilterOption'
import { useState } from 'react'
const Filter = () => {

  const [filters, setFilters] = useState({});
  const onFilterChange = (filterName, filterValue) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: filterValue
    }));
  };

  return (
    <div className='flex items-center justify-center '>
      <Header />
      <FilterOption onFilterChange={onFilterChange}/>
    </div>
  )
}

export default Filter
