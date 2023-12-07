import React from "react"
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllBlogs } from "../features/blogs/blogSlice";
import  moment from "moment";
const Blog = ( ) => {
    
    const blogState = useSelector((state) => state.blog.blog);
    const dispatch = useDispatch();
   
useEffect(() => {
    getBlogs();
},[]);

const getBlogs = () =>{
    dispatch(getAllBlogs());
}
console.log(blogState)
    
    return(
        <>
        <Meta title={"Blogs"} />
        <BreadCrumb title="Blogs" />
        <Container class1="blog-wrapper home-wrapper-2 py-5"> <div className="row">
                    <div className="col-3">     <div className="filter-card mb-3">
                        <h3 className="filter-title">Rechercher par catégories</h3>
                        <div >
                            <ul className="ps-0">
                                <li>Watch</li>
                                <li>Tv</li>
                                <li>Camera</li>
                                <li>Laptop</li> 
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
export default Blog;