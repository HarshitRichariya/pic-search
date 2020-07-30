import React from "react";

export default function Image(props) {
  return <img src={props.image.urls.thumb} alt={props.image.description} />;
}
