import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";

export default function Header() {
  const [header, setHeader] = useState(null);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "header"] {
          title,
          body,
          mainImage
          }[0]`
      )
      .then((data) => setHeader(data))
      .catch(console.error);
  }, []);

  if (!header) {
    console.error(
        '👿 No bio.',
    )
    return null
}

  return (
    <div className="bio-content">
      <BlockContent blocks={header.body}/>
      <img className="me" src={header.mainImage}/>
    </div>
  );
}