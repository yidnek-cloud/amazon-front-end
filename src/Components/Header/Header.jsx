import React from 'react'
import classes from './Header.module.css'
import {Link} from 'react-router-dom'
import { SlLocationPin } from "react-icons/sl";
import { IoSearch } from "react-icons/io5";
import LowerHeader from './LowerHeader';
import { useContext } from 'react';
import { BiCartDownload } from "react-icons/bi";
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from "../../Utility/firebase"



const Header = () => {
  const [{user, basket},dispatch] = useContext(DataContext)
  // console.log(basket.length);
  const totalItem = basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)
  
  return (
   
    <section className={classes.fixed}>
         <section>
        <div   className={classes.header__container}>
        <div className={classes.logo__container}>    
           <Link to='/'>
                <img src='https://pngimg.com/uploads/amazon/small/amazon_PNG11.png' alt='amazon logo'/>
            </Link>
           <div className={classes.delivery}>
            <span>
            <SlLocationPin />
            </span>
            <div>
                <p>Deliverd  to</p>
                <span>Ethiopia</span>
              </div>
            </div>
         </div>
         <div  className={classes.search}>
                <select name='' id=''>
                    <option value="">All</option>
                </select>
                <input type='text'/>
                <IoSearch  size={26}/>
            </div>
         <div className={classes.order__container}>
         <Link to=''className={classes.language}>
              <img src='https://flagpedia.net/data/flags/w1600/us.png' alt='' />
            <section name="" id="">
                <option value="">EN</option>
            </section>
         </Link>
        <Link to={!user && '/auth'}>
        <div>
            {user ? (
              <>
              <p>Hello {user ?.email?.split("@")[0]}</p>
              <span onClick={()=>auth.signOut()}>Sign Out</span>
              </>
            ) : (
              <>
              <p>Hello, Sign In</p>
              <span>Account & Lists</span>
                </>
            )}
        </div>
        </Link>
        <Link to='/orders'>
            <p>returns</p>
            <span>& Orders</span>
        </Link>
        <Link to='/cart' className={classes.cart}>
        <BiCartDownload size={35} />
            <span>{totalItem}</span>
          </Link>
         </div>
      </div>
         </section>
     <LowerHeader />
    </section>
  )
}

export default Header;