import React, { useEffect, useState } from 'react'
import classes from './ProductDetail.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loder from '../../Components/Loader/Loder'

function ProductDetail() {
   const [product, setProduct] = useState({});
   const [isLoading, setisLoadiing] = useState(false)
   const {productId} = useParams()
   useEffect(()=>{
      setisLoadiing(true)
   axios.get(`${productUrl}/products/${productId}`)
  .then((res)=>{
  setProduct(res.data)
      setisLoadiing(false)
}).catch((err)=>{
  console.log(err);
      setisLoadiing(false)
  })
 },[])
  
  return (
    <LayOut>
        {isLoading? (<Loder/>):( <ProductCard
          product={product}
          flex = {true}
          renderDesc={true}
          renderAdd={true}
        />)}
     
    </LayOut>
  )
}

export default ProductDetail