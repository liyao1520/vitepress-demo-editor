import container from "markdown-it-container";
const markDownPlugin = function (md: any) {
  md.use(container, "demo", {
    validate(params: any) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens: any, idx: any) {
      if (tokens[idx].nesting === 1) {
        // const description = m && m.length > 1 ? m[1] : ''
        const content =
          tokens[idx + 1].type === "fence" ? tokens[idx + 1].content : "";
        const props = tokens[idx].info;
        const hasColumn = props.includes("column");
        return `
        <demo initial-value="${md.utils.escapeHtml(content)}" direction="${
          hasColumn ? "column" : ""
        }" >
        `;
      }
      return "</demo>";
    },
  });
  // code
  const lang = "vue";
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = (
    tokens: any[],
    idx: number,
    options: any,
    env: any,
    self: any
  ) => {
    const token = tokens[idx];
    // 判断该 fence 是否在 :::demo 内
    const prevToken = tokens[idx - 1];
    const isInDemoContainer =
      prevToken &&
      prevToken.nesting === 1 &&
      prevToken.info.trim().match(/^demo\s*(.*)$/);

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
export default markDownPlugin;
