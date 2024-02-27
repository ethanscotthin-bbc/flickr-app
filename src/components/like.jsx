import React, { useState } from "react";

export default function Like({ dataKey = "" }) {
  const likeStorageKey = dataKey + "-likes";
  const [likes, setLikes] = useState(
    Number(localStorage.getItem(likeStorageKey)) || 0
  );
  const onLike = () => {
    let newLikes = Number(likes) + 1;
    setLikes(newLikes);

    localStorage.setItem(likeStorageKey, newLikes);
  };

  return (
    <>
      <p style={{ fontWeight: "bold" }}>{likes} Likes</p>
      <button type="button" onClick={onLike}>
        Like
      </button>
    </>
  );
}
