import React from "react";
import { Remarkable } from "remarkable";

export default function Markdown(props) {
  const { markdown } = props;
  const md = new Remarkable("full");
  const html = md.render(markdown);

  return <div {...props} dangerouslySetInnerHTML={{ __html: html }} />;
}
