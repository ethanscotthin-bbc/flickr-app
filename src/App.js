/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import Submission from "./components/submission.jsx";
import getFlikrAPIResponse from "./tools/api-response.js";

function App() {
  const flickrUrlRoot =
    "https://api.flickr.com/services/feeds/photos_public.gne?nojsoncallback=1&format=json&tags=";
  const [feed, setFeed] = useState([]);
  const [search, setSearch] = useState("tree");

  useEffect(() => {
    getFlikrAPIResponse(flickrUrlRoot + search)
      .then(function (response) {
        setFeed(JSON.parse(response)?.["items"] ?? []);
        console.log(feed);
      })
      .catch(function (error) {
        console.error("Failed!", error);
      });
  }, [search]);

  return (
    <div id="container">
      <header className="App-header">
        <h1>Flickr Search</h1>
        <input
          style={{
            margin: "20px",
            width: "40%",
            padding: "10px",
            borderRadius: "25px",
          }}
          type="text"
          name="name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <div id="submission-list">
        {feed.map((item) => {
          return (
            <Submission
              key={item["link"]}
              dataKey={item["link"]}
              title={item["title"]}
              description={item["description"]}
              published={item["published"]}
              search={search}
              tags={item["tags"]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
