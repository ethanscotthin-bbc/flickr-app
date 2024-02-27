import React from "react";
import "./Submission.css";
import Like from "./like";

export default function Submission({
  title = "No title",
  published = "",
  description = "",
  dataKey = "",
  search = "",
  tags = [],
}) {
  const formattedDate = new Date(Date.parse(published)).toString();
  const tagArray =
    "<h4>Tags: </h4>" +
    tags
      .split(" ")
      .map((item) => {
        if (item.toLowerCase() === search) {
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
          <div dangerouslySetInnerHTML={{ __html: tagArray }} />
          <br />
        </>
      )}

      <Like dataKey={dataKey} />
    </section>
  );
}
