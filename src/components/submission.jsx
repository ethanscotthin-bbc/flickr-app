import React from "react";

export default function Submission({
  title = "No title",
  media = "",
  published = "",
  description = "",
}) {
  return (
    <>
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <p>{published}</p>
    </>
  );
}
