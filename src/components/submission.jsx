import React from "react";
import "./Submission.css"

export default function Submission({
  title = "No title",
  media = "",
  published = "",
  description = "",
}) {
  return (
    <section>
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <p>{published}</p>
    </section>
  );
}
