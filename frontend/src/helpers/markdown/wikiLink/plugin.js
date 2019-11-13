import createInlineTokenizer from "./tokenizer";
import createCompiler from "./compiler";

const NODE_TYPE = "wikiLink";
const START_SYMBOL = "[";
const LINK_REGEX = /^\[\[(.+?)\]\]/;

export default function wikiLinkPlugin(options = {}) {
  const aliasDivider = options.aliasDivider || "|";

  const parser = this.Parser.prototype;
  const { inlineTokenizers, inlineMethods } = parser;
  inlineTokenizers[NODE_TYPE] = createInlineTokenizer({
    aliasDivider,
    LINK_REGEX,
    START_SYMBOL
  });
  inlineMethods.splice(inlineMethods.indexOf("link"), 0, NODE_TYPE);

  // Stringify for wiki link
  const { Compiler } = this;

  if (Compiler != null) {
    const { visitors } = Compiler.prototype;
    if (visitors) {
      visitors[NODE_TYPE] = createCompiler(aliasDivider);
    }
  }
}
