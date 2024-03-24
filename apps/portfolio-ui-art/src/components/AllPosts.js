import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import Nav from "./Nav.js";

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);
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

  if (!allPostsData) return <div className="loading">Loading...</div>;

  return (
    <Nav allPostsData={allPostsData} />
  );
}