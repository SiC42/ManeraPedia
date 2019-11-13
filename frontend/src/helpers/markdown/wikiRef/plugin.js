import createInlineTokenizer from "./tokenizer";
import compiler from "./compiler";

const NODE_TYPE = "wikiRef";
const START_SYMBOL = "{";
const LINK_REGEX = /^\{\{(.+?)\}\}/;

export default function wikiLinkPlugin() {
  const parser = this.Parser.prototype;
  const { inlineTokenizers, inlineMethods } = parser;
  inlineTokenizers[NODE_TYPE] = createInlineTokenizer({
    LINK_REGEX,
    START_SYMBOL
  });
  inlineMethods.splice(inlineMethods.indexOf("reference"), 0, NODE_TYPE);

  // Stringify for wiki link
  const { Compiler } = this;

  if (Compiler != null) {
    const { visitors } = Compiler.prototype;
    if (visitors) {
      visitors[NODE_TYPE] = compiler;
    }
  }
}
