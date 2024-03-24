import './App.css';
import React, { useEffect, useState } from "react";
import sanityClient from "./client.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllPosts from "./components/AllPosts.js";
import OnePost from "./components/OnePost.js";
import Header from "./components/Header.js";

function App() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  const toggleHeader = () => {
    setIsHeaderVisible(!isHeaderVisible);
  };

  return (
    <div>
        <div className="bio">
          <h2 key="bio" onClick={() => toggleHeader()}>Bio</h2>
          <div>
            {isHeaderVisible && <Header />}
          </div>
        </div>
        <div className="stars">
          <img className="star1" src="https://web.archive.org/web/20091021091826/http://www.geocities.com/claudefrancoisforever/small_starcolchange.gif"></img>
          <img className="star2" src="https://web.archive.org/web/20091024183442/http://www.geocities.com/j6_9f/Stuff-SmallStar.gif"></img>
          <img className="star3" src="https://web.archive.org/web/20090831150008/http://geocities.com/waiyan_xing/little-star-b2.gif"></img>
      </div>
    <BrowserRouter>
        <Routes>
          <Route component={AllPosts} path="/" exact element={<AllPosts />}/>
          <Route component={OnePost} path="/:slug" element={<OnePost />}/>
        </Routes>
    </BrowserRouter>
    <div className="footer">
        <div className="stars-bottom">
          <img className="star4" src="https://web.archive.org/web/20091020032424/http://hk.geocities.com/iou_gif/star1.gif"></img>
          <img className="star5" src="https://web.archive.org/web/20091026232923/http://www.geocities.com/Tokyo/Market/7773/star.gif"></img>
          <img className="star6" src="https://web.archive.org/web/20090727164321/http://br.geocities.com/anaelyod/chuva01.gif"></img>
        </div>
      </div>
    </div>
  );
}
export default App;
