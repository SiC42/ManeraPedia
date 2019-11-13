export const isRemarkParser = parser => {
  return Boolean(
    parser &&
      parser.prototype &&
      parser.prototype.inlineTokenizers &&
      parser.prototype.inlineTokenizers.break &&
      parser.prototype.inlineTokenizers.break.locator
  );
};

export const isRemarkCompiler = compiler => {
  return Boolean(compiler && compiler.prototype);
};
