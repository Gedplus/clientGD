import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {BsSearch} from "react-icons/bs"
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useDispatch, useSelector } from 'react-redux'
import { array } from 'yup';
import { getAProduct } from '../features/products/productSlice';
const Header = () => {
  const dispatch =useDispatch()
  const [paginate, setPaginate] = useState(true);
  const userCartState = useSelector(state => state?.auth?.cartProducts)
  const authState = useSelector(state => state?.auth )
  const productState = useSelector(state => state?.product?.product )
  const [productopt , setProductOpt] =useState([])
  const [total, setTotal]= useState(null)
  const navigate = useNavigate()
  console.log(authState)
  useEffect (() => {
    let sum = 0;
    for (let index =0 ; index < userCartState?.length; index ++){
        sum = sum + (Number (userCartState[index].quantity) * Number(userCartState[index].price))
   
    }    setTotal(sum)  
},[userCartState])
useEffect(() =>{
let data=[]
for(let index=0 ; index< productState.length; index++)
{
  const element = productState[index] ;
  data.push({id: index,prod:element?._id, name:element?.title})
}
setProductOpt(data)

},[productState])


const handleLogout = () =>{
  localStorage.clear()
  window.location.reload()
}

  return (
<>
<header className='header-top-strip py-3'>
  <div className='container-xxl'>
    <div className='row'>
      <div className='col-6'>
        <p className='text-white mb-0' >Free Shopping Over $100 & Free Returns</p>
      </div>
      <div className='col-6'>
        <p className='text-end text-white mb-0'>
          Hotline: <a className='text-white' href="tel:+91 8264954234">+91 8264954234</a>
        </p>
      </div>
    </div>
  </div>
</header>
<header className='header-upper py-3'>
  <div className='container-xxl'>
    <div className='row'>
      <div className='col-2'>
        <h2>
          <Link className='text-white'>Dev Corner</Link>
        </h2>
      </div>
      <div className='col-5'>
        <div className='input-group '>
        <Typeahead
        id="pagination-example"
        onPaginate={() => console.log('Results paginated')}
        onChange={(selected) => {
navigate(`/product/${selected[0]?.prod}`)

dispatch(getAProduct(selected[0]?.prod))
        }}
        options={productopt}
        paginate={paginate}
        minLength={2}
        labelKey={"name"}
        placeholder="Search for Products here..."
      />
          <span className='input-group-text p-3' id='basic-addon2'><BsSearch className='fs-6'/></span>
        </div>
      </div>
      <div className='col-5'>
        <div className='header-upper-links d-flex align-items-center justify-content-between'>
          <div>
            <Link to="/compare-product" className='d-flex align-items-center gap-10 text-white'><img src="images/compare.svg" alt="compare" /><p className='mb-0'>Compare <br/> Products</p></Link>
          </div>
          <div>        <Link to="/wishlist" className='d-flex align-items-center gap-10 text-white' ><img src="images/wishlist.svg" alt="wishlist" /><p className='mb-0'>Favourite  <br/> wishlist</p></Link></div>
          <div>         <Link to={authState?.user=== null || authState?.user=== undefined ? "/login" : "/my-profile" }className='d-flex align-items-center gap-10 text-white' >
            <img src="images/user.svg" alt="user" />
            {authState.user === null  || authState?.user=== undefined  ?     <p className='mb-0'>Log in <br/> My Account</p> :     <p className='mb-0'>Welcome {authState.user.firstname} </p> }
            
        </Link></div>
          <div>         <Link to="/cart" className='d-flex align-items-center gap-10 text-white'><img src="images/cart.svg" alt="cart" />
          
          <div className='d-flex flex-column gap-10'><span className='badge bg-white text-dark '>{userCartState?.length ? userCartState?.length : 0}</span> <p className='mb-0'>$ {total ? total : 0}</p> </div></Link></div>
        </div>
      </div>
    </div>
  </div>
</header>
<header className='header-bottom py-3'>
  <div className='container-xxl'>
    <div className='row'>
      <div className='col-12'>
        <div className='menu-bottom d-flex align-items-center gap-30'>
          <div className='dropdown'>
            <button className='btn btn-secondary dropdown-toggle bg-transparent border-0  gap-15 d-flex align-items-center'
            type='button'
            id='dropdownMenuButton1'
            data-bs-toggle="dropdown"
            aria-expanded="false">
              
              <img src='images/menu.svg' alt='' />
              
              <span className='me-5 d-inline-block' >Shop Categories</span></button>
<ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
  <li><Link className='dropdown-item text-white' to='#'>Action</Link></li>
  <li><Link className='dropdown-item text-white' to='#'>Action</Link></li>
  <li><Link className='dropdown-item text-white' to='#'>Action</Link></li>
</ul>


          </div>
          <div className='menu-links'>
            <div className='d-flex align-items-center gap-15'>
<NavLink  className="text-white" to="/">Home</NavLink>
<NavLink className="text-white"  to="/store">Our Store</NavLink>
<NavLink className="text-white"  to="/my-orders">My Orders</NavLink>
<NavLink className="text-white"  to="/blogs">Blogs</NavLink>
<NavLink  className="text-white"  to="/contact">Contact</NavLink>
<button onClick={handleLogout}  className='border border-0 bg-transparent text-white text-uppercase'type='button'>Logout</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</header>

</>
  )
}

export default Header