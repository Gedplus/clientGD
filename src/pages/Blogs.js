import React, { useState } from "react"
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import { Link } from 'react-router-dom'

import { useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllBlogs, getAllcatBlogs } from "../features/blogs/blogSlice";
import  moment from "moment";
const Blogs = ( ) => {
    const [categories, setCategorie] = useState([])

    const blogState = useSelector((state) => state?.blog?.catBlog);
    console.log(blogState ,"ddff")
    const dispatch = useDispatch();
    const location = useLocation();
    const getBlogCatId = location.pathname.split("/")[2];
useEffect(() => {
    getBlogs();
},[]);

const getBlogs = () =>{
    dispatch(getAllcatBlogs(getBlogCatId));
}
console.log(blogState)
useEffect(()=> {

    let newcategory= [];


    for(let index = 0 ; index <blogState.length ; index++){
        const element= blogState[index];
      
        newcategory.push(element.category)
        
    
    }
  
    setCategorie(newcategory)


},[blogState])
    
    return(
        <>
        <Meta title={"Blogs"} />
        <BreadCrumb title="Blogs" />
        <Container class1="blog-wrapper home-wrapper-2 py-5"> <div className="row">
                    <div className="col-3">     <div className="filter-card mb-3">
                        <h3 className="filter-title">Rechercher par catégories</h3>
                        <div >
                            <ul className="ps-0">
                                
    {categories && [...new Set(categories)].map((item, index) =>{
    return ( <li> <Link className="text-black py-2 mb-1" to={`/blogs/${item}`} >{item} </Link></li>)})}
                              
                            </ul>
                        </div>
                    </div></div>
                    <div className="col-9">
<div className="row">

    {blogState?.map((item,index)=>{
        return(
            <div className="col-6 mb-3"key={item?._id}>
<BlogCard id={item?._id} title={item?.title} description={item?.description} date={moment().format(item?.created_at)} image={item?.images[0]?.url} />
</div>
     
        )
    })}



</div>

                    </div>
                </div></Container>
 
        </>
    )
}
export default Blogs;