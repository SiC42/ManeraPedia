export default startBlock => (value, fromIndex) => {
  return value.indexOf(startBlock, fromIndex);
};
