/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from "@material-ui/core";
import { searchActions } from "ducks/search/";
import { wikiLinkPlugin, wikiRefPlugin } from "helpers/markdown";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import * as tableRender from "./table";

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
        wikiLink: renderWikiLink,
        table: tableRender.table,
        tableHead: tableRender.head,
        tableBody: tableRender.body,
        tableRow: tableRender.row,
        tableCell: tableRender.cell
      }}
    />
  );

  return renderMarkdown(source);
}
