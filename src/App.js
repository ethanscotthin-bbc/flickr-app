/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import Submission from "./components/submission.jsx";

function App() {
  const flickrUrl =
    "https://api.flickr.com/services/feeds/photos_public.gne?nojsoncallback=1&format=json";

  const [feed, setFeed] = useState([]);

  function getFlikrAPIResponse(url) {
    return new Promise(function (resolve, reject) {
      // create new request
      var request = new XMLHttpRequest();
      request.open("GET", url);
      // do this function after request is sent
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          // the request has finished when readystate is 4
          if (request.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }
      };
      request.onerror = function () {
        reject(Error("Network Error"));
      };
      request.send();
    });
  }

  useEffect(() => {
    getFlikrAPIResponse(flickrUrl)
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
      <h1>Flickr App</h1>
      <div id="submissions">
        {feed.map((item, index) => {
          return (
            <Submission
              key={index}
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
