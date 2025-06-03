import React from 'react'
import { categoryImage } from './catagoryfullinfos'
import CategoryCard from './CategoryCard'
import classes from './catagory.module.css'

const Category = () => {
  return (
    <section className={classes.catagory_container}>
     

      {categoryImage.map((infos, index) => (
  <CategoryCard data={infos} key={index} />
))}

    </section>
  )
}

export default Category
