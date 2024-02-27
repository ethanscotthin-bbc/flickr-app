/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import Submission from "./components/submission.jsx";
import getFlikrAPIResponse from "./tools/api-response.js";


function App() {

  const flickrUrlRoot =
    "https://api.flickr.com/services/feeds/photos_public.gne?nojsoncallback=1&format=json&tags=";
  const [feed, setFeed] = useState([]);
  const [search, setSearch] = useState("tree")

  useEffect(() => {
    getFlikrAPIResponse(flickrUrlRoot + search)
      .then(function (response) {
        setFeed(JSON.parse(response)?.["items"] ?? []);
        console.log(feed);
      })
      .catch(function (error) {
        console.error("Failed!", error);
      });
  }, []);

  return (
    <div id="container">
      <header className="App-header">
        <h1>Flickr App</h1>  
      </header>
      <div id="submission-list">
        {feed.map((item) => {
          let key = item["date_taken"] + item["author_id"];
          return (
            <Submission
              key={key}
              title={item["title"]}
              description={item["description"]}
              published={item["published"]}
              media={item["media"]["m"]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
