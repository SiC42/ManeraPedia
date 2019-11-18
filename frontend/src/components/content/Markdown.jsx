/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "ducks/search/";
import { Link } from "@material-ui/core";
import { wikiLinkPlugin, wikiRefPlugin } from "helpers/markdown";

export default function Markdown(markdownProps) {
  const { markdown, inEditMode } = markdownProps;

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
        <div>
          <MarkDownRender source={refs[value].article.text} />
        </div>
      ) : (
        <em>
          {"<There is no article named "}
          <strong>{value}</strong>
          {".>"}
        </em>
      );
    }
    fetchReference(value);
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

  const MarkDownRender = props => (
    <ReactMarkdown
      source={props.source}
      plugins={[wikiLinkPlugin, wikiRefPlugin]}
      renderers={{
        link: renderLink,
        wikiRef: renderWikiRef,
        wikiLink: renderWikiLink
      }}
    />
  );

  return <MarkDownRender source={markdown} />;
}
