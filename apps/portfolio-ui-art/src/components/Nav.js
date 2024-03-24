import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = ({ allPostsData }) => {
    if (!allPostsData) {
        console.error(
            '👿 No posts. You need to pass a `posts` array into ArchiveNav, eg: `<ArchiveNav posts={posts} />',
        )
        return null
    }
      
    return (
      <div className="post-margin">
      {allPostsData &&
        allPostsData.map((post, index) => (
          <div className="index" key={index}>
            <div id={post.slug.current} className="foreGround">
              <Link to={"/" + post.slug.current} key={post.slug.current}>
                {post.backgroundImage && (<img className="backgroundImage" src={post.backgroundImage.asset.url} alt=""/>)}
                <h2 key={index}>{post.title}</h2>
              </Link>
              <Link to={"/" + post.slug.current} key={post.slug.current}>
                <img className="main-image" src={post.mainImage}/>
              </Link>
            </div>
          </div>
        ))}
    </div>
    )
}
export default Nav
