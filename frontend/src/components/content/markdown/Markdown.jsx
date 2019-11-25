/* eslint-disable no-use-before-define */
import { Link } from "@material-ui/core";
import { wikiLinkPlugin, wikiRefPlugin } from "helpers/markdown";
import React from "react";
import ReactMarkdown from "react-markdown";
import useTableRenderer from "./table";
import useWikiRenderer from "./wiki";

export default function Markdown(markdownProps) {
  const { source, inEditMode, noRequests } = markdownProps;
  const tableRenderer = useTableRenderer();
  const wikiRenderer = useWikiRenderer({
    inEditMode,
    noRequests,
    renderMarkdown
  });
  const renderLink = linkProps => {
    const { href, children } = linkProps;
    return (
      <Link href={href} target="_blank" rel="noreferrer noopener">
        {children[0].props.children}
      </Link>
    );
  };

  const renderMarkdown = text => (
    <ReactMarkdown
      source={text}
      plugins={[wikiLinkPlugin, wikiRefPlugin]}
      renderers={{
        link: renderLink,
        ...wikiRenderer,
        ...tableRenderer
      }}
    />
  );

  return renderMarkdown(source);
}
