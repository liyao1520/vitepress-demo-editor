// importMaps

const importMaps: Record<string, any> = {};

export function addImportMap(key: string, value: string) {
  importMaps[key] = value;
}

export function handleImportMaps(script: string) {
  const _window = window as any;

  if (!_window.importMaps) _window.importMaps = importMaps;
  script = handleDefault(script);
  script = script.replace(
    /import(.*?)from\s+['"](.*?)['"]/g,
    (match, p1, p2) => {
      const key = p2;
      const value = importMaps[key];

      if (value) {
        if (!importMaps[`${key}`]) {
          importMaps[`${key}`] = value;
        }

        return `const ${p1} = importMaps['${p2}']`;
      } else {
        return match;
      }
    }
  );
  return script;
}

function handleDefault(script: string) {
  return script.replace(/import(.*?)from\s+['"]vue['"]/g, (match, p1) => {
    p1 = p1.replace(/as/g, ":");
    return `const ${p1} = _vue`;
  });
}
