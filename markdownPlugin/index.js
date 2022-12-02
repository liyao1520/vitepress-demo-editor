var I = function(o, c, a) {
  function m(r) {
    return r.trim().split(" ", 2)[0] === c;
  }
  function p(r, l, b, s, e) {
    return r[l].nesting === 1 && r[l].attrJoin("class", c), e.renderToken(r, l, b, s, e);
  }
  a = a || {};
  var _ = 3, f = a.marker || ":", d = f.charCodeAt(0), k = f.length, A = a.validate || m, C = a.render || p;
  function D(r, l, b, s) {
    var e, i, g, v, M, u, y, $, T = !1, n = r.bMarks[l] + r.tShift[l], t = r.eMarks[l];
    if (d !== r.src.charCodeAt(n))
      return !1;
    for (e = n + 1; e <= t && f[(e - n) % k] === r.src[e]; e++)
      ;
    if (g = Math.floor((e - n) / k), g < _ || (e -= (e - n) % k, v = r.src.slice(n, e), M = r.src.slice(e, t), !A(M, v)))
      return !1;
    if (s)
      return !0;
    for (i = l; i++, !(i >= b || (n = r.bMarks[i] + r.tShift[i], t = r.eMarks[i], n < t && r.sCount[i] < r.blkIndent)); )
      if (d === r.src.charCodeAt(n) && !(r.sCount[i] - r.blkIndent >= 4)) {
        for (e = n + 1; e <= t && f[(e - n) % k] === r.src[e]; e++)
          ;
        if (!(Math.floor((e - n) / k) < g) && (e -= (e - n) % k, e = r.skipSpaces(e), !(e < t))) {
          T = !0;
          break;
        }
      }
    return y = r.parentType, $ = r.lineMax, r.parentType = "container", r.lineMax = i, u = r.push("container_" + c + "_open", "div", 1), u.markup = v, u.block = !0, u.info = M, u.map = [l, i], r.md.block.tokenize(r, l + 1, i), u = r.push("container_" + c + "_close", "div", -1), u.markup = r.src.slice(n, e), u.block = !0, r.parentType = y, r.lineMax = $, r.line = i + (T ? 1 : 0), !0;
  }
  o.block.ruler.before("fence", "container_" + c, D, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  }), o.renderer.rules["container_" + c + "_open"] = C, o.renderer.rules["container_" + c + "_close"] = C;
};
const S = function(h) {
  h.use(I, "demo", {
    validate(o) {
      return o.trim().match(/^demo\s*(.*)$/);
    },
    render(o, c) {
      if (o[c].nesting === 1) {
        const a = o[c + 1].type === "fence" ? o[c + 1].content : "", m = o[c + 1].info, p = o[c].info + " ", _ = p.includes("column"), f = /height\:(.*?)\s/.exec(p), d = f ? f[1] : void 0;
        return `
        <clientOnly>
        <demo initial-value="${h.utils.escapeHtml(a)}" 
        direction="${_ ? "column" : ""}"
        lang="${m}"
        height="${d}"
        >
        `;
      }
      return "</demo></clientOnly>";
    }
  });
};
export {
  S as default
};
