// 开发中...

export default async function (monaco: any, monacoInstance: any) {
  // 高亮代码
  const [{ default: MonacoJSXHighlighter, JSXTypes }, { parse }, traverse] =
    await Promise.all([
      import("monaco-jsx-highlighter"),
      import("@babel/parser"),
      import("@babel/traverse"),
    ]);

  function changeHighlighterClass(key: string, value: string) {
    JSXTypes[key].options.inlineClassName = value;
  }
  changeHighlighterClass("JSXBracket", "mtk1");
  changeHighlighterClass("JSXIdentifier", "mtk6");
  changeHighlighterClass("JSXText", "mtk1");
  changeHighlighterClass("JSXExpressionContainer", "mtk1");
  const monacoJSXHighlighter = new MonacoJSXHighlighter(
    monaco,
    parse,
    traverse,
    monacoInstance
  );

  // Activate highlighting (debounceTime default: 100ms)
  monacoJSXHighlighter.highlightOnDidChangeModelContent(100);
  // Activate JSX commenting
  monacoJSXHighlighter.addJSXCommentCommand();
}
