import React from "react";
import Main from "G:/TYCSS6/S6blogwebsite/Blogwebsite/frontend/src/Home/Main.jsx";
import Trending from "G:/TYCSS6/S6blogwebsite/Blogwebsite/frontend/src/Home/Trending";
import Devotional from "G:/TYCSS6/S6blogwebsite/Blogwebsite/frontend/src/Home/Devotional";
import Creator from "G:/TYCSS6/S6blogwebsite/Blogwebsite/frontend/src/Home/Creator";

function Home() {
  return (
    <div>
      <Hero />
      <Trending />
      <Devotional />
      <Creator />
    </div>
  );
}

export default Home;