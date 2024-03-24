import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import Nav from "./Nav.js";

export default function OnePost() {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();
  const [allPostsData, setAllPosts] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false); // Flag to indicate page load

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug]{
            title,
            slug,
            linkTitle,
            link,
            type,
            year,
            backgroundImage{
              asset->{
              _id,
              url
              }
            },
            body,
            images[]
       }`,
        { slug }
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error);
  }, [slug]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"] | order(year desc) {
            title,
            slug,
            backgroundImage{
              asset->{
              _id,
              url
              }
            },
            mainImage,
            images[]
          }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    // Execute scrollToId(slug) only if pageLoaded is false
    if (!pageLoaded) {
      scrollToId(slug);
      setPageLoaded(true); // Set pageLoaded to true after initial load
    }
  }, [slug, pageLoaded]);

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView();
    }
  };

  if (!postData) return <div className="loading">Loading...</div>;

  return (
    <>
      <div className="post-margin">
        {allPostsData &&
          allPostsData.map((post, index) => (
            <div className="index" key={index}>
              <div id={post.slug.current} className="foreGround">
                <Link to={"/" + post.slug.current} key={post.slug.current} onClick={() => scrollToId(post.slug.current)}>
                  {post.backgroundImage && (<img className="backgroundImage" src={post.backgroundImage.asset.url} alt=""/>)}
                  <h2 key={index}>{post.title}</h2>
                </Link>
                <Link to={"/" + post.slug.current} key={post.slug.current} onClick={() => scrollToId(post.slug.current)}>
                  <img className="main-image" src={post.mainImage}/>
                </Link>
              </div>
            </div>
          ))}
      </div>

      
      <div className="one-post">
        <div className="inner-footer">
        <div className="footer-2">{postData.type}</div>
          <h2 className="inner-h2">{postData.title}</h2>
          <div className="footer-1"><Link to={postData.link} target="_blank" rel="noopener noreferrer">{postData.linkTitle}</Link></div>
          
          <div className="footer-3">{postData.year}</div>
          
          <BlockContent className="body" blocks={postData.body}/>
          {postData.images && postData.images.map((image, imageIndex) => (
            <img className="little-image" key={imageIndex} src={image}/>
          ))}
        </div>
      </div>
    </>
  );
}