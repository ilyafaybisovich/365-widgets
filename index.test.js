const evaluateLogFile = require("./index");
const { data, output } = require("./sampleData");

test("evaluates correctly for the initial data", () => {
  expect(evaluateLogFile(data)).toStrictEqual(output);
});

// test("I can do something with the non-exported", () => {
//   expect(
//     evaluateLogFile.__get__("isReferenceReadingsRow")("reference")
//   ).toStrictEqual(true);
// });
