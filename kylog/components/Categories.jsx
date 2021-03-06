import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getCategories } from '../services'


const Categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(receivedCategories => setCategories(receivedCategories));
  }, []);
  
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8 overflow-y-scroll h-72'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Categories
      </h3>
      {
        categories.map((category) => (
          <Link href={`/category/${category.slug}`} key = { category.slug } className = ''>
            <span className='cursor-pointer block pb-3 mb-3'>
              { category.name }
            </span>
          </Link>
        ))
      }
    </div>
  )
}

export default Categories