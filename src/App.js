/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./style/App.css";
import Submission from "./components/submission.jsx";
import getFlikrAPIResponse from "./tools/api-response.js";
import SearchBar from "./components/searchbar";
import { useSearchParams } from "react-router-dom";

function App() {
  // variables
  const flickrUrlRoot =
    "https://api.flickr.com/services/feeds/photos_public.gne?nojsoncallback=1&format=json&tags=";
  const [feed, setFeed] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams("");
  const search = searchParams.get("search") ?? "";
  const favouriteStorageKey = "favourite-submission";
  const [fav, setFav] = useState(
    localStorage.getItem(favouriteStorageKey) ?? ""
  );

  // useEffect to get the data
  useEffect(() => {
    getFlikrAPIResponse(flickrUrlRoot + search)
      .then(function (response) {
        setFeed(JSON.parse(response)?.["items"] ?? []);
      })
      .catch(function (error) {
        console.error("Failed!", error);
      });
  }, []);

  // callback function for submission tiles
  function onFavourite(value) {
    // un favourite
    if (localStorage.getItem(favouriteStorageKey) === value) {
      setFav("");
      localStorage.setItem(favouriteStorageKey, "");
    } else {
      setFav(value);
      localStorage.setItem(favouriteStorageKey, value);
    }
  }

  function onSubmitSearch(value) {
    setSearchParams((prevParams) => {
      prevParams.set("search", value);
      return prevParams;
    });
    window.location.reload();
    console.log(value);
  }

  // main app
  return (
    <div id="container">
      <header className="App-header">
        <h1>Flickr Search</h1>
        <SearchBar
          onSubmitSearch={onSubmitSearch}
          initialValue={search}
          favLink={fav}
        />
      </header>

      <div id="submission-list">
        {search === "" ? (
          <div className="emptyText">
            <p>Search anything above!</p>
          </div>
        ) : (
          feed.map((item) => {
            const key = item["link"];
            return (
              <Submission
                key={key}
                dataKey={key}
                title={item["title"]}
                description={item["description"]}
                published={item["published"]}
                search={search}
                tags={item["tags"]}
                onFavourite={onFavourite}
                isFavourite={fav === key}
              />
            );
          })
        )}
      </div>
      <br />
      <br />
      <footer>
        <p>Ethan-Scott Hin</p>
      </footer>
    </div>
  );
}

export default App;
