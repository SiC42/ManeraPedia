import createLocator from "./locator";

export default props => {
  const { LINK_REGEX, START_SYMBOL } = props;

  function inlineTokenizer(eat, value) {
    console.log("value");
    const match = LINK_REGEX.exec(value);

    if (match) {
      const pageName = match[1].trim();

      return eat(match[0])({
        type: "wikiRef",
        value: pageName
      });
    }
    return undefined;
  }

  inlineTokenizer.locator = createLocator(START_SYMBOL);

  return inlineTokenizer;
};
