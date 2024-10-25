import React from 'react';
import {categoryInfos} from "./catageryFullInfos";
import CategoryCard from './CategoryCard';
import classes from "./category.module.css"

function Category() {
  return (
    <div >
        <section className={classes.category__container}>
            {
              categoryInfos.map((infos)=>{
              return  <CategoryCard key={infos} data = {infos} />
              })          
            }
        </section>
    </div>
  )
}

export default Category