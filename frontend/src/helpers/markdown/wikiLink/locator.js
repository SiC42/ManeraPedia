export default startSymbol =>
  function locator(value, fromIndex) {
    return value.indexOf(startSymbol, fromIndex);
  };
