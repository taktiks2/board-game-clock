// Polyfill globals that Expo's runtime.native.ts tries to lazily install
// but fails in jest due to import() restrictions
if (typeof globalThis.structuredClone === "undefined") {
  globalThis.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

if (typeof globalThis.__ExpoImportMetaRegistry === "undefined") {
  globalThis.__ExpoImportMetaRegistry = {
    register: () => {},
    get: () => ({}),
  };
}
