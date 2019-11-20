/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "ducks/search/";
import { Link } from "@material-ui/core";
import { wikiLinkPlugin, wikiRefPlugin } from "helpers/markdown";

export default function Markdown(markdownProps) {
  const { source, inEditMode, noRequests } = markdownProps;

  const dispatch = useDispatch();
  const refs = useSelector(state => state.search.references);

  const fetchSelectedArticle = title => {
    dispatch(
      searchActions.getArticleRequest({
        title,
        focus: true,
        location: "autosuggest"
      })
    );
  };

  const fetchReference = title => {
    dispatch(searchActions.getReferenceRequest(title));
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

  const renderWikiRef = linkProps => {
    const { value } = linkProps;
    if (inEditMode) {
      return (
        <em>
          {"<"}
          <strong>{value}</strong> will be rendered ones this is saved...{">"}
        </em>
      );
    }
    if (refs[value]) {
      return refs[value].article ? (
        // eslint-disable-next-line no-use-before-define
        <div>{renderMarkdown(refs[value].article.text)}</div>
      ) : (
        <em>
          {"<Article "}
          <strong>{value}</strong>
          {" couldn't be fetched.>"}
        </em>
      );
    }
    if (!noRequests) {
      fetchReference(value);
    }
    return "";
  };

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
        wikiRef: renderWikiRef,
        wikiLink: renderWikiLink
      }}
    />
  );

  return renderMarkdown(source);
}
