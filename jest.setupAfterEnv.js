// Mock expo-crypto globally for all tests
jest.mock("expo-crypto", () => {
  let counter = 0;
  return {
    randomUUID: () => `mock-uuid-${++counter}`,
  };
});
