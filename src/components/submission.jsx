import React from "react";
import "../style/submission.css";
import Like from "./like";

export default function Submission({
  title = "No title",
  published = "",
  description = "",
  dataKey = "",
  search = "",
  tags = [],
  isFavourite = false,
  onFavourite = () => {},
}) {
  // format the date so it doesnt look horrible
  const formattedDate = new Date(Date.parse(published))
    .toString()
    .split("+")[0];

  const formattedTags =
    "<h4>Tags: </h4>" +
    tags
      .split(" ")
      .map((item) => {
        if (item.toLowerCase() === search.toLowerCase()) {
          return `<b>${item}</b>`;
        }
        return item;
      })
      .sort()
      .join(", ");


  return (
    <section>
      <h1>{title}</h1>
      <p style={{ fontWeight: "bold" }}>{formattedDate}</p>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      {tags.length === 0 ? (
        <br />
      ) : (
        <>
          <div dangerouslySetInnerHTML={{ __html: formattedTags }} />
          <br />
        </>
      )}

      <Like dataKey={dataKey} />
      <button type="button" onClick={() => onFavourite(dataKey)}>
        {isFavourite ? "Unfavourite" : "Favourite this post!"}
      </button>
    </section>
  );
}
