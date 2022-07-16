export default async function init() {
  const monaco = await import("monaco-editor/esm/vs/editor/editor.api.js");
  await import(
    "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution"
  );
  await import("monaco-editor/esm/vs/basic-languages/html/html.contribution");
  await import("monaco-editor/esm/vs/basic-languages/css/css.contribution");
  return monaco;
}
