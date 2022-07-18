var markdownItContainer = function container_plugin(md, name, options) {
  function validateDefault(params) {
    return params.trim().split(" ", 2)[0] === name;
  }
  function renderDefault(tokens, idx, _options, env, slf) {
    if (tokens[idx].nesting === 1) {
      tokens[idx].attrJoin("class", name);
    }
    return slf.renderToken(tokens, idx, _options, env, slf);
  }
  options = options || {};
  var min_markers = 3, marker_str = options.marker || ":", marker_char = marker_str.charCodeAt(0), marker_len = marker_str.length, validate = options.validate || validateDefault, render = options.render || renderDefault;
  function container(state, startLine, endLine, silent) {
    var pos, nextLine, marker_count, markup, params, token, old_parent, old_line_max, auto_closed = false, start = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
    if (marker_char !== state.src.charCodeAt(start)) {
      return false;
    }
    for (pos = start + 1; pos <= max; pos++) {
      if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
        break;
      }
    }
    marker_count = Math.floor((pos - start) / marker_len);
    if (marker_count < min_markers) {
      return false;
    }
    pos -= (pos - start) % marker_len;
    markup = state.src.slice(start, pos);
    params = state.src.slice(pos, max);
    if (!validate(params, markup)) {
      return false;
    }
    if (silent) {
      return true;
    }
    nextLine = startLine;
    for (; ; ) {
      nextLine++;
      if (nextLine >= endLine) {
        break;
      }
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (start < max && state.sCount[nextLine] < state.blkIndent) {
        break;
      }
      if (marker_char !== state.src.charCodeAt(start)) {
        continue;
      }
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        continue;
      }
      for (pos = start + 1; pos <= max; pos++) {
        if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
          break;
        }
      }
      if (Math.floor((pos - start) / marker_len) < marker_count) {
        continue;
      }
      pos -= (pos - start) % marker_len;
      pos = state.skipSpaces(pos);
      if (pos < max) {
        continue;
      }
      auto_closed = true;
      break;
    }
    old_parent = state.parentType;
    old_line_max = state.lineMax;
    state.parentType = "container";
    state.lineMax = nextLine;
    token = state.push("container_" + name + "_open", "div", 1);
    token.markup = markup;
    token.block = true;
    token.info = params;
    token.map = [startLine, nextLine];
    state.md.block.tokenize(state, startLine + 1, nextLine);
    token = state.push("container_" + name + "_close", "div", -1);
    token.markup = state.src.slice(start, pos);
    token.block = true;
    state.parentType = old_parent;
    state.lineMax = old_line_max;
    state.line = nextLine + (auto_closed ? 1 : 0);
    return true;
  }
  md.block.ruler.before("fence", "container_" + name, container, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  });
  md.renderer.rules["container_" + name + "_open"] = render;
  md.renderer.rules["container_" + name + "_close"] = render;
};
const markDownPlugin = function(md) {
  md.use(markdownItContainer, "demo", {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const content = tokens[idx + 1].type === "fence" ? tokens[idx + 1].content : "";
        const props = tokens[idx].info;
        const hasColumn = props.includes("column");
        return `
        <clientOnly>
        <demo initial-value="${md.utils.escapeHtml(content)}" direction="${hasColumn ? "column" : ""}" >
        `;
      }
      return "</demo></clientOnly>";
    }
  });
  const lang = "vue";
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const prevToken = tokens[idx - 1];
    const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/);
    if (token.info.trim() === lang && isInDemoContainer) {
      const m = prevToken.info.trim().match(/^demo\s*(.*)$/);
      const description = m && m.length > 1 ? m[1] : "";
      return `
      ${description}
      `;
    }
    return defaultRender(tokens, idx, options, env, self);
  };
};
export { markDownPlugin as default };
