import createLocator from "./locator";

export default props => {
  const { aliasDivider, LINK_REGEX, START_SYMBOL } = props;

  function isAlias(pageTitle) {
    return pageTitle.indexOf(aliasDivider) !== -1;
  }

  function parseAliasLink(pageTitle) {
    const [name, displayName] = pageTitle.split(aliasDivider);
    return { name, displayName };
  }

  function parsePageTitle(pageTitle) {
    if (isAlias(pageTitle)) {
      return parseAliasLink(pageTitle);
    }
    return {
      name: pageTitle,
      displayName: pageTitle
    };
  }

  function inlineTokenizer(eat, value) {
    const match = LINK_REGEX.exec(value);

    if (match) {
      const pageName = match[1].trim();
      const { name, displayName } = parsePageTitle(pageName);

      return eat(match[0])({
        type: "wikiLink",
        value: name,
        alias: displayName,
        href: `#/${name}`
      });
    }
    return undefined;
  }

  inlineTokenizer.locator = createLocator(START_SYMBOL);

  return inlineTokenizer;
};
