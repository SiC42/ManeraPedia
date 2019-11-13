import React from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { searchActions } from "ducks/search/";
import { Link } from "@material-ui/core";
import { wikiLinkPlugin, wikiRefPlugin } from "helpers/markdown";

export default function Markdown(markdownProps) {
  const { markdown } = markdownProps;

  const dispatch = useDispatch();

  const fetchSelectedArticle = _title => {
    dispatch(
      searchActions.getArticleRequest({
        title: _title,
        focus: true,
        location: "autosuggest"
      })
    );
  };

  const openNewTab = article => event => {
    event.preventDefault();
    fetchSelectedArticle(article);
  };

  const renderWikiLink = linkProps => {
    const { href, value, alias } = linkProps;
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link href={href} value={value} onClick={openNewTab(value)}>
        {alias}
      </Link>
    );
  };

  const renderLink = linkProps => {
    const { href, children } = linkProps;
    return (
      <Link href={href} target="_blank" rel="noreferrer noopener">
        {children[0].props.children}
      </Link>
    );
  };

  return (
    <ReactMarkdown
      source={markdown}
      plugins={[wikiLinkPlugin, wikiRefPlugin]}
      renderers={{
        link: renderLink,
        wikiRef: props => JSON.stringify(props),
        wikiLink: renderWikiLink
      }}
    />
  );
}
