export default aliasDivider => node => {
  if (node.data.alias !== node.value) {
    return `[[${node.value}${aliasDivider}${node.data.alias}]]`;
  }
  return `[[${node.value}]]`;
};
