import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({products}) => {
  console.log('Home data: ', products)
  return (
    <div>
        <h1><Link to={`/admin/product`}>product</Link></h1>
      {products.map((items, index) => {
        return (
          <div key={index + 1}>
            <h3><Link to={`/detail/${items.id}`}>{items.name}</Link></h3>
            <p>{items.price}</p>
          </div>
        )
      })
      }
    </div>
  )
}

export default Home